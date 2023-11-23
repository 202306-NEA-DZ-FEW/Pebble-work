import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxEyeClosed } from "react-icons/rx";

import styles from "@/styles/Events.module.css";

import SmallCard from "@/components/Events/SmallCard";
import Calendar from "@/components/Filter/Calendar";
import FilterByType from "@/components/Filter/FilterByType";
import FirestoreLocation from "@/components/Filter/FirestoreLocation";
import { usePagination } from "@/components/Pagination/Pagination";

const SmallScreenEvents = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [inputValue1, setInputValue1] = useState("");
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const { t } = useTranslation();

    const [filteredTypes, setFilteredTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [CalendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [resetLocation, setResetLocation] = useState(false);
    const [resetDays, setResetDays] = useState(false);

    const { currentPage, totalPages, currentItems, setCurrentPage } =
        usePagination(1, 5, filteredEvents);

    const handleLocationInputChange = (value) => {
        setInputValue1(value);
    };

    // Handle test click
    const handleCalendarClick = () => {
        setCalendarOpen(!isCalendarOpen);
    };

    // Fetch events from Firebase
    useEffect(() => {
        const fetchEvents = async () => {
            const types = selectedTypes ? selectedTypes.join(",") : "";
            const dates = selectedDate ? selectedDate.join(",") : "";
            const response = await fetch(
                `/api/events?type=${types}&location=${inputValue1}&date=${dates}`
            );
            const eventsData = await response.json();

            setEvents(eventsData);
            setCalendarEvents(eventsData);
        };

        fetchEvents();
    }, [selectedTypes, inputValue1, selectedDate]);

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
            if (selectedDate && selectedDate.length > 0) {
                filteredEvents = filteredEvents?.filter((event) =>
                    selectedDate.includes(event.date)
                );
            }

            setFilteredEvents(filteredEvents);
        };

        applyFilters();
    }, [events, selectedDate, inputValue1, filteredTypes]); // Depend on all filters

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
    const handleDateChange = (dates) => {
        setSelectedDate(
            dates.map((date) => new Date(date).toISOString().split("T")[0])
        );
    };
    return (
        <>
            <main
                className={` flex flex-col justify-center items-center overflow-scroll`}
            >
                <div className='h-[40px]'></div>
                <button
                    onClick={resetEvents}
                    className={` w-[52px] bg-[#2E7EAA] text-white text-[10px] rounded-[4px] h-[16px] ml-auto mr-2`}
                >
                    All events
                </button>
                <div className={`flex flex-col-reverse`}>
                    <div className={`h-[750px]`}>
                        <ul
                            className={` flex flex-row pb-5 justify-center flex-wrap items gap-4`}
                        >
                            {currentItems.map((event) => {
                                return (
                                    <SmallCard
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
                                        {t("events:noEventsFound")}
                                    </p>
                                )}

                            {selectedDate && CalendarEvents.length === 0 && (
                                <p className='text-red-500 text-center'>
                                    {t("events:noEventsFoundForDate")}
                                </p>
                            )}
                        </ul>
                        <div className='flex justify-center pb-2 gap-8 text-black'>
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
                    <div className='flex z-10 flex-row items-center justify-evenly text-black'>
                        <div>
                            <button
                                className='sm:hidden bg-[#749D60] rounded-lg px-7 py-2 text-white transition duration-300 ease-in-out hover:bg-opacity-70 font-[500]  h-15'
                                onClick={handleCalendarClick}
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
                                    className={`text-center ${
                                        isCalendarOpen ? "open" : ""
                                    } ${
                                        styles.calendarContainer
                                    } shadow-inner rounded-[4px] z-10 bg-white`}
                                >
                                    <button
                                        className='mb-3 rounded-[8px]'
                                        onClick={() => setCalendarOpen(false)}
                                    >
                                        <RxEyeClosed size={20} />
                                    </button>
                                    <Calendar
                                        resetDays={resetDays}
                                        checkEvents={handleDateChange}
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
