import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MobileCard from "@/components/Events/MobileCard";
import Calendar from "@/components/Filter/Calendar";
import FilterByType from "@/components/Filter/FilterByType";
import FirestoreLocation from "@/components/Filter/FirestoreLocation";
import { usePagination } from "@/components/Pagination/Pagination";

const EventsPage = () => {
    const { t } = useTranslation();

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
        usePagination(1, 6, filteredEvents);

    const handleLocationInputChange = (value) => {
        setInputValue1(value);
    };

    // Fetch events from Firebase
    useEffect(() => {
        const fetchEvents = async () => {
            const types = selectedTypes ? selectedTypes.join(",") : "";
            const dates = selectedDate ? selectedDate.join(",") : "";
            const response = await fetch(
                `/api/events?type=${types}&location=${inputValue1}&date=${dates}`,
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
                    filteredTypes.includes(event.type),
                );
            }

            // Apply location filter
            if (inputValue1) {
                filteredEvents = filteredEvents.filter(
                    (event) => event.location === inputValue1,
                );
            }

            // Apply date filter
            if (selectedDate && selectedDate.length > 0) {
                filteredEvents = filteredEvents?.filter((event) =>
                    selectedDate.includes(event.date),
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
            dates.map((date) => new Date(date).toISOString().split("T")[0]),
        );
    };
    return (
        <>
            <main
                style={{
                    color: "#749D60",
                }}
                className={`flex flex-col justify-center items-center pb-12`}
            >
                <div className='h-[40px]'></div>
                <div
                    className={`flex flex-col-reverse sm:flex sm:flex-row-reverse sm:items-center sm:justify-evenly sm:gap-8 `}
                >
                    <div className={`md:w-[480px] sm:h-[1000px] pt-4`}>
                        <ul className={` flex flex-col items gap-2 `}>
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
                                        {t("events:noEventsFound")}
                                    </p>
                                )}

                            {selectedDate && CalendarEvents.length === 0 && (
                                <p className='text-red-500 text-center'>
                                    {t("events:noEventsFoundForDate")}
                                </p>
                            )}
                            <div className='flex justify-center gap-8 text-black'>
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1,
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
                    <div className='flex z-10 sm:h-[1000px] flex-row items-center justify-between sm:flex sm:flex-col sm:items-center text-black sm:gap-7'>
                        <div className='sm:flex s:flex-col sm:items-center sm:justify-center'>
                            <div
                                className={`shadow-md rounded-[8px] z-10 bg-[#B4CD93]`}
                            >
                                <Calendar
                                    resetDays={resetDays}
                                    checkEvents={handleDateChange}
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
                        <div className=' shadow-md'>
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

export default EventsPage;
