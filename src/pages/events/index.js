import React, { useState, useEffect } from "react";

import Calendar from "@/components/Events/Calendar";
import EventCard from "@/components/Events/EventCard";
import EventCardLeft from "@/components/Events/EventCardLeft";
import styles from "@/styles/Events.module.css";

const EventsPage = (user) => {
    const [inputValue, setInputValue] = useState("");
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isInterestOpen, setInterestOpen] = useState(false);
    const [isLocationOpen, setLocationOpen] = useState(false);

    const handleLocationClick = () => {
        setLocationOpen(!isLocationOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInterestClick = () => {
        setInterestOpen(!isInterestOpen);
    };

    const handleTestClick = () => {
        setCalendarOpen(!isCalendarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setCalendarOpen(true);
                setInterestOpen(true);
                setLocationOpen(true);
            } else {
                setCalendarOpen(false);
                setInterestOpen(false);
                setLocationOpen(false);
            }
        };

        // Set initial state based on window size
        if (window.innerWidth > 640) {
            setCalendarOpen(true);
            setInterestOpen(true);
            setLocationOpen(true);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <>
            <main className='flex flex-col justify-center sm:pb-[200px] mt-32 pb-[200px] items-center xl:mt-32 xl:pb-[200px]'>
                <div>
                    <h1>Walecome, {user.name}!</h1>
                    <p>This is the events page</p>
                </div>
                <div className='flex flex-col-reverse sm:flex sm:flex-row-reverse sm:items-center sm:justify-evenly sm:gap-8 sm:h-full sm:w-full'>
                    <ul className='flex flex-col items gap-2'>
                        <EventCard />
                        <EventCardLeft />
                        <EventCard />
                        <EventCardLeft />
                        <EventCard />
                        <EventCardLeft />
                        <EventCard />
                        <EventCardLeft />
                    </ul>
                    <div className='flex flex-row items-center justify-between sm:flex sm:flex-col sm:items-center text-black sm:gap-7'>
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
                                    } border border-black rounded-[8px] bg-white sm:bg-transparent`}
                                >
                                    <Calendar />
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col items-center gap-4 border border-x-0 border-b-0 border-t-black'>
                            <p
                                style={{
                                    color: "black",
                                    fontFamily: "Rubik",
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
                        <button
                            className='sm:hidden'
                            onClick={handleInterestClick}
                        >
                            Change Interest
                        </button>
                        {isInterestOpen && (
                            <ul
                                style={{
                                    animation: `${
                                        isInterestOpen
                                            ? `${styles.fadeIn} 0.7s ease-in-out`
                                            : ""
                                    }`,
                                }}
                                className={`${styles.information} flex sm:static sm:bg-transparent sm:z-0 sm:h-[700px]  fixed bottom-0 left-0 h-64 w-full bg-gray-900 text-white z-[999] flex-col gap-4 sm:border-x-0 sm:border-b-0 sm:pt-4 items-center sm:border sm:border-t-black overflow-y-scroll`}
                            >
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    All
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    No Poverty
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Zero Hunger
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Good Heakth and Well Being
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Quality Education
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Gender Equality
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Clean Water and Sanitation
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Affordable and Clean Energy
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Decent Work and Economic Growth
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Industry, Innovation and Infrastructure
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Reduced Inequalities
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Sustainable Cities and Communities
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Responsible Consumption/Production
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Life Bellow Water
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Life on Land
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Peace, Justice and Strong institutions
                                </button>
                                <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                    Climate Action
                                </button>
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventsPage;
