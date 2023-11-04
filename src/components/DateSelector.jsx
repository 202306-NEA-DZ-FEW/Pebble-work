import { useState, useEffect } from "react";

const DateSelector = ({ setCurrentDate, checkEvents, resetDays }) => {
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(0); // January is 0 in JavaScript's Date
    const [year, setYear] = useState(2023);
    const [formattedDate, setFormattedDate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const newDate = new Date(
            parseInt(year),
            parseInt(month),
            parseInt(day),
            12
        );
        setCurrentDate(newDate);
        const newFormattedDate = newDate.toISOString().split("T")[0];
        setFormattedDate(newFormattedDate);
    };

    useEffect(() => {
        if (formattedDate) {
            checkEvents(formattedDate);
        }
    }, [formattedDate]);

    useEffect(() => {
        if (resetDays) {
            const currentDate = new Date();
            setDay(currentDate.getDate());
            setMonth(currentDate.getMonth());
            setYear(currentDate.getFullYear());
            setCurrentDate(currentDate);
            const formattedDate = currentDate.toISOString().split("T")[0];
            setFormattedDate(formattedDate);
        }
    }, [resetDays]);

    return (
        <form onSubmit={handleSubmit}>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
                {/* Generate options for days */}
                {[...Array(31)].map((_, i) => (
                    <option key={i} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>

            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {/* Generate options for months */}
                {[...Array(12)].map((_, i) => (
                    <option key={i} value={i}>
                        {new Date(2023, i).toLocaleString("default", {
                            month: "long",
                        })}
                    </option>
                ))}
            </select>

            <select value={year} onChange={(e) => setYear(e.target.value)}>
                {/* Generate options for years */}
                {[...Array(11)].map((_, i) => (
                    <option key={i} value={2023 + i}>
                        {2023 + i}
                    </option>
                ))}
            </select>

            <button type='submit'>Go</button>
        </form>
    );
};

export default DateSelector;
