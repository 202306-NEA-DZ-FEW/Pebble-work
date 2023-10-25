import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { auth, db, storage } from "@/util/firebase";
import EventCreation from "@/components/Events/EventCreation";

const EventCreationPage = () => {
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
    });

    const [img, setImg] = useState("");

    const addEvent = async (input) => {
        const docRef = await addDoc(formCollectionRef, input);

        return docRef.id;
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
        if (!input.location || !input.type || !input.title || !input.date) {
            // Check if required fields are empty
            alert("Please fill in all required fields.");
            return;
        }

        const eventId = await addEvent(input);

        await imgUpload(eventId);

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

    return (
        <dDiv
            className='container ml-auto mr-auto max-w-6xl mt-2 flex flex-col bg-white mx-auto'
            style={{ fontFamily: "Rubik" }}
        >
            {isAuthenticated ? (
                <>
                    <div style={{ height: "6rem" }}></div>
                    <div className='flex flex-col  md:space-x-20  md:flex-row'>
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
                                Choose Location:{" "}
                                <span className='font-light text-xs align-left text-[red]'>
                                    required
                                </span>
                            </h3>
                            <p className='max-w-sm mt-2 tinyText text-gray-400'>
                                Pebble events can be both local or online.
                                Choose where you want to host your event.
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
                                        background: "var(--fill-white, #FFF)",
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
                                Choose Date & Time:{" "}
                                <span className='font-light text-xs align-left text-[red]'>
                                    required
                                </span>
                            </h3>
                            <p className='max-w-sm mt-2 tinyText text-gray-400 mb-2'>
                                Select the day and starting time of the event.
                            </p>
                            <input
                                required
                                type='date'
                                id='date'
                                name='trip-start'
                                onChange={(e) =>
                                    setInput({ ...input, date: e.target.value })
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
                                    setInput({ ...input, time: e.target.value })
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
                                    Location will appear here
                                </p>
                            )}
                            <a
                                href='#'
                                className='mt-2 underline text-md text-blue-600 font-bold decoration-inherit'
                            >
                                Change Location
                            </a>
                        </div>
                    </div>
                    <div className=' flex flex-col items-center ml-3 flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-center lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start '>
                        <h1 className='mt-5 text-xl font-semibold  '>
                            Choose Event Type:{" "}
                            <span className='align-top font-light text-xs align-left text-[red]'>
                                required
                            </span>
                        </h1>
                        <p className='max-w-4xl mt-2 tinyText text-gray-400  mb-8'>
                            Every pebble event should serve at least one of the
                            sustainable development goals of United Nations.
                            Which goal do you want to help in? Select all that
                            apply.
                        </p>

                        <div
                            className='grid-container'
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
                                            button.style.color = "#FDA855"; // Change the text color back to the default color
                                        });

                                        setInput({
                                            ...input,
                                            type: e.target.value,
                                        });
                                        e.target.style.backgroundColor =
                                            "#FDA855";
                                        e.target.style.color = "#fff";
                                    }}
                                    key={index}
                                    className='grid-item'
                                    style={{
                                        borderRadius: "8px",
                                        border: "1px solid #FDA855",
                                        background: "#FFF",
                                        display: "flex",
                                        color: "#FDA855",
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

                    <div className='flex l flex-col  mx-auto   flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-center lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start'>
                        <h1 className='mt-5 text-xl font-semibold align-left '>
                            Event Title:{" "}
                            <span className='align-top font-light text-xs align-left text-[red]'>
                                required
                            </span>
                        </h1>
                        <p className='max-w-4xl mt-2 tinyText text-gray-400'>
                            Choose a title that will give people a clear idea of
                            what the event is about. Feel free to be creative!
                            You can edit this later if you change your mind.
                        </p>
                        <form className=''>
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

                    <div className='flex flex-col flex-wrap mt-2 w-screen'>
                        <h1 className='mt-5 text-xl font-semibold align-left '>
                            Event Description:
                        </h1>
                        <p className='max-w-4xl mt-2 tinyText text-gray-400'>
                            Describe the purpose of your event. Who should join
                            and what will you do at the event?
                        </p>
                        <form id='eventdescription' className='mt-1 '>
                            <textarea
                                id='description'
                                value={input.description}
                                onChange={handleInputChange}
                                placeholder='Please write 50 characters at least'
                                className='outline outline-1 mt-2 h-40 rounded w-7/12 font-semibold'
                            ></textarea>
                        </form>
                    </div>

                    <div className='flex flex-col flex-wrap mt-0 w-screen'>
                        <h1 className='mt-5 text-xl font-semibold align-left '>
                            Event Image:
                        </h1>
                        <p className='max-w-4xl mt-3 tinyText text-gray-400'>
                            We have found that listings with a photo attract
                            more interest.
                        </p>
                        <input
                            type='file'
                            onChange={(e) => setImg(e.target.files[0])}
                            id='eventimage'
                            className='mt-3 file-input file-input-bordered w-full max-w-3xl border-2 border-black'
                        ></input>
                    </div>

                    <div className='flex flex-col flex-wrap mt-8 w-screen'>
                        <h1 className='mt-5 text-xl font-semibold align-left '>
                            Almost Done! Just take a minute to review our
                            guidlines.
                        </h1>
                        <p className='max-w-4xl mt-1 tinyText text-gray-400'>
                            Pebble is all about helping people with the help of
                            volunteers like you. This means that all events
                            should:
                        </p>
                        <ul className='list-disc ml-6 mt-1 text-black text-sm font-semibold'>
                            <li>Be transparent about the events intentions</li>
                            <li>
                                Encourage real human interactions in person or
                                online
                            </li>
                            <li>Have the host present in all events</li>
                        </ul>
                        <p className='max-w-4xl mt-1 tinyText text-gray-400'>
                            You can read more about all of this in our{" "}
                            <a
                                href='#'
                                className='text-[#FDA855] no-underline hover:underline text-md text-blue-600'
                            >
                                community guidelines
                            </a>
                            .
                        </p>
                    </div>

                    <div className='flex items-center flex-row mt-3 rounded '>
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
                            Agree with terms and Create Event!
                        </button>
                    </div>
                    <div style={{ height: "200px", marginTop: "4rem" }}></div>
                </>
            ) : (
                <EventCreation />
            )}
            <dialog id='confirmcreate_modal' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg text-[#FDA855]'>
                        Confirmation
                    </h3>
                    <p className='py-4'>
                        <span className='font-bold'>Event:</span> {input.title}.
                        <br />{" "}
                        <span className='italic text-sm'>{input.type}</span>
                    </p>
                    <p>
                        The following information cannot be changed later on:
                        <ul className='font-bold text-sm pt-2'>
                            <li>Location</li>
                            <li>Event type</li>
                            <li>Day</li>
                        </ul>
                    </p>
                    <p className='pt-2'>Do you wish to proceed?</p>

                    <div className='modal-action'>
                        <form method='dialog'>
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className='btn'
                                onClick={addAndGoToEvent}
                                style={{
                                    background: "#FDA855",
                                    color: "white",
                                    marginRight: "1rem",
                                }}
                            >
                                Create event
                            </button>
                            <button className='btn'>Return</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </dDiv>
    );
};

export default EventCreationPage;
