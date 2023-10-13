import React, { useState } from "react";

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
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(
                <div key={`empty-${i}`} className='empty-day'></div>
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(
                <div key={`day-${day}`} className='calendar-day'>
                    {day}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className='calendar-container'>
            <div className='calendar-header flex justify-between items-center mb-4'>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handlePreviousMonth}
                >
                    Previous Month
                </button>
                <h2 className='text-xl font-bold'>
                    {getMonthName(currentDate)} {currentDate.getFullYear()}
                </h2>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleNextMonth}
                >
                    Next Month
                </button>
            </div>
            <div className='calendar grid grid-cols-7 gap-4'>
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Calendar;
