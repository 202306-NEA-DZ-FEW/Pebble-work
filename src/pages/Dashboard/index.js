import React, { useEffect, useState } from "react";
import { db, auth } from "../../util/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DesktopCard from "@/components/Events/DesktopCard";
import styles from "@/styles/Events.module.css";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { IoIosGitBranch } from "react-icons/io";

// import { useRouter } from "next/router";
const Dashboarduser = () => {
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [createdEvent, setcreatedEvent] = useState([]);
    const [User, setUser] = useState(null);
    const [displayCreatedEvents, setDisplayCreatedEvents] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCurrentUser(userDoc.data());
                        // setUserInterests(userDoc.data().interests);

                        // Set joined events
                        const userEvents = userDoc.data().eventsJoined || [];
                        setJoinedEvents(userEvents);
                        console.log(userEvents); // Check if this logs the expected events
                    } else {
                        return;
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    return;
                }
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
                        // Assuming events created by user are stored in 'createdEvents' field
                        const userCreatedEvents =
                            userDoc.data().eventsCreated || [];
                        // Now 'userCreatedEvents' should contain events the user has created
                        setcreatedEvent(userCreatedEvents);
                        console.log(createdEvent);

                        // Further handling of userCreatedEvents, set state, etc.
                    } else {
                        return;
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    return;
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCurrentUser(userDoc.data());

                        // Assuming user's interests are stored in an array
                        const userInterests = userDoc.data().interests || [];

                        // Fetch events based on user interests
                        const eventsBasedOnInterests = [];
                        // Replace 'eventsCollection' with your actual events collection name
                        const eventsSnapshot = await collection(
                            db,
                            "eventsCollection"
                        ).get();
                        eventsSnapshot.forEach((eventDoc) => {
                            const eventData = eventDoc.data();
                            const eventInterests = eventData.interests || []; // Replace 'interests' with your event interest field
                            // Check if any user interests match event interests
                            if (
                                userInterests.some((interest) =>
                                    eventInterests.includes(interest)
                                )
                            ) {
                                eventsBasedOnInterests.push(eventData);
                            }
                        });

                        // Now 'eventsBasedOnInterests' should contain events matching user interests
                        console.log(eventsBasedOnInterests);

                        // Further handling of eventsBasedOnInterests, set state, etc.
                    } else {
                        return;
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    return;
                }
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCurrentUser(userDoc.data());

                        // Assuming user's interests are stored in an array
                        const userInterests = userDoc.data().interests || [];

                        // Fetch events based on user interests
                        const eventsBasedOnInterests = [];
                        // Replace 'eventsCollection' with your actual events collection name
                        const eventsSnapshot = await collection(
                            db,
                            "events"
                        ).get();
                        eventsSnapshot.forEach((eventDoc) => {
                            const eventData = eventDoc.data();
                            const eventInterests = eventData.type || []; // Replace 'interests' with your event interest field
                            // Check if any user interests match event interests
                            if (
                                userInterests.some((interest) =>
                                    eventInterests.includes(interest)
                                )
                            ) {
                                eventsBasedOnInterests.push(eventData);
                            }
                        });

                        // Now 'eventsBasedOnInterests' should contain events matching user interests
                        console.log(eventsBasedOnInterests);

                        // Further handling of eventsBasedOnInterests, set state, etc.
                    } else {
                        return;
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    return;
                }
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <nav
                className='absolute top-20 bottom-0 h-full left-0 bg-[#e6f5e4] w-120 overflow-hidden transition-width duration-200 linear shadow-md mt-40'
                style={{
                    color: "#1A1A1A",
                    fontFamily: "Poppins",
                    fontWeight: " 500",
                    letterSpacing: "0.11px",
                    wordWrap: "break-word",
                }}
            >
                <ul>
                    <li className='flex items-center mb-24 mt-24  hover:bg-[#BFEAD3] '>
                        <a href='#' className='flex items-center'>
                            <IoCreateOutline size={30} className='mr-1 ' />
                            <span class='mr-2 block hover:bg-[#BFEAD3] cursor-pointer '>
                                Create New Event
                            </span>
                        </a>
                    </li>
                    <li className=' hover:bg-[#BFEAD3] '>
                        <button className='flex items-center mb-24'>
                            <IoIosGitBranch size={30} className='mr-1' />
                            <span class='my-2 block hover:bg-[#BFEAD3] cursor-pointer'>
                                Created Events
                            </span>
                        </button>
                    </li>
                    <li>
                        <button className='flex items-center mb-24  hover:bg-[#BFEAD3] '>
                            <IoIosGitCompare size={30} className='mr-1' />
                            <span class='my-2 block hover:bg-[#BFEAD3] cursor-pointer'>
                                Joined Evnets
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>

            <div className=' min-h-screen md:min-h-[100vh] ml-40 relative'>
                <div className='flex justify-center items-center mt-0'>
                    <div className='absolute w-full flex justify-center'>
                        <div
                            className='w-auto bg-blue-500 opacity-30 pt-20 pb-10 rounded-[20px] px-80'
                            style={{ width: "100%", maxWidth: "850px" }}
                        ></div>
                    </div>
                    <p
                        className='font-bold text-lg italic '
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                            // boxShadow: "0 4px 6px rgba(146, 227, 169, 0.6)",
                        }}
                    >
                        “It s not enough to be compassionate, you must act.” -
                        Dalai Lama
                    </p>

                    <img
                        src='/images/Volunteering-pana.png'
                        alt='Sitting'
                        className='w-full sm:w-auto sm:h-auto h-[50px] md:w-[150px] md:h-[150px] rounded-full ml-0 z-10'
                    />
                </div>
                <div>
                    <h2
                        className='font-bold text-lg flex mb-4 ml-16'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        Evenets Joined:
                    </h2>
                </div>
                <div
                    className={`flex flex-wrap max-h-40   ${styles.information} overflow-auto justify-center items-center`}
                >
                    {joinedEvents.map((event) => {
                        return (
                            <DesktopCard
                                eventId={event.id}
                                key={event.id}
                                title={event.title}
                                type={event.type}
                                image={event?.image || "/event_image.png"}
                                location={event.location}
                                description={"fhfhffgddassdsdfsddsd"}
                                organizer={event.organizer}
                                time={event.time}
                                date={event.date}
                            />
                        );
                    })}
                </div>

                <div>
                    <h2
                        className=' font-bold text-lg flex  ml-16 mb-4 mt-2'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        Evenets Created:
                    </h2>
                </div>

                <div
                    className={`flex flex-wrap max-h-40   ${styles.information} overflow-auto justify-center items-center`}
                >
                    {createdEvent.map((event) => {
                        return (
                            <DesktopCard
                                eventId={event.id}
                                key={event.id}
                                title={event.title}
                                type={event.type}
                                image={event?.image || "/event_image.png"}
                                location={event.location}
                                description={"fhfhffgddassdsdfsddsd"}
                                organizer={event.organizer}
                                time={event.time}
                                date={event.date}
                            />
                        );
                    })}
                </div>
                <div>
                    <h2
                        className=' font-bold text-lg flex  ml-16 mb-4 mt-2'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        Upcoming events:
                    </h2>
                </div>

                <div
                    className={`flex overflow-auto  ${styles.information} mb-4 ml-2`}
                >
                    {joinedEvents.map((event, index) => (
                        <div
                            key={index}
                            className='flex-shrink-0 w-60 bg-white shadow-xl rounded-lg m-4'
                        >
                            <figure className='px-10 pt-10'>
                                <img
                                    src={event?.image || "/event_image.png"}
                                    alt={event.title}
                                    className='rounded-t-lg'
                                />
                            </figure>
                            <div className='p-6'>
                                <h2 className='text-xl font-bold mb-2'>
                                    {event.title}
                                </h2>
                                <p className='text-base'>{event.description}</p>
                                <div className='mt-4'>
                                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                                        Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Dashboarduser;
