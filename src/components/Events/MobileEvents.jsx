import React, { useState, useEffect } from "react";
import Calendar from "@/components/Filter/Calendar";
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

    const [selectedTypes, setSelectedTypes] = useState([]);
    const [inputValue1, setInputValue1] = useState("");
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [CalendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [resetLocation, setResetLocation] = useState(false);
    const [resetDays, setResetDays] = useState(false);

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
            console.log(CalendarEvents);
            setSelectedDate(selectedDate);
        } catch (error) {
            console.error("Error getting filtered events: ", error);
        }
    };

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
    const handleInputDelete = () => {
        setInputValue1("");
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
                    className={` w-[52px] bg-blue-400 text-white text-[10px] hover:bg-blue-500 md:text-[12px] rounded-[4px] h-[16px] sm:w-[72.23px] sm:h-[25.5px] ml-auto  mr-2`}
                >
                    All events
                </button>
                <div
                    className={`flex flex-col-reverse sm:flex sm:flex-row-reverse sm:items-center sm:justify-evenly sm:gap-8 sm:h-full sm:w-full`}
                >
                    <div
                        className={`h-[400px] pb-[140px] md:pb-[140px] md:w-[480px] sm:h-[1000px] ${styles.information}`}
                    >
                        <ul className={` flex flex-col items gap-2 `}>
                            {filteredEvents.map((event, index) => {
                                return (
                                    <EventCardLeft
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
                            <button className='sm:hidden'>Dates</button>

                            <div
                                className={`border border-black rounded-[8px] z-10 bg-white sm:bg-transparent`}
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
