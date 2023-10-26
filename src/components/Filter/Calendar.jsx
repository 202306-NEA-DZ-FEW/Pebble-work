import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import styles from "@/styles/Calender.module.css";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonth = new Date(
                prevDate.getFullYear(),
                prevDate.getMonth() + 1
            );
            return nextMonth;
        });
    };

    const handlePreviousMonth = () => {
        setCurrentDate((prevDate) => {
            const previousMonth = new Date(
                prevDate.getFullYear(),
                prevDate.getMonth() - 1
            );
            return previousMonth;
        });
    };

    const getMonthName = (date) => {
        const options = { month: "long" };
        return date.toLocaleDateString("en-US", options);
    };

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
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Render weekdays
        for (let i = 0; i < 7; i++) {
            calendarDays.push(
                <div
                    key={`weekday-${i}`}
                    className={`${styles.weekday} md:text-[12px] xl:text-[17px]`}
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
            calendarDays.push(
                <Link
                    href='#'
                    key={`day-${day}`}
                    className={`${styles.calendarDay} xl:text-[17px] md:w-[10px] xl:w-[18px] text-center md:text-[11px] rounded`}
                >
                    {day}
                </Link>
            );
        }

        return calendarDays;
    };

    return (
        <>
            <div className='flex flex-col-reverse items-center justify-center xl:w-[333px] xl:h-[243px] md:w-[222px] md:h-[180px]'>
                <div className='flex justify-center items-center gap-2'>
                    <button
                        className='flex items-center'
                        onClick={handlePreviousMonth}
                    >
                        <Image
                            className='xl:w-[50px] xl:h-[50px] md:w-[35px] md:h-[35px]'
                            src='/icons/previous.png'
                            width={50}
                            height={50}
                            alt='Previous'
                        />
                    </button>
                    <div className='flex flex-col items-center gap-3'>
                        <div className='calendar grid grid-cols-7 gap-1'>
                            {renderCalendar()}
                        </div>
                        <h2 className='text-xl font-bold md:text-[14px] xl:text-[18px] '>
                            {getMonthName(currentDate)}{" "}
                            {currentDate.getFullYear()}
                        </h2>
                    </div>

                    <button
                        className='flex items-center'
                        onClick={handleNextMonth}
                    >
                        <Image
                            className='xl:w-[50px] xl:h-[50px] md:w-[35px] md:h-[35px]'
                            src='/icons/next.png'
                            width={50}
                            height={50}
                            alt='Next'
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Calendar;
