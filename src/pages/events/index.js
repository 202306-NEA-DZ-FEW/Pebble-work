import React, { useState, useEffect, useRef } from "react";

import Calendar from "@/components/Events/Calendar";
import EventCard from "@/components/Events/EventCard";
import EventCardLeft from "@/components/Events/EventCardLeft";
import styles from "@/styles/Events.module.css";
import FilterByType from "@/components/Filter/FilterByType";
import { db } from "@/util/firebase";
import { collection, getDocs } from "firebase/firestore";

const EventsPage = (user) => {
    // State variables
    const [inputValue, setInputValue] = useState("");
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isLocationOpen, setLocationOpen] = useState(false);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const dropdownRef = useRef(null);

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
            const eventsCollectionRef = collection(db, "events"); // Assuming the collection name is "events"
            const eventsSnapshot = await getDocs(eventsCollectionRef);
            const eventsData = eventsSnapshot.docs.map((doc) => doc.data());

            setEvents(eventsData);
        };

        fetchEvents();
    }, []);
    return (
        <>
            <main
                className={` flex flex-col justify-center items-center pb-12`}
            >
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>This is the events page</p>
                </div>
                <div
                    className={`flex flex-col-reverse sm:flex sm:flex-row-reverse sm:items-center sm:justify-evenly sm:gap-8 sm:h-full sm:w-full`}
                >
                    <div
                        className={`md:h-[800px] h-[400px] xl:w-[840px] pb-[140px] md:pb-[140px] md:w-[480px] lg:w-[490px] ${styles.information}`}
                    >
                        <ul className={` flex flex-col items gap-2 `}>
                            {events
                                .filter((event) =>
                                    filteredTypes.length === 0
                                        ? true
                                        : filteredTypes.includes(event.type)
                                )
                                .map((event, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <EventCard
                                                key={event.id}
                                                title={event.title}
                                                type={event.type}
                                                images={event.image}
                                                location={event.location}
                                                description={event.description}
                                                organizer={event.organizer}
                                                time={event.time}
                                                date={event.date}
                                            />
                                        );
                                    } else {
                                        return (
                                            <EventCardLeft
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
                                    }
                                })}
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
                                    <Calendar />
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col items-center gap-4 border border-x-0 border-b-0 border-t-black'>
                            <p
                                style={{
                                    color: "black",
                                    fontWeight: "400",
                                    textDecoration: "underline",
                                    lineHeight: "30px",
                                    letterSpacing: "0.10px",
                                    wordWrap: "break-word",
                                }}
                                className='sm:pt-10 sm:bg-transparent cursor-pointer sm:text-[20px] text-[16px]'
                                onClick={handleLocationClick}
                            >
                                Change Location
                            </p>
                            {isLocationOpen && (
                                <input
                                    className={`${styles.locationChange} border rounded-[5px] text-center`}
                                    type='text'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    style={{
                                        backgroundColor: inputValue
                                            ? "#FBC495"
                                            : "white",
                                        border: `2px solid `,
                                    }}
                                />
                            )}
                        </div>

                        <FilterByType
                            ref={dropdownRef}
                            setFilteredTypes={setFilteredTypes}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventsPage;
