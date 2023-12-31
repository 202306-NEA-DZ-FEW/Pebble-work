import { onAuthStateChanged } from "firebase/auth";
import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";

import styles from "@/styles/EventDetails.module.css";

import NoEvent from "@/components/Events/NoEvent";

import { auth, db } from "@/util/firebase";

const EventsPage = ({ event, organizer, notFound }) => {
    const { t } = useTranslation();

    const [isHovered, setIsHovered] = useState(false);

    const [userMail, setUserMail] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUserMail(user.email);
            } else {
                // User is signed out
                setUserMail(null); // Reset to null when signed out
            }
        });

        return () => {
            // Unsubscribe from the observer when the component is unmounted
            unsubscribe();
        };
    }, []);

    const deleteEvent = async () => {
        //removing event info from the organizer's doc

        const organizerDocRef = doc(db, "users", event.organizer);
        const organizerDoc = await getDoc(organizerDocRef);

        const organizerData = organizerDoc.data();
        const updatedEventsCreated = organizerData.eventsCreated.filter(
            (eventInfo) => eventInfo.eventId !== event.eventId,
        );

        await updateDoc(organizerDocRef, {
            eventsCreated: updatedEventsCreated,
        });

        // removing event info from the attendees' docs

        for (const attendee of event.attendees) {
            const attendeeEmail = attendee.email;
            const userQuery = query(
                collection(db, "users"),
                where("email", "==", attendeeEmail),
            );
            const userQuerySnapshot = await getDocs(userQuery);

            userQuerySnapshot.forEach(async (userDoc) => {
                const userData = userDoc.data();
                if (userData.eventsJoined) {
                    const updatedEventsJoined = userData.eventsJoined.filter(
                        (eventInfo) => eventInfo.eventId !== event.eventId,
                    );

                    await updateDoc(userDoc.ref, {
                        eventsJoined: updatedEventsJoined,
                    });
                }
            });
        }

        //Finally, delete the event doc
        await deleteDoc(doc(db, "events", event.eventId));

        alert("Event successfully deleted");

        //Send them back to the shadowrealm

        window.location.href = `/events/`;
    };

    const attendeesArr = event?.attendees || [];

    const findUser = attendeesArr?.find((item) => {
        return item.email === userMail;
    });

    const cancelJoin = async () => {
        const documentRef = doc(db, "events", event.eventId);
        const docSnapshot = await getDoc(documentRef);
        const docData = docSnapshot.data();

        const userId = auth?.currentUser?.uid;
        const userDocRef = doc(db, "users", userId);

        // Filter the array to remove the object where the email matches
        const updatedAttendees = docData.attendees.filter(
            (attendee) => attendee.email !== userMail,
        );

        // Update the document with the modified attendees array
        await updateDoc(documentRef, {
            attendees: updatedAttendees,
        });

        const eventInfo = {
            eventId: event.eventId,
            title: docData.title,
        };

        // Update the user document to include the joined event
        await updateDoc(userDocRef, {
            eventsJoined: arrayRemove(eventInfo),
        });

        alert("Event unjoined");

        location.reload();
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // This function will be called when the authentication state changes.

            if (user) {
                // User is authenticated
                setIsAuthenticated(true);
            } else {
                // User is not authenticated
                setIsAuthenticated(false);
            }
        });

        // Don't forget to unsubscribe when your component unmounts.
        return () => unsubscribe();
    }, []);

    const joinEvent = async (eventId) => {
        const userId = auth?.currentUser?.uid;
        const userDocRef = doc(db, "users", userId);
        const eventDocRef = doc(db, "events", eventId);

        const userDoc = await getDoc(userDocRef);
        const eventDoc = await getDoc(eventDocRef);

        const eventObject = eventDoc.data();
        const userObject = userDoc.data();

        const { Name, Surename, email } = userObject;
        // Create a new object with the desired event details
        const eventInfo = {
            eventId: eventId,
            title: eventObject.title,
        };

        // Update the user document to include the joined event
        await updateDoc(userDocRef, {
            eventsJoined: arrayUnion(eventInfo),
        });

        await updateDoc(eventDocRef, {
            attendees: arrayUnion({ Name, Surename, email }),
        });

        alert("Event joined successfully");

        window.location.reload();
    };
    if (notFound) {
        return <NoEvent />;
    }
    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div
                style={{
                    margin: "auto",
                    width: "60%",
                    paddingTop: "6rem",
                    color: "black",
                }}
            >
                <h2
                    className='text-2xl font-bold'
                    style={{ marginBottom: "2rem" }}
                >
                    {event.title}
                </h2>
                <div
                    style={{ marginBottom: "6rem", gap: "4rem" }}
                    className={`flex flex-col ${styles.mdCenterContent} sm:flex-row mb-16 sm:mb-32 gap-4`}
                >
                    <div
                        style={{ margin: "auto", width: "100%" }}
                        className='sm:w-2/5 mx-auto'
                    >
                        {event.image ? (
                            <Image
                                src={event.image}
                                width={450}
                                height={450}
                                alt='event pic'
                            />
                        ) : (
                            <Image
                                src='/event_image.png'
                                width={450}
                                height={450}
                                alt='event pic'
                            />
                        )}
                    </div>

                    <div
                        style={{ width: "100%" }}
                        className='lg:flex lg:flex-col md:flex md:flex-row md:justify-items-center md:gap-x-10'
                    >
                        <div>
                            <p>
                                <b>{t("review.location")}</b> <br />
                                {event.location}
                                <br />
                                <br />
                                <b>{t("review.dateAndTime")}</b>
                                <br />
                                {event.date ? (
                                    <span> {event.date}</span>
                                ) : (
                                    <span> {t("review.undefined")}</span>
                                )}{" "}
                                at
                                {event.time ? (
                                    <span> {event.time}</span>
                                ) : (
                                    <span> {t("review.undefined")}</span>
                                )}
                                <br />
                                <br />
                                <br />
                            </p>
                        </div>

                        <div>
                            <div className='flex bg-white rounded-lg w-fit p-3 gap-x-14'>
                                <p className=' text-gray-800'>
                                    <span className=' text-gray-500'>
                                        {" "}
                                        {t("review.organizedBy")}{" "}
                                    </span>
                                    <br />
                                    {organizer.Name ? (
                                        <b>
                                            {organizer.Name}{" "}
                                            {organizer.Surename}
                                        </b>
                                    ) : (
                                        <b>{t("review.dudeMcGee")}</b>
                                    )}
                                </p>

                                <FaPeopleGroup size={50} fill='#749d60' />
                            </div>

                            {isAuthenticated ? (
                                <>
                                    {" "}
                                    {userMail === organizer.email ? (
                                        <>
                                            <Link
                                                href={`/events/${event.eventId}/edit`}
                                            >
                                                <button
                                                    className='btn btn-sm btn-wide eventButtons opacity-80 hover:opacity-100'
                                                    style={{
                                                        marginTop: "1rem",
                                                        borderRadius: "8px",
                                                        background: "#749D60",
                                                        border: 0,
                                                        color: "white",
                                                    }}
                                                >
                                                    {t("review.editEvent")}
                                                </button>
                                            </Link>{" "}
                                            <button
                                                className='btn btn-sm btn-wide eventButtons hover:opacity-60'
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "cancel_modal",
                                                        )
                                                        .showModal()
                                                }
                                                style={{
                                                    marginTop: "1rem",
                                                    borderRadius: "8px",
                                                    background: "red",
                                                    border: 0,
                                                    color: "white",
                                                }}
                                            >
                                                {t("review.cancelEvent")}
                                            </button>
                                        </>
                                    ) : findUser ? (
                                        <button
                                            className='btn btn-sm btn-wide eventButtons opacity-50 hover:opacity-80 cursor-default hover:cursor-pointer'
                                            style={{
                                                marginTop: "1rem",
                                                borderRadius: "8px",
                                                background: isHovered
                                                    ? "red"
                                                    : "#749D60",
                                                border: 0,
                                                color: "white",
                                            }}
                                            onMouseOver={() =>
                                                setIsHovered(true)
                                            }
                                            onMouseOut={() =>
                                                setIsHovered(false)
                                            }
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "canceljoin_modal",
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            {isHovered
                                                ? t("review.cancelJoin")
                                                : t("review.alreadyJoined")}
                                        </button>
                                    ) : (
                                        <button
                                            className='btn btn-sm btn-wide eventButtons'
                                            onClick={() =>
                                                joinEvent(event.eventId)
                                            }
                                            style={{
                                                marginTop: "1rem",
                                                borderRadius: "8px",
                                                background: "#2E7EAA",
                                                border: 0,
                                                color: "white",
                                            }}
                                        >
                                            {t("review.joinNow")}
                                        </button>
                                    )}{" "}
                                </>
                            ) : (
                                <>
                                    <div className='italic text-red-400 mt-2'>
                                        {t("review.joinNowText")}
                                    </div>
                                    <Link href='/signin'>
                                        <button
                                            className='btn btn-sm  hover:opacity-80'
                                            style={{
                                                marginTop: "1rem",
                                                borderRadius: "8px",
                                                background: "#2E7EAA",
                                                border: 0,
                                                color: "white",
                                            }}
                                        >
                                            {t("review.signIn")}
                                        </button>
                                    </Link>{" "}
                                    <Link href='/signup'>
                                        <button
                                            className='btn btn-sm  hover:opacity-80'
                                            style={{
                                                marginTop: "1rem",
                                                borderRadius: "8px",
                                                background: "#2E7EAA",
                                                border: 0,
                                                color: "white",
                                            }}
                                        >
                                            {t("review.signUp")}
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.eventDesc} lg:flex lg:flex-row lg:justify-between md:flex md:flex-col md:gap-x-5 md:gap-y-8 sm:flex sm:gap-y-5`}
                >
                    <div style={{ maxWidth: "400px" }} className='event-desc'>
                        <h3 className='text-2xl break-words font-bold'>
                            {t("review.eventDescription")}
                        </h3>

                        {event ? (
                            <p>{event.description}</p>
                        ) : (
                            <p>{t("review.loading")} </p>
                        )}
                    </div>

                    <div>
                        <h3 className='text-xl font-bold'>
                            {t("review.attendees")}:
                        </h3>
                        {attendeesArr.length > 0 ? (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 20px)",
                                    gap: "3rem",
                                    marginTop: "1rem",
                                }}
                            >
                                {attendeesArr.map((attendee, index) => (
                                    <div key={index}>
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                background: "black",
                                                color: "white",
                                                textAlign: "center",
                                                padding: "8px",
                                            }}
                                        >
                                            {attendee.Surename.charAt(0)}.
                                        </div>
                                        <div>{attendee.Name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='italic pt-3'>
                                {t("review.noParticipant")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ height: "6rem" }}></div>

            <dialog id='cancel_modal' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>{t("review.warning")}</h3>
                    <p className='py-4'>{t("review.warningCancel")}</p>
                    <p>{t("review.thisAction")}</p>
                    <div className='modal-action'>
                        <form method='dialog'>
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className='btn'
                                style={{
                                    background: "red",
                                    color: "white",
                                    marginRight: "1rem",
                                }}
                                onClick={deleteEvent}
                            >
                                {t("review.cancelEvent")}
                            </button>
                            <button className='btn'>{t("review.close")}</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id='canceljoin_modal' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>{t("review.warning")}</h3>
                    <p className='py-4'>{t("review.warningLeave")}</p>
                    <p>{t("review.proceed")}</p>
                    <div className='modal-action'>
                        <form method='dialog'>
                            <button
                                className='btn'
                                style={{
                                    background: "red",
                                    color: "white",
                                    marginRight: "1rem",
                                }}
                                onClick={cancelJoin}
                            >
                                {t("review.leave")}
                            </button>
                            <button className='btn'>{t("review.close")}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export async function getServerSideProps(context) {
    const eventId = context.params.eventId;

    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);

    if (!eventDoc.exists()) {
        return {
            props: {
                event: null,
                organizer: null,
                notFound: true, // Flag to indicate event not found
                ...(await serverSideTranslations(context.locale, ["common"])),
            },
        };
    }

    const event = eventDoc.data();
    const userId = event.organizer;

    // Convert the timestamp to a string
    event.timestamp = event.timestamp.toString();

    const organizerRef = doc(db, "users", userId);
    const organizerDoc = await getDoc(organizerRef);
    const organizer = organizerDoc.data();

    return {
        props: {
            event: {
                ...event,
                eventId: eventId,
            },
            organizer,
            notFound: false,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
}

export default EventsPage;
