import React, { useState, useEffect, useRef } from "react";
import Calendar from "@/components/Filter/Calendar";
import MobileCard from "./MobileCard";

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

const SmallScreenEvents = (user) => {
    // State variables

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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEvents.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

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
            const matchingEvents = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setFilteredEvents(matchingEvents);
        });

        return unsubscribe;
    };
    useEffect(() => {
        const unsubscribe = filterEventsByLocation(inputValue1);

        return () => {
            unsubscribe();
        };
    }, [inputValue1]);

    const checkEvents = async (dates) => {
        try {
            const eventsForAllDates = await Promise.all(
                dates.map(async (selectedDate) => {
                    const q = query(
                        collection(db, "events"),
                        where("date", "==", selectedDate)
                    );

                    const querySnapshot = await getDocs(q);
                    return querySnapshot.docs.map((doc) => doc.data());
                })
            );

            // Flatten the array of arrays into a single array
            const filteredEvents = [].concat(...eventsForAllDates);
            console.log(filteredEvents); // This will log the events for the selected range

            setCalendarEvents(filteredEvents);
            setSelectedDate(dates);
        } catch (error) {
            console.error("Error getting filtered events: ", error);
        }
    };

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
            if (selectedDate && selectedDate.length > 0) {
                filteredEvents = filteredEvents.filter((event) =>
                    selectedDate.includes(event.date)
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
    const handleInputDelete = () => {
        setInputValue1("");
    };
    return (
        <>
            <main
                className={` flex flex-col justify-center items-center overflow-scroll`}
            >
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>This is the events page</p>
                </div>
                <button
                    onClick={resetEvents}
                    className={` w-[52px] bg-blue-400 text-white text-[10px] hover:bg-blue-500 rounded-[4px] h-[16px] ml-auto mr-2`}
                >
                    All events
                </button>
                <div className={`flex flex-col-reverse`}>
                    <div className={`h-[750px]`}>
                        <ul
                            className={` flex flex-row justify-center flex-wrap items gap-4`}
                        >
                            {currentItems.map((event) => {
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
                            <div className='flex justify-center gap-8 text-black'>
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                ).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() =>
                                            setCurrentPage(pageNumber)
                                        }
                                        disabled={pageNumber === currentPage}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                            </div>
                        </ul>
                    </div>
                    <div className='flex bg-white z-10 flex-row items-center justify-evenly text-black'>
                        <div>
                            <button
                                className='sm:hidden'
                                onClick={handleTestClick}
                            >
                                Dates
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
                                    } border border-black rounded-[8px] z-10 bg-white`}
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
                                onInputDelete={handleInputDelete}
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

export default SmallScreenEvents;
