import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

import EventCreation from "@/components/Events/EventCreation";
import PhoneVerify from "@/components/Events/PhoneVerify";

import { auth, db, storage } from "@/util/firebase";
import Modal from "@/components/Popup/Modal";

const EventCreationPage = () => {
    const { t } = useTranslation();
    const formCollectionRef = collection(db, "events");

    //creates the event object to be sent to firestore
    const [input, setInput] = useState({
        location: "",
        type: "",
        title: "",
        time: "",
        date: "",
        description: "",
        attendees: [],
        organizer: auth?.currentUser?.uid,
        image: "",
        timestamp: serverTimestamp(),
    });

    /// Modal states
    const [showPopup, setShowPopup] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalClassName, setModalClassName] = useState("");

    const [img, setImg] = useState("");

    const addEvent = async (input) => {
        const docRef = await addDoc(formCollectionRef, input);

        return docRef.id;
    };

    const addLocation = async (input) => {
        const locationsRef = doc(db, "database", "locations");

        await updateDoc(locationsRef, {
            data: arrayUnion(input.location),
        });
    };

    const imgUpload = async (eventId) => {
        const imgRef = ref(storage, `images/img${eventId}`);
        await uploadBytes(imgRef, img);

        const imageUrl = await getDownloadURL(imgRef);

        await updateDoc(doc(db, "events", eventId), {
            image: imageUrl,
        });
    };

    const updateUser = async (eventId) => {
        const userId = auth?.currentUser?.uid;
        const userDocRef = doc(db, "users", userId);

        const eventData = {
            eventId: eventId,
        };

        await updateDoc(userDocRef, {
            eventsCreated: arrayUnion(eventData),
        });
    };
    const addAndGoToEvent = async () => {
        if (
            !input.location ||
            !input.type ||
            !input.title ||
            !input.date ||
            input.description.length < 100
        ) {
            // Check if required fields are empty or description is less than 100 characters
            alert(
                "Please fill in all required fields and ensure the description has at least 100 characters."
            );
            return;
        }

        const eventId = await addEvent(input);

        await addLocation(input);

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

            await imgUpload(eventId);
        }

        //use getDownloadURL to get the url of the newly uploaded image

        //updateDoc to add the url to the docRef in image:''
        await updateUser(eventId);

        window.location.href = `/events/${eventId}`;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [id]: value,
        }));
    };

    const arrEventType = [
        "No Poverty",
        "Zero Hunger",
        "Good Health and Well-being",
        "Gender Equality",
        "Clean Water and Sanitation",
        "Affordable and Clean Energy",
        "Decent Work and Economic Growth",
        "Industry, Innovation, and Infrastructure",
        "Reduced Inequalities",
        "Sustainable Cities and Communitiese",
        "Quality Education",
        "Responsible Consumption/Production",
        "Climate Action",
        "Life Below Water",
        "Life on Land",
        "Peace, Justice and Strong Institutions",
        "Other",
    ];

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
    const handleSuccess = () => {
        setShowPopup(true);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // This function will be called when the authentication state changes.

            if (user) {
                // User is authenticated
                setIsAuthenticated(true);
                setIsPhoneNumberVerified(user.phoneNumber ? true : false);
            } else {
                // User is not authenticated
                setIsAuthenticated(false);
                setIsPhoneNumberVerified(false);
            }
        });

        // Don't forget to unsubscribe when your component unmounts.
        return () => unsubscribe();
    }, []);
    if (isAuthenticated && !isPhoneNumberVerified) {
        return (
            <>
                <PhoneVerify />
            </>
        );
    }

    return (
        <>
            <div className='container ml-auto mr-auto max-w-6xl mt-2 flex flex-col mx-auto'>
                {isAuthenticated ? (
                    <>
                        <div style={{ height: "6rem" }}></div>

                        <div className='flex flex-col  md:space-x-20  md:flex-row md:center-content md:ml-4 pl-2 sm:ml-4'>
                            <div>
                                <h3
                                    className='mt-5 font-semibold align-left'
                                    style={{
                                        fontWeight: "500",
                                        lineHeight: "56.70px",
                                        letterSpacing: "0.23px",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {t("eventCreation:chooseLocation")}
                                    <span className='font-light text-xs align-left text-[red]'>
                                        {t("eventCreation:required")}
                                    </span>
                                </h3>
                                <p className='max-w-sm mt-2 tinyText text-gray-400'>
                                    {t("eventCreation:locationDescription")}
                                </p>
                                <form className='max-w-1/2'>
                                    <input
                                        required
                                        id='location'
                                        value={input.location}
                                        onChange={handleInputChange}
                                        placeholder='Set Location'
                                        className='p-1  mt-4  rounded-md focus:outline-2 outline outline-1 w-2/4'
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid var(--container-border, #1A1A1A)",
                                            background:
                                                "var(--fill-white, #FFF)",
                                            width: "300px",
                                            height: "55px",
                                        }}
                                    ></input>
                                </form>

                                <h3
                                    className='mt-5 font-semibold align-left'
                                    style={{
                                        fontWeight: "500",
                                        lineHeight: "56.70px",
                                        letterSpacing: "0.23px",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {t("eventCreation:chooseDateAndTime")}
                                    <span className='font-light text-xs align-left text-[red]'>
                                        {t(
                                            "eventCreation:chooseDateAndTimeRequired"
                                        )}
                                    </span>
                                </h3>
                                <p className='max-w-sm mt-2 tinyText text-gray-400 mb-2'>
                                    {t("eventCreation:dateAndTimeDescription")}
                                </p>
                                <input
                                    required
                                    type='date'
                                    id='date'
                                    name='trip-start'
                                    onChange={(e) =>
                                        setInput({
                                            ...input,
                                            date: e.target.value,
                                        })
                                    }
                                    className='border'
                                    style={{
                                        height: "3rem",
                                        borderRadius: "8%",
                                        paddingLeft: "0.5rem",
                                        paddingRight: "0.5rem",
                                        marginRight: "1rem",
                                    }}
                                    value={input.date}
                                    min='2023-17-10'
                                    max='2035-12-31'
                                />
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

                            <div
                                className='my-auto lg:flex lg:flex-col md:flex-col md:bt-5 sm:flex sm:flex-col sm:flex-wrap sm:mt-5 md:mt-3 '
                                style={{ paddingTop: "2rem" }}
                            >
                                {input.location ? (
                                    <p className='font-bold text-5xl sm:inline-block '>
                                        {input.location}
                                    </p>
                                ) : (
                                    <p className='italic mt-2'>
                                        {t("eventCreation:locationPlaceholder")}
                                    </p>
                                )}
                                <a
                                    href='#'
                                    className='mt-2 underline text-md text-[#2E7EAA] hover:opacity-80 transition-opacity duration-[400ms] font-bold decoration-inherit'
                                >
                                    {t("eventCreation:changeLocation")}
                                </a>
                            </div>
                        </div>
                        <div className='my-3 flex flex-col items-center ml-3 flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-start lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start '>
                            <h1 className='mt-5 text-xl font-semibold md:pl-2'>
                                {t("eventCreation:eventType")}
                                <span className='align-top font-light text-xs align-left text-[red]'>
                                    {t("eventCreation:eventTypeRequired")}
                                </span>
                            </h1>
                            <p className='max-w-4xl mt-2 md:pl-2 tinyText text-gray-400  mb-8'>
                                {t("eventCreation:eventTypeDescription")}
                            </p>

                            <div
                                className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-3'
                                style={{
                                    display: "grid",
                                    gridAutoRows: "1fr",
                                    gap: "1rem",
                                }}
                            >
                                {arrEventType.map((type, index) => (
                                    <button
                                        value={type}
                                        onClick={(e) => {
                                            const buttons =
                                                document.querySelectorAll(
                                                    ".grid-item"
                                                );
                                            buttons.forEach((button) => {
                                                button.style.backgroundColor =
                                                    "#FFF";
                                                button.style.color = "#2E7EAA";
                                            });

                                            setInput({
                                                ...input,
                                                type: e.target.value,
                                            });
                                            e.target.style.backgroundColor =
                                                "#2E7EAA";
                                            e.target.style.color = "#fff";
                                        }}
                                        key={index}
                                        className='grid-item'
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #2E7EAA",
                                            background: "#FFF",
                                            display: "flex",
                                            color: "#2E7EAA",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "6px 16px",
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='my-3 flex l flex-col  mx-auto  items-center flex-wrap sm:flex sm:flex-col sm:ml-3 sm:items-center ml-2  md:flex md:flex-col md:ml-4 md:items-start lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start'>
                            <h1 className='mt-5 text-xl font-semibold align-left md:pl-2'>
                                {t("eventCreation:eventTitle")}
                                <span className='align-top font-light text-xs align-left text-[red]'>
                                    {t("eventCreation:eventTitleRequired")}
                                </span>
                            </h1>
                            <p className='max-w-4xl mt-2 tinyText text-gray-400 md:pl-2'>
                                {t("eventCreation:eventTitleDescription")}
                            </p>
                            <form className='pl-4'>
                                <input
                                    required
                                    id='title'
                                    value={input.title}
                                    onChange={handleInputChange}
                                    placeholder='Choose a title'
                                    className={`p-1 font-semibold  mt-4 w-96 rounded-md focus:outline-2 outline outline-1 ${
                                        !input.title && "required"
                                    } `}
                                ></input>
                            </form>
                        </div>

                        <div className='my-3 md:pl-2 lg:pl-0 sm:pl-2  flex flex-col flex-wrap mt-2 w-screen sm:flex sm:flex-col sm:ml-3 '>
                            <h1 className='mt-5 text-xl font-semibold align-left md:text-left sm:text-center sm-center'>
                                {t("eventCreation:eventDescription")}
                            </h1>
                            <p className='max-w-4xl mt-2 tinyText text-gray-400 md:text-left sm:text-center sm-center'>
                                {t("eventCreation:eventDescriptionDescription")}
                            </p>
                            <form
                                id='eventdescription'
                                className='mt-1 sm:text-center md:text-left sm-center'
                            >
                                <textarea
                                    id='description'
                                    value={input.description}
                                    onChange={handleInputChange}
                                    placeholder='  Please write 50 characters at least'
                                    className='outline outline-1 mt-2 h-40 rounded w-7/12 font-semibold '
                                ></textarea>
                            </form>
                        </div>

                        <div className='md:pl-2 flex flex-col  mx-auto  items-center flex-wrap sm:flex sm:flex-col sm:flex-wrap sm:items-center ml-2  md:flex md:flex-col md:ml-4 md:items-start lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start my-3 px-2'>
                            <h1 className='mt-5 text-xl font-semibold align-left '>
                                {t("eventCreation:eventImage")}
                            </h1>
                            <p className='max-w-4xl mt-3 tinyText text-gray-400 ml-2'>
                                {t("eventCreation:eventImageDescription")}
                            </p>
                            <input
                                type='file'
                                onChange={(e) => setImg(e.target.files[0])}
                                id='eventimage'
                                className='mt-3 file-input file-input-bordered w-full max-w-3xl border-2 border-black'
                            ></input>
                        </div>

                        <div className='flex flex-col flex-wrap mt-8 md:ml-4 ml-2'>
                            <h1 className='mt-5 text-xl font-semibold align-left '>
                                {t("eventCreation:guidelinesTitle")}
                            </h1>
                            <p className='max-w-4xl mt-1 tinyText text-gray-400'>
                                {t("eventCreation:guidelinesDescription")}
                            </p>
                            <ul className='list-disc ml-6 mt-1 text-black text-sm font-semibold'>
                                <li>{t("eventCreation:guideline1")}</li>
                                <li>{t("eventCreation:guideline2")}</li>
                                <li>{t("eventCreation:guideline3")}</li>
                            </ul>
                            <p className='max-w-4xl mt-1 tinyText text-gray-400'>
                                {t("eventCreation:readMore")}{" "}
                                <a
                                    href='#'
                                    className='text-[#2E7EAA] no-underline hover:underline text-md'
                                >
                                    {t("eventCreation:communityGuidelines")}
                                </a>
                                .
                            </p>
                        </div>

                        <div className='flex items-center flex-row mt-3 rounded px-2'>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("confirmcreate_modal")
                                        .showModal()
                                }
                                className='px-8 py-3 outline outline-1 rounded font-semibold mx-auto my-28'
                                style={{
                                    display: "flex",
                                    width: "570px",
                                    height: "99px",
                                    padding: "11px 16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    boxShadow: "2px 2px 0px 0px #1A1A1A",
                                }}
                            >
                                {t("eventCreation:createEventButton")}
                            </button>
                        </div>
                        <div style={{ height: "4rem" }}></div>
                    </>
                ) : (
                    <EventCreation />
                )}
                <dialog id='confirmcreate_modal' className='modal'>
                    <div className='modal-box'>
                        <h3 className='font-bold text-lg text-[#2E7EAA]'>
                            {t("eventCreation:confirmation")}
                        </h3>
                        <p className='py-4'>
                            <span className='font-bold'>{t("event")}: </span>{" "}
                            {input.title}.
                            <br />{" "}
                            <span className='italic text-sm'>{input.type}</span>
                        </p>
                        <p>
                            {t("eventCreation:infoChangeLater")}
                            <ul className='font-bold text-sm pt-2'>
                                <li>{t("eventCreation:location")}</li>
                                <li>{t("eventCreation:eventType")}</li>
                                <li>{t("eventCreation:day")}</li>
                            </ul>
                        </p>
                        <p className='pt-2'>
                            {t("eventCreation:proceedQuestion")}
                        </p>

                        <div className='modal-action'>
                            <form method='dialog'>
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                    className='btn'
                                    onClick={addAndGoToEvent}
                                    style={{
                                        background: "#2E7EAA",
                                        color: "white",
                                        marginRight: "1rem",
                                    }}
                                >
                                    {t("eventCreation:createEvent")}
                                </button>
                                <button className='btn'>
                                    {t("eventCreation:return")}
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
                {showPopup && (
                    <Modal
                        message={modalContent}
                        onClose={handleSuccess}
                        className={modalClassName}
                    />
                )}
            </div>
        </>
    );
};

export default EventCreationPage;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "about",
                "events",
                "eventCreation",
                "verify",
            ])),
            // Will be passed to the page component as props
        },
    };
}
