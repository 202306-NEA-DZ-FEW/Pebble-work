import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

import styles from "@/styles/EventDetails.module.css";

import NoAccess from "@/components/Events/EditEvent";

import { auth, db, storage } from "@/util/firebase";
import Modal from "@/components/Popup/Modal";

function EditEvent({ event, organizer }) {
    const { t } = useTranslation();
    //creates the event object to be sent to firestore
    const [input, setInput] = useState({
        location: "",
        title: "",
        time: "",
        date: "",
        description: "",
        image: "",
    });

    /// Modal states
    const [showPopup, setShowPopup] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalClassName, setModalClassName] = useState("");

    const [img, setImg] = useState("");

    const imgUpload = async (eventId) => {
        const imgRef = ref(storage, `images/img${eventId}`);
        await uploadBytes(imgRef, img);

        const imageUrl = await getDownloadURL(imgRef);

        await updateDoc(doc(db, "events", eventId), {
            image: imageUrl,
        });
    };

    const updateEvent = async () => {
        const eventUpdateData = {};

        if (input.location) {
            eventUpdateData.location = input.location;
        }

        if (input.title) {
            eventUpdateData.title = input.title;
        }

        if (input.time) {
            eventUpdateData.time = input.time;
        }

        if (input.date) {
            eventUpdateData.date = input.date;
        }

        if (input.description) {
            eventUpdateData.description = input.description;
        }

        await updateDoc(doc(db, "events", event.eventId), eventUpdateData);

        if (img) {
            // Check image extension
            const allowedExtensions = ["jpg", "jpeg", "png"];
            const fileExtension = img.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                setShowPopup(true);
                setModalContent(
                    "Invalid file extension. Allowed extensions are: jpg, jpeg, and png"
                );
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
                );
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
                return;
            }
            // Check file size
            const maxSize = 4 * 1024 * 1024; // 4MB
            if (img.size > maxSize) {
                setShowPopup(true);
                setModalContent("File size exceeds the allowed limit of 5MB");
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
                );
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
                return;
            }

            await imgUpload(event.eventId);
        }

        window.location.href = `/events/${event.eventId}`;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [id]: value,
        }));
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

    const [userMail, setUserMail] = useState(null);
    const handleSuccess = () => {
        setShowPopup(true);
    };

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

    return (
        <>
            <div style={{ height: "6rem" }}></div>
            {isAuthenticated ? (
                userMail === organizer.email ? (
                    <>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-col  md:space-x-20  md:flex-row mb-10'>
                                <div
                                    className='my-auto lg:flex lg:flex-col md:flex-col md:bt-5 sm:flex sm:flex-col sm:flex-wrap sm:mt-5 md:mt-3 '
                                    style={{ paddingTop: "2rem" }}
                                >
                                    <p className='font-bold text-5xl sm:inline-block '>
                                        {event.location}
                                    </p>

                                    <p className='italic mt-2'>
                                        {t("edit.change")}
                                    </p>
                                </div>

                                <div className='mt-3'>
                                    <h3
                                        className='mt-5 font-semibold align-left'
                                        style={{
                                            fontWeight: "500",
                                            lineHeight: "56.70px",
                                            letterSpacing: "0.23px",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        {t("edit.time")}{" "}
                                    </h3>
                                    <input
                                        type='time'
                                        id='time'
                                        value={input.time}
                                        onChange={(e) =>
                                            setInput({
                                                ...input,
                                                time: e.target.value,
                                            })
                                        }
                                        style={{
                                            height: "3rem",
                                            borderRadius: "8%",
                                            paddingLeft: "0.5rem",
                                            paddingRight: "0.5rem",
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                className={`flex flex-col content-center flex-wrap mt-0 w-screen px-5 ${styles.container}`}
                            >
                                <h1 className='mt-5 text-xl font-semibold align-left '>
                                    {t("edit.title")}{" "}
                                </h1>
                                <p className='max-w-4xl mt-2 tinyText text-gray-400'>
                                    {t("edit.titleDescription")}
                                </p>
                                <form className=''>
                                    <input
                                        required
                                        id='title'
                                        value={input.title}
                                        onChange={handleInputChange}
                                        placeholder={event.title}
                                        className={`p-1 font-semibold  mt-4 w-96 rounded-md focus:outline-2 outline outline-1 ${
                                            !input.title && "required"
                                        } `}
                                    ></input>
                                </form>
                                <h1 className='mt-5 text-xl font-semibold align-left '>
                                    {t("edit.updateDescription")}
                                </h1>
                                <p className='max-w-4xl mt-2 tinyText text-gray-400'>
                                    {t("edit.updateDescriptionText")}
                                </p>

                                <form id='eventdescription' className='mt-1 '>
                                    <textarea
                                        id='description'
                                        value={input.description}
                                        onChange={handleInputChange}
                                        placeholder={event?.description}
                                        className='outline outline-1 mt-2 h-40 rounded w-7/12 font-semibold sm:w-3/4'
                                    ></textarea>
                                </form>
                                <h1 className='mt-5 text-xl font-semibold align-left '>
                                    {t("edit.eventImage")}
                                </h1>
                                <p className='max-w-4xl mt-3 tinyText text-gray-400'>
                                    {t("edit.eventImageText")}
                                </p>
                                <input
                                    type='file'
                                    onChange={(e) => setImg(e.target.files[0])}
                                    id='eventimage'
                                    className='mt-3 file-input file-input-bordered w-full max-w-3xl border-2 border-black'
                                />
                            </div>

                            <div className='flex items-center flex-row mt-3 rounded p-5'>
                                <button
                                    onClick={updateEvent}
                                    className={`px-8 py-3 outline outline-1 rounded font-semibold my-28 ${styles.editButton}`}
                                    style={{
                                        display: "flex",
                                        height: "99px",
                                        padding: "11px 16px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "2px 2px 0px 0px #1A1A1A",
                                    }}
                                    disabled={
                                        !input.location &&
                                        !input.title &&
                                        !input.time &&
                                        !input.date &&
                                        !input.description &&
                                        !img
                                    }
                                >
                                    {input.location ||
                                    input.title ||
                                    input.time ||
                                    input.date ||
                                    input.description ||
                                    img ? (
                                        t("edit.updateEvent")
                                    ) : (
                                        <span className='italic font-normal'>
                                            {t("edit.noEdits")}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <NoAccess />
                )
            ) : (
                <NoAccess />
            )}
            {showPopup && (
                <Modal
                    message={modalContent}
                    onClose={handleSuccess}
                    className={modalClassName}
                />
            )}
        </>
    );
}
export async function getServerSideProps(context) {
    const eventId = context.params.eventId;

    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    const event = eventDoc.data();

    const userId = event.organizer;
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
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
}

export default EditEvent;
