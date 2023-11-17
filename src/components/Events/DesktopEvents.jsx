import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Calendar from "@/components/Filter/Calendar";
import FilterByType from "@/components/Filter/FilterByType";

import DesktopCard from "@/components/Events/DesktopCard";
import FirestoreLocation from "../Filter/FirestoreLocation";
import { usePagination } from "@/components/Pagination/Pagination";

const DesktopEvents = (user) => {
    const { t } = useTranslation();
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
    const { currentPage, totalPages, currentItems, setCurrentPage } =
        usePagination(1, 5, filteredEvents);

    const handleLocationInputChange = (value) => {
        setInputValue1(value);
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

    // get the date from calendar
    const handleDateChange = (dates) => {
        setSelectedDate(
            dates.map((date) => new Date(date).toISOString().split("T")[0])
        );
    };

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
                style={{
                    color: "#749D60",
                    textShadow: "0px 1px 2px rgba(10, 10, 10, 0.8)",
                }}
                className={` flex flex-col justify-center items-center`}
            >
                <div>
                    <h1>{t("events:welcome", { name: user.name })}</h1>
                    <p>{t("events:eventsPage")}</p>
                </div>

                <div
                    className={`flex flex-row-reverse items-center justify-evenly w-full`}
                >
                    <div className={`w-[55vw] h-[1150px]`}>
                        <ul className={`flex flex-col items gap-2`}>
                            {currentItems.map((event) => {
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
                            })}

                            {(inputValue1 || filteredTypes.length > 0) &&
                                filteredEvents?.length === 0 && (
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
                    <div className='flex h-[1150px] flex-col ml-[-50px] items-center text-black gap-7'>
                        <div className='sm:flex s:flex-col sm:items-center sm:justify-center'>
                            <div
                                className={`shadow-md rounded-[8px] bg-[#B4CD93]`}
                            >
                                <Calendar
                                    resetDays={resetDays}
                                    checkEvents={handleDateChange}
                                />
                            </div>
                        </div>
                        <div className='h-66 shadow-md'>
                            <FirestoreLocation
                                onInputChange={handleLocationInputChange}
                                resetLocation={resetLocation}
                                setResetLocation={setResetLocation}
                                setInputValue1={setInputValue1}
                                inputValue1={inputValue1}
                            />
                        </div>

                        <div className='shadow-md'>
                            <FilterByType
                                resetEvents={resetEvents}
                                setFilteredTypes={setFilteredTypes}
                                selectedTypes={selectedTypes}
                                setSelectedTypes={setSelectedTypes}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DesktopEvents;
