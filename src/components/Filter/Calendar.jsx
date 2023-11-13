import Image from "next/image";

import React, { useState, useEffect } from "react";

import styles from "@/styles/Events.module.css";
import Dropdown from "./Dropdown";

// Define the Calendar component
const Calendar = ({ checkEvents, resetDays }) => {
    // State for the current date and selected days
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState({});
    const [rangeStart, setRangeStart] = useState(null);
    const [selectedRange, setSelectedRange] = useState([]);

    // Function to handle date click
    const handleDateClick = (day) => {
        const selectedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day + 1
        );

        if (rangeStart === null) {
            setRangeStart(selectedDate);
        } else {
            let startDate = rangeStart;
            let endDate = selectedDate;

            if (startDate > endDate) {
                [startDate, endDate] = [endDate, startDate];
            }

            const range = [];
            let currentDate = startDate;

            while (currentDate <= endDate) {
                range.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            setSelectedRange(range);
            console.log(range);

            checkEvents(range.map((date) => date.toISOString().split("T")[0]));
            setRangeStart(null);
        }
    };

    // handle next month button click
    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonth = new Date(
                prevDate.getFullYear(),
                prevDate.getMonth() + 1
            );
            return nextMonth;
        });
    };

    // handle previous month button click
    const handlePreviousMonth = () => {
        setCurrentDate((prevDate) => {
            const previousMonth = new Date(
                prevDate.getFullYear(),
                prevDate.getMonth() - 1
            );
            return previousMonth;
        });
    };

    // get the name of the month
    const getMonthName = (date) => {
        const options = { month: "long" };
        return date.toLocaleDateString("en-US", options);
    };

    // render the calendar
    const renderCalendar = () => {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

        const calendarDays = [];
        const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

        // Render weekdays
        for (let i = 0; i < 7; i++) {
            calendarDays.push(
                <div
                    key={`weekday-${i}`}
                    className={`sm:text-[12px] font-[500] w-[25px] md:ml-1 sm:ml-2 xl:text-[17px]`}
                >
                    {weekdays[i]}
                </div>
            );
        }

        // Render empty days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(
                <div key={`empty-${i}`} className={`${styles.emptyDay}`}></div>
            );
        }

        // Render day numbers
        for (let day = 1; day <= daysInMonth; day++) {
            const thisDate = new Date(currentYear, currentMonth, day);
            const isSelected = selectedRange.some(
                (date) => date.toDateString() === thisDate.toDateString()
            );

            calendarDays.push(
                <button
                    key={`day-${day}`}
                    className={`${styles.calendarDay} ${
                        isSelected ? styles.selectedRange : ""
                    } xl:text-[17px] md:w-[10px] xl:w-[18px] text-center sm:text-[11px] rounded`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </button>
            );
        }

        return calendarDays;
    };

    //update selected days when resetDays changes
    useEffect(() => {
        if (resetDays) {
            setSelectedDays(resetDays);
            setRangeStart(null);
            setSelectedRange([]);
        }
    }, [resetDays]);

    // Render the Calendar component
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col-reverse items-center justify-center xl:w-[333px] xl:h-[243px] sm:w-[222px] sm:h-[180px]'>
                    <div className='flex justify-center items-center gap-2'>
                        <button
                            className='flex items-center'
                            onClick={handlePreviousMonth}
                        >
                            <Image
                                className='xl:w-[50px] xl:h-[50px] sm:w-[35px] md:h-[35px]'
                                src='/icons/previous.png'
                                width={50}
                                height={50}
                                alt='Previous'
                            />
                        </button>
                        <div className='flex flex-col items-center gap-3'>
                            <div className='calendar sm:h-[140px] xl:h-[200px] grid grid-cols-7 gap-1'>
                                {renderCalendar()}
                            </div>
                            <h2 className='text-xl xl:w-[200px] sm:w-[165px] flex justify-center gap-4 font-bold sm:text-[14px] xl:text-[18px]'>
                                <Dropdown
                                    options={Array.from(
                                        { length: 12 },
                                        (_, i) => i
                                    ).map((month) =>
                                        new Date(
                                            currentDate.getFullYear(),
                                            month
                                        ).toLocaleString("default", {
                                            month: "long",
                                        })
                                    )}
                                    selectedOption={getMonthName(currentDate)}
                                    setSelectedOption={(monthName) => {
                                        const month = new Date(
                                            Date.parse(monthName + " 1, 2012")
                                        ).getMonth();
                                        setCurrentDate(
                                            new Date(
                                                currentDate.getFullYear(),
                                                month
                                            )
                                        );
                                    }}
                                />
                                <Dropdown
                                    options={Array.from(
                                        { length: 6 },
                                        (_, i) =>
                                            i +
                                            Math.min(
                                                currentDate.getFullYear(),
                                                new Date().getFullYear()
                                            )
                                    )}
                                    selectedOption={currentDate
                                        .getFullYear()
                                        .toString()}
                                    setSelectedOption={(year) => {
                                        setCurrentDate(
                                            new Date(
                                                year,
                                                currentDate.getMonth()
                                            )
                                        );
                                    }}
                                />
                            </h2>
                        </div>
                        <button
                            className='flex items-center'
                            onClick={handleNextMonth}
                        >
                            <Image
                                className='xl:w-[50px] xl:h-[50px] sm:w-[35px] md:h-[35px]'
                                src='/icons/next.png'
                                width={50}
                                height={50}
                                alt='Next'
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
