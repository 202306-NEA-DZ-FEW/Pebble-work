import React, { useEffect, useState } from "react";
import { db, auth } from "../../util/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DesktopCard from "@/components/Events/DesktopCard";
import styles from "@/styles/Events.module.css";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { IoIosGitBranch } from "react-icons/io";

// import { useRouter } from "next/router";
const Dashboarduser = () => {
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [interstEvents, setInterst] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);
    const [createdEvent, setcreatedEvent] = useState([]);
    const [User, setUser] = useState(null);
    const [displayCreatedEvents, setDisplayCreatedEvents] = useState(false);
    const handleDisplayEvents = (eventType) => {
        if (eventType === "created") {
            setDisplayCreatedEvents(true);
        } else {
            setDisplayCreatedEvents(false);
        }
    };

    const eventsToDisplay = displayCreatedEvents ? createdEvent : joinedEvents;
    const title = displayCreatedEvents ? "Evenets Created" : "Joined evnted";

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollectionRef = collection(db, "events");
            const eventsSnapshot = await getDocs(eventsCollectionRef);
            const eventsList = eventsSnapshot.docs.map((doc) => doc.data());

            // Filter events based on user's interests
            const userInterests = User?.interests; // User's interests
            const eventsMatchingInterests = eventsList.filter((event) =>
                userInterests.includes(event.type)
            );

            console.log(eventsMatchingInterests); // Log the filtered events
            setInterst(eventsMatchingInterests);
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
                        const userEvents = userDoc.data().eventsJoined || [];
                        const eventId = userEvents.map(
                            (event) => event.eventId
                        );
                        const userCreatedEvents =
                            userDoc.data().eventsCreated || [];
                        const eventIds = userCreatedEvents.map(
                            (event) => event.eventId
                        );
                        const eventsData = [];
                        const eventsCollectionRef = collection(db, "events");
                        eventIds.forEach(async (eventId) => {
                            const eventDocRef = doc(
                                eventsCollectionRef,
                                eventId
                            );
                            const eventDocSnap = await getDoc(eventDocRef);
                            if (eventDocSnap.exists()) {
                                eventsData.push(eventDocSnap.data());
                            } else {
                                console.log(
                                    `Event with ID ${eventId} does not exist`
                                );
                            }
                        });

                        setcreatedEvent(eventsData);
                        const eventsDataJoined = [];
                        const eventCollectionRef = collection(db, "events");
                        eventId.forEach(async (eventId) => {
                            const eventDocRef = doc(
                                eventCollectionRef,
                                eventId
                            );
                            const eventDocSnap = await getDoc(eventDocRef);

                            if (eventDocSnap.exists()) {
                                eventsDataJoined.push(eventDocSnap.data());
                            } else {
                                console.log(
                                    `Event with ID ${eventId} does not exist`
                                );
                            }
                        });
                        setJoinedEvents(eventsDataJoined);
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

    return (
        <>
            <nav
                className='absolute top-20 bottom-0 h-full left-0 bg-[#e6f5e4] w-120 overflow-hidden transition-width duration-200 linear shadow-md mt-30'
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
                        <button
                            className='flex items-center mb-24'
                            onClick={() => handleDisplayEvents("created")}
                        >
                            <IoIosGitBranch size={30} className='mr-1' />
                            <span class='my-2 block hover:bg-[#BFEAD3] cursor-pointer'>
                                Created Events
                            </span>
                        </button>
                    </li>
                    <li>
                        <button
                            className='flex items-center mb-24  hover:bg-[#BFEAD3] '
                            onClick={() => handleDisplayEvents("Joined")}
                        >
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
                            className='w-auto bg-blue-500 opacity-10 pt-20 pb-10 rounded-[20px] px-80'
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
                        {title}
                    </h2>
                </div>
                <div
                    className={`flex flex-wrap max-h-40   ${styles.information} overflow-auto justify-center items-center`}
                >
                    {eventsToDisplay.map((event) => {
                        return (
                            <DesktopCard
                                eventId={event.id}
                                key={event.id}
                                title={event.title}
                                type={event.type}
                                image={event?.image || "/event_image.png"}
                                location={event.location}
                                description={event.description}
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
                    {interstEvents.map((event, index) => (
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
                                <h2 className='text-xl font-bold mb-2 '>
                                    {event.title}
                                </h2>
                                {/* <p className='text-base'>{event.description}</p> */}
                                <div className='mt-8'>
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
