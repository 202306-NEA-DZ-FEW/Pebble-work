import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { auth, db, storage } from "@/util/firebase";

function EditEvent({ event, organizer }) {
    //creates the event object to be sent to firestore
    const [input, setInput] = useState({
        location: "",
        title: "",
        time: "",
        date: "",
        description: "",
        image: "",
    });

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
                        <div className='flex flex-col  md:space-x-20  md:flex-row'>
                            <div
                                className='my-auto lg:flex lg:flex-col md:flex-col md:bt-5 sm:flex sm:flex-col sm:flex-wrap sm:mt-5 md:mt-3 '
                                style={{ paddingTop: "2rem" }}
                            >
                                <p className='font-bold text-5xl sm:inline-block '>
                                    {event.location}
                                </p>

                                <p className='italic mt-2'>
                                    Location cannot be changed
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
                                    Update Time:{" "}
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

                        <div className='flex l flex-col  mx-auto   flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-center lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start'>
                            <h1 className='mt-5 text-xl font-semibold align-left '>
                                Update Title:{" "}
                            </h1>
                            <p className='max-w-4xl mt-2 tinyText text-gray-400'>
                                Need a better title to convey the objective of
                                the event? We got you covered
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
                        </div>

                        <div className='flex flex-col flex-wrap mt-2 w-screen'>
                            <h1 className='mt-5 text-xl font-semibold align-left '>
                                Update Description:
                            </h1>
                            <p className='max-w-4xl mt-2 tinyText text-gray-400'>
                                Have additional goals or activities?
                            </p>
                            <form id='eventdescription' className='mt-1 '>
                                <textarea
                                    id='description'
                                    value={input.description}
                                    onChange={handleInputChange}
                                    placeholder={event?.description}
                                    className='outline outline-1 mt-2 h-40 rounded w-7/12 font-semibold'
                                ></textarea>
                            </form>
                        </div>

                        <div className='flex flex-col flex-wrap mt-0 w-screen'>
                            <h1 className='mt-5 text-xl font-semibold align-left '>
                                Event Image:
                            </h1>
                            <p className='max-w-4xl mt-3 tinyText text-gray-400'>
                                Upload an image or update the previous one.
                            </p>
                            <input
                                type='file'
                                onChange={(e) => setImg(e.target.files[0])}
                                id='eventimage'
                                className='mt-3 file-input file-input-bordered w-full max-w-3xl border-2 border-black'
                            ></input>
                        </div>

                        <div className='flex items-center flex-row mt-3 rounded '>
                            <button
                                onClick={updateEvent}
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
                                    "Update Event"
                                ) : (
                                    <span className='italic font-normal'>
                                        No edits
                                    </span>
                                )}
                            </button>
                        </div>
                        <div
                            style={{ height: "200px", marginTop: "4rem" }}
                        ></div>
                    </>
                ) : (
                    <p>Access denied ):</p>
                )
            ) : (
                <p>Access denied ):</p>
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
        },
    };
}

export default EditEvent;
