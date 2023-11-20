import React, { useEffect, useState } from "react";
import { db, auth } from "../../util/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DesktopCard from "@/components/Events/DesktopCard";
import styles from "@/styles/Events.module.css";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { IoIosGitBranch } from "react-icons/io";
import MobileCard from "@/components/Events/SmallCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// import { useRouter } from "next/router";
const Dashboarduser = () => {
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [createdEvent, setCreatedEvent] = useState([]);
    const [User, setUser] = useState(null);
    const [displayCreatedEvents, setDisplayCreatedEvents] = useState(false);
    const [eventsMatchingInterests, setEventsMatchingInterests] = useState([]);

    // Function to handle the display of created or joined events
    const handleDisplayEvents = (eventType) => {
        if (eventType === "created") {
            setDisplayCreatedEvents(true);
        } else {
            setDisplayCreatedEvents(false);
        }
    };

    // Helper function to fetch event data based on an array of event IDs
    const fetchEventData = async (eventIds) => {
        const eventsCollectionRef = collection(db, "events");

        // data for each event
        const eventIdsPromises = eventIds.map(async (eventId) => {
            const eventDocRef = doc(eventsCollectionRef, eventId);
            const eventDocSnap = await getDoc(eventDocRef);
            if (eventDocSnap.exists()) {
                const eventData = eventDocSnap.data();
                // Include the eventId in the event data
                eventData.id = eventId;
                return eventData;
            } else {
                console.log(`Event with ID ${eventId} does not exist`);
                return null;
            }
        });

        // Wait for all event data to be fetched
        const eventsData = await Promise.all(eventIdsPromises);
        // Filter out any null values (events that don't exist)
        const validEventsData = eventsData.filter(
            (eventData) => eventData !== null
        );
        return validEventsData;
    };

    // useEffect hook to fetch events from the database and filter them based on user's interests
    useEffect(() => {
        const fetchEvents = async () => {
            // Fetch all events from the database
            const eventsCollectionRef = collection(db, "events");
            const eventsSnapshot = await getDocs(eventsCollectionRef);
            const eventsList = eventsSnapshot?.docs?.map((doc) => ({
                ...doc.data(),
                id: doc.id, // Include the eventId in the event data
            }));

            // Filter events based on user's interests
            const userInterests = User?.interests; // User's interests
            const eventsMatchingInterests = eventsList?.filter((event) =>
                userInterests?.includes(event.type)
            );

            // Update the state with the filtered events
            setEventsMatchingInterests(eventsMatchingInterests);
        };

        // Only fetch events if User is not null
        if (User) {
            fetchEvents();
        }
    }, [User]); // Run this effect whenever User changes

    // Determine which events to display based on the displayCreatedEvents state
    const eventsToDisplay = displayCreatedEvents ? createdEvent : joinedEvents;
    const title = displayCreatedEvents ? "Events Created" : "Joined Events";

    //  user data and the events they've joined or created
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                // user data from the database
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUser(userDoc.data());

                        // events the user has created
                        const userCreatedEvents =
                            userDoc.data().eventsCreated || [];
                        const eventIds = userCreatedEvents.map(
                            (event) => event.eventId
                        );
                        const createdEventsData = await fetchEventData(
                            eventIds
                        );
                        setCreatedEvent(createdEventsData);

                        // events the user has joined
                        const userJoinedEvents =
                            userDoc.data().eventsJoined || [];
                        const eventIdsJoined = userJoinedEvents.map(
                            (event) => event.eventId
                        );
                        const joinedEventsData = await fetchEventData(
                            eventIdsJoined
                        );
                        setJoinedEvents(joinedEventsData);
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

        // Unsubscribe from the auth listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <nav
                className='absolute top-30 bottom-0 h-full left-0 bg-[#e6f5e4] w-120 overflow-hidden transition-width duration-200 linear shadow-md mt-30'
                style={{
                    color: "#1A1A1A",
                    fontFamily: "Poppins",
                    fontWeight: " 500",
                    letterSpacing: "0.11px",
                    wordWrap: "break-word",
                }}
            >
                <ul>
                    <li className='flex items-center mb-24 mt-60  hover:bg-[#BFEAD3] '>
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
                            className='flex items-center mb-40  hover:bg-[#BFEAD3] '
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
                        className='font-bold text-lg flex mb-4 ml-16 mt-4'
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
                    className={`flex flex-wrap max-h-40   ${styles.information} overflow-auto justify-center items-center mb-16 mt-16`}
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
                        className=' font-bold text-lg flex  ml-16 mb-10 mt-8'
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
                    className={`flex overflow-auto gap-4 ${styles.information} mb-4 ml-10`}
                >
                    {eventsMatchingInterests.map((event) => (
                        <MobileCard
                            key={event.id}
                            eventId={event.id}
                            title={event.title}
                            type={event.type}
                            image={event?.image || "/event_image.png"}
                            location={event.location}
                            description={event.description}
                            organizer={event.organizer}
                            time={event.time}
                            date={event.date}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
export default Dashboarduser;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "about",
                "eventCreation",
                "events",
            ])),
            // Will be passed to the page component as props
        },
    };
}
