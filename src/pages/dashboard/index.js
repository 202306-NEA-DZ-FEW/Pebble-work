import useMediaQuery from "@mui/material/useMediaQuery";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { IoIosGitCompare } from "react-icons/io";
import { IoIosGitBranch } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import styles from "@/styles/Events.module.css";

import DesktopCard from "@/components/Events/DesktopCard";
import EventCreation from "@/components/Events/EventCreation";
import MobileCard from "@/components/Events/MobileCard";
import SmallCard from "@/components/Events/SmallCard";

import { auth, db } from "../../util/firebase";
const Dashboarduser = () => {
    const { t } = useTranslation();

    const [joinedEvents, setJoinedEvents] = useState([]);
    const [createdEvent, setCreatedEvent] = useState([]);
    const [User, setUser] = useState(null);
    const [displayCreatedEvents, setDisplayCreatedEvents] = useState(false);
    const [eventsMatchingInterests, setEventsMatchingInterests] = useState([]);
    const [Nameuser, SetNameUser] = useState("");
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width:1024px)");
    const isSmallScreen = useMediaQuery("(max-width:768px)");
    const [isNavVisible, setIsNavVisible] = useState(false);

    // Function to toggle the visibility of the nav bar
    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };
    const closeNav = () => {
        setIsNavVisible(false);
    };

    useEffect(() => {
        if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);

            getDoc(userDocRef)
                .then((doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();
                        const userName = userData.Name;
                        SetNameUser(userName);
                    } else {
                        console.log("User document does not exist");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        } else {
            SetNameUser(null);
        }
    }, [auth.currentUser]); // to show the user name in the welcome message

    const handleDisplayEvents = (eventType) => {
        if (eventType === "created") {
            setDisplayCreatedEvents(true);
        } else {
            setDisplayCreatedEvents(false);
        }
    };

    const fetchEventData = async (eventIds) => {
        const eventsCollectionRef = collection(db, "events");

        // data for each event
        const eventIdsPromises = eventIds.map(async (eventId) => {
            const eventDocRef = doc(eventsCollectionRef, eventId);
            const eventDocSnap = await getDoc(eventDocRef);
            if (eventDocSnap.exists()) {
                const eventData = eventDocSnap.data();
                eventData.id = eventId;
                return eventData;
            } else {
                // console.log(`Event with ID ${eventId} does not exist`);
                return null;
            }
        });

        const eventsData = await Promise.all(eventIdsPromises);
        const validEventsData = eventsData.filter(
            (eventData) => eventData !== null
        );
        return validEventsData;
    };
    //using the "interests" from user's collection, to compare with the types from events, and get the right events
    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollectionRef = collection(db, "events");
            const eventsSnapshot = await getDocs(eventsCollectionRef);
            const eventsList = eventsSnapshot?.docs?.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            const userInterests = User?.interests; // User's interests
            const eventsMatchingInterests = eventsList?.filter((event) =>
                userInterests?.includes(event.type)
            );

            setEventsMatchingInterests(eventsMatchingInterests);
        };

        if (User) {
            fetchEvents();
        }
    }, [User]);
    const eventsToDisplay = displayCreatedEvents ? createdEvent : joinedEvents;
    const title = displayCreatedEvents ? "Events Created" : "Joined Events";

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
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
        return () => {
            unsubscribe();
        };
    }, []);
    if (!auth.currentUser) {
        return <EventCreation />;
    }
    return (
        <>
            <button
                className='button absolute bg-[#2E7EAA] text-white text-[12px] rounded-[4px] p-2 top-[80px] left-2'
                onClick={toggleNav}
            >
                {t("dashboard:dashboarduser:button")}
            </button>
            <nav
                className={`absolute top-30 bottom-0 h-full left-0 bg-[#e6f5e4] overflow-hidden duration-200 linear shadow-md mt-30 transform transition-transform ${
                    isNavVisible ? "translate-x-0" : "-translate-x-full"
                } pt-10 px-3`}
                style={{
                    color: "#1A1A1A",
                    fontFamily: "Poppins",
                    fontWeight: " 500",
                    letterSpacing: "0.11px",
                    wordWrap: "break-word",
                }}
            >
                <ul>
                    <li className='flex items-center mb-2 mt-20 ml-2'>
                        <p className='font-bold text-lg italic mr-2'>
                            {t("dashboard:dashboarduser:welcome")}{" "}
                            <span className='text-xl text-[#82a572]'>
                                {Nameuser}!
                            </span>
                        </p>
                    </li>
                    <li className='flex items-center mb-10 mt-4 ml-1'>
                        <p className='font-semibold text-lg italic mr-2'>
                            {t("dashboard:dashboarduser:gladToSeeYou")}
                        </p>
                    </li>

                    <li
                        className='flex items-center mb-20 mt-8 hover:bg-[#BFEAD3]'
                        onClick={() => router.push("/events/create")}
                    >
                        <div className='flex items-center'>
                            <IoCreateOutline size={30} className='mr-1' />
                            <span className='mr-2 block hover:bg-[#BFEAD3] cursor-pointer'>
                                {t("dashboard:dashboarduser:createNewEvent")}
                            </span>
                        </div>
                    </li>
                    <li className='hover:bg-[#BFEAD3] '>
                        <button
                            className='flex items-center mb-24'
                            onClick={() => {
                                handleDisplayEvents("created");
                                closeNav();
                            }}
                        >
                            <IoIosGitBranch size={30} className='mr-1' />
                            <span class='my-2 block hover:bg-[#BFEAD3] cursor-pointer'>
                                {t("dashboard:dashboarduser:eventsCreated")} ►
                            </span>
                        </button>
                    </li>
                    <li className='hover:bg-[#BFEAD3]'>
                        <button
                            className='flex items-center mb-40  hover:bg-[#BFEAD3] '
                            onClick={() => {
                                handleDisplayEvents("Joined");
                                closeNav();
                            }}
                        >
                            <IoIosGitCompare size={30} className='mr-1' />
                            <span class='my-2 block hover:bg-[#BFEAD3] cursor-pointer'>
                                {t("dashboard:dashboarduser:eventsJoined")} ►
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>

            <div onClick={closeNav}>
                <div className=' min-h-screen md:min-h-[100vh] lg:ml-40 sm:ml-48 relative'>
                    <div className='flex justify-center items-center mt-10 md:mt-0'>
                        <div className='absolute lg:w-full flex justify-center'>
                            <div className='width lg:w-[800px] md:w-[500px] sm:w-[400px] w-[50vw] bg-blue-500 opacity-10 h-[130px] rounded-[20px]'></div>
                        </div>
                        <p
                            className='width font-bold sm:static md:mr-[0px] sm:mr-[-80px] absolute lg:w-auto sm:w-[300px] w-[50vw] md:text-lg pl-4 italic '
                            style={{
                                color: "#1A1A1A",
                                fontWeight: " 500",
                                letterSpacing: "0.11px",
                                wordWrap: "break-word",
                            }}
                        >
                            “It is not enough to be compassionate, you must
                            act.” - Dalai Lama
                        </p>

                        <img
                            src='/images/Volunteering-pana.png'
                            alt='Sitting'
                            className='w-auto sm:w-auto sm:h-[180px] h-[150px] md:w-[150px] md:h-[150px] rounded-full ml-0 sm:z-10'
                        />
                    </div>
                    <div>
                        <h2
                            className='font-bold text-lg flex mb-4 ml-16 mt-4'
                            style={{
                                color: "#1A1A1A",
                                fontWeight: " 500",
                                letterSpacing: "0.11px",
                                wordWrap: "break-word",
                            }}
                        >
                            {title}:
                        </h2>
                    </div>
                    <div
                        className={`flex flex-wrap space-x-1 max-w-[1500px] max-h-[500px] pb-1 ${styles.information} overflow-auto justify-center items-center mb-16 mt-12 `}
                    >
                        {eventsToDisplay.map((event) => {
                            if (isSmallScreen) {
                                return (
                                    <div className='mb-2' key={event.id}>
                                        <SmallCard
                                            eventId={event.id}
                                            key={event.id}
                                            title={event.title}
                                            type={event.type}
                                            image={
                                                event?.image ||
                                                "/event_image.png"
                                            }
                                            location={event.location}
                                            description={event.description}
                                            organizer={event.organizer}
                                            time={event.time}
                                            date={event.date}
                                        />
                                    </div>
                                );
                            } else if (isMobile) {
                                return (
                                    <MobileCard
                                        eventId={event.id}
                                        key={event.id}
                                        title={event.title}
                                        type={event.type}
                                        image={
                                            event?.image || "/event_image.png"
                                        }
                                        location={event.location}
                                        description={event.description}
                                        organizer={event.organizer}
                                        time={event.time}
                                        date={event.date}
                                    />
                                );
                            } else {
                                return (
                                    <DesktopCard
                                        eventId={event.id}
                                        key={event.id}
                                        title={event.title}
                                        type={event.type}
                                        image={
                                            event?.image || "/event_image.png"
                                        }
                                        location={event.location}
                                        description={event.description}
                                        organizer={event.organizer}
                                        time={event.time}
                                        date={event.date}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div>
                    <div>
                        <h2
                            className=' font-bold text-lg flex ml-16 mb-10 mt-8'
                            style={{
                                color: "#1A1A1A",
                                fontWeight: " 700",
                                letterSpacing: "0.11px",
                                wordWrap: "break-word",
                            }}
                        >
                            {t("dashboard:dashboarduser:suggestedEvents")}
                        </h2>
                    </div>

                    <div
                        className={`flex overflow-auto gap-4 ${styles.information} mb-4 ml-[20px]`}
                    >
                        {eventsMatchingInterests.map((event) => (
                            <SmallCard
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
            </div>
            <style jsx>{`
                @media (max-width: 640px) {
                    button {
                        display: block;
                    }
                    nav {
                        display: block;
                        transform: ${isNavVisible
                            ? "translateX(0)"
                            : "translateX(-100%)"};
                        transition: transform 0.7s ease-in-out;
                        background-color: #e6f5e4;
                        z-index: 50;
                    }
                }
                @media (min-width: 641px) {
                    .button {
                        display: none;
                    }
                    nav {
                        display: block;
                        transform: translateX(0);
                    }
                }
                @media (max-width: 460px) {
                    .width {
                        width: 60vw;
                        font-size: 11px;
                    }
                }
            `}</style>
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
                "events",
                "eventCreation",
                "dashboard",
            ])),
            // Will be passed to the page component as props
        },
    };
}
