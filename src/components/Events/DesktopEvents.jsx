import React, { useState, useEffect } from "react";
import styles from "@/styles/Events.module.css";
import { useTranslation } from "react-i18next";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import Calendar from "@/components/Filter/Calendar";
import FilterByType from "@/components/Filter/FilterByType";

import { db } from "@/util/firebase";
import WideScreenCard from "@/components/Events/WideScreenCard";
import FirestoreLocation from "../Filter/FirestoreLocation";

const DesktopEvents = (user) => {
    const { t } = useTranslation();
    // State variables
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [inputValue1, setInputValue1] = useState("");
    const [isLocationOpen, setLocationOpen] = useState(false);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [CalendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [resetLocation, setResetLocation] = useState(false);
    const [resetDays, setResetDays] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

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

    const checkEvents = async (selectedDate) => {
        const q = query(
            collection(db, "events"),
            where("date", "==", selectedDate)
        );

        try {
            const querySnapshot = await getDocs(q);
            const filteredEvents = querySnapshot.docs.map((doc) => doc.data());
            setCalendarEvents(filteredEvents);
            setSelectedDate(selectedDate);
        } catch (error) {
            console.error("Error getting filtered events: ", error);
        }
    };

    // Resize event listener
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setLocationOpen(true);
            } else {
                setLocationOpen(false);
            }
        };

        // Set initial state based on window size
        if (window.innerWidth > 640) {
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
            let filteredEvents = events; // Use all events, not just current page

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
    }, [events, selectedDate, inputValue1, filteredTypes]); // Depend on all events

    // Pagination should be handled outside of the useEffect
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEvents.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

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
            <main className={` flex flex-col justify-center items-center`}>
                <div>
                    <h1>{t("events:welcome", { name: user.name })}</h1>
                    <p>{t("events:eventsPage")}</p>
                </div>

                <div
                    className={`flex flex-row-reverse items-center justify-evenly w-full`}
                >
                    <div className={`w-[55vw] h-[140vh]`}>
                        <ul className={`flex flex-col items gap-2`}>
                            {currentItems.map((event) => {
                                return (
                                    <WideScreenCard
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
                                        {t("events:noEventsFound")}
                                    </p>
                                )}

                            {selectedDate && CalendarEvents.length === 0 && (
                                <p className='text-red-500 text-center'>
                                    {t("events:noEventsFoundForDate")}
                                </p>
                            )}
                        </ul>
                        <div className='flex justify-center gap-20 text-black'>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    disabled={pageNumber === currentPage}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex h-[140vh] flex-col ml-[-50px] items-center text-black gap-7'>
                        <div className='sm:flex s:flex-col sm:items-center sm:justify-center'>
                            <div
                                className={`${styles.calendarContainer} border border-black rounded-[8px] bg-white sm:bg-transparent`}
                            >
                                <Calendar
                                    resetDays={resetDays}
                                    checkEvents={checkEvents}
                                />
                            </div>
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
                            resetEvents={resetEvents}
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

export default DesktopEvents;
