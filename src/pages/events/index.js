import React, { useState, useEffect, useRef } from "react";
import Calendar from "@/components/Filter/Calendar";
import EventCard from "@/components/Events/EventCard";
import EventCardLeft from "@/components/Events/EventCardLeft";
import styles from "@/styles/Events.module.css";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import FilterByType from "@/components/Filter/FilterByType";
import FirestoreLocation from "@/components/Filter/FirestoreLocation";

import { db } from "@/util/firebase";

const EventsPage = (user) => {
    // State variables
    const [inputValue, setInputValue] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [inputValue1, setInputValue1] = useState("");
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isLocationOpen, setLocationOpen] = useState(false);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [CalendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [resetLocation, setResetLocation] = useState(false);
    const [resetDays, setResetDays] = useState(false);

    const dropdownRef = useRef(null);
    const locationRef = useRef(null);

    const handleLocationInputChange = (value) => {
        setInputValue1(value);
    };

    const filterEventsByLocation = (location) => {
        if (!location) {
            setFilteredEvents([]);
            return () => {};
        }

        const eventsCollectionRef = collection(db, "events");
        const q = query(eventsCollectionRef, where("location", "==", location));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const matchingEvents = querySnapshot.docs.map((doc) => doc.data());
            setFilteredEvents(matchingEvents);

            console.log(filteredEvents);
        });

        return unsubscribe;
    };
    useEffect(() => {
        const unsubscribe = filterEventsByLocation(inputValue1);

        return () => {
            unsubscribe();
        };
    }, [inputValue1]);

    const checkEvents = async (selectedDate) => {
        const q = query(
            collection(db, "events"),
            where("date", "==", selectedDate)
        );

        try {
            const querySnapshot = await getDocs(q);
            const filteredEvents = querySnapshot.docs.map((doc) => doc.data());
            setCalendarEvents(filteredEvents);
            console.log(CalendarEvents);
            setSelectedDate(selectedDate);
        } catch (error) {
            console.error("Error getting filtered events: ", error);
        }
    };

    const handleLocationOutside = (event) => {
        if (window.innerWidth <= 640) {
            if (
                locationRef.current &&
                !locationRef.current.contains(event.target)
            ) {
                setLocationOpen(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleLocationOutside);
        return () => {
            document.removeEventListener("click", handleLocationOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setFilteredTypes(false);
        }
    };
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Handle location click
    const handleLocationClick = () => {
        setLocationOpen(!isLocationOpen);
    };

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle test click
    const handleTestClick = () => {
        setCalendarOpen(!isCalendarOpen);
    };

    // Resize event listener
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setCalendarOpen(true);
                setLocationOpen(true);
            } else {
                setCalendarOpen(false);
                setLocationOpen(false);
            }
        };

        // Set initial state based on window size
        if (window.innerWidth > 640) {
            setCalendarOpen(true);
            setLocationOpen(true);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Fetch events from Firebase
    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollectionRef = collection(db, "events");
            const eventsSnapshot = await getDocs(eventsCollectionRef);
            const eventsData = eventsSnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filteredEvents = events;

            // Apply type filter
            if (filteredTypes.length > 0) {
                filteredEvents = filteredEvents.filter((event) =>
                    filteredTypes.includes(event.type)
                );
            }

            // Apply location filter
            if (inputValue1) {
                filteredEvents = filteredEvents.filter(
                    (event) => event.location === inputValue1
                );
            }

            // Apply date filter
            if (selectedDate) {
                filteredEvents = filteredEvents.filter(
                    (event) => event.date === selectedDate
                );
            }

            setFilteredEvents(filteredEvents);
        };

        applyFilters();
    }, [events, selectedDate, inputValue1, filteredTypes]);

    const resetEvents = () => {
        setSelectedTypes([]);
        setInputValue1("");
        setSelectedDate(null);
        setFilteredTypes([]);
        setFilteredEvents([]);
        setCalendarEvents([]);
        setResetLocation(true);
        setResetDays([]);
    };

    return (
        <>
            <main
                className={` flex flex-col justify-center items-center pb-12`}
            >
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>This is the events page</p>
                </div>
                <button
                    onClick={resetEvents}
                    className={` w-[52px] bg-blue-400 text-white text-[10px] hover:bg-blue-500 xl:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px] ml-auto  mr-2`}
                >
                    All events
                </button>
                <div
                    className={`flex flex-col-reverse sm:flex sm:flex-row-reverse sm:items-center sm:justify-evenly sm:gap-8 sm:h-full sm:w-full`}
                >
                    <div
                        className={`md:h-[800px] h-[400px] xl:w-[840px] pb-[140px] md:pb-[140px] md:w-[480px] lg:w-[490px] ${styles.information}`}
                    >
                        <ul className={` flex flex-col items gap-2 `}>
                            {filteredEvents.map((event, index) => {
                                const EventCardComponent =
                                    index % 2 === 0 ? EventCard : EventCardLeft;
                                return (
                                    <EventCardComponent
                                        eventId={event.id}
                                        key={event.id}
                                        title={event.title}
                                        type={event.type}
                                        image={event.image}
                                        location={event.location}
                                        description={event.description}
                                        organizer={event.organizer}
                                        time={event.time}
                                        date={event.date}
                                    />
                                );
                            })}
                            {(inputValue1 || filteredTypes.length > 0) &&
                                filteredEvents.length === 0 && (
                                    <p className='text-red-500 text-center'>
                                        No events found for this date and
                                        location
                                    </p>
                                )}

                            {selectedDate && CalendarEvents.length === 0 && (
                                <p className='text-red-500 text-center'>
                                    No events found for this date
                                </p>
                            )}
                        </ul>
                    </div>
                    <div className='flex bg-white z-10 flex-row items-center justify-between sm:flex sm:flex-col sm:items-center text-black sm:gap-7'>
                        <div className='sm:flex s:flex-col sm:items-center sm:justify-center'>
                            <button
                                className='sm:hidden'
                                onClick={handleTestClick}
                            >
                                Change Date
                            </button>
                            {isCalendarOpen && (
                                <div
                                    style={{
                                        animation: `${
                                            isCalendarOpen
                                                ? `${styles.fadeIn} 0.7s ease-in-out`
                                                : ""
                                        }`,
                                    }}
                                    className={`${
                                        isCalendarOpen ? "open" : ""
                                    } ${
                                        styles.calendarContainer
                                    } border border-black rounded-[8px] z-10 bg-white sm:bg-transparent`}
                                >
                                    <Calendar
                                        resetDays={resetDays}
                                        checkEvents={checkEvents}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='h-66'>
                            <FirestoreLocation
                                onInputChange={handleLocationInputChange}
                                resetLocation={resetLocation}
                                setResetLocation={setResetLocation}
                            />
                        </div>

                        <FilterByType
                            ref={dropdownRef}
                            setFilteredTypes={setFilteredTypes}
                            selectedTypes={selectedTypes}
                            setSelectedTypes={setSelectedTypes}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventsPage;
