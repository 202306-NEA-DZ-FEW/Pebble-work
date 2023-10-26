import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Events.module.css";
import { debounce } from "lodash";

const LocationFilter = ({
    HandleClick,
    HandleOpen,
    refLocation,
    onInputChange,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    const InputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onInputChange(value);
    };

    const fetchPlaces = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json`
            );
            const data = await response.json();
            setPlaces(data);
        } catch (error) {
            setError("Error fetching places");
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchPlaces = debounce(fetchPlaces, 700);

    useEffect(() => {
        if (inputValue) {
            debouncedFetchPlaces();
        } else {
            setPlaces([]);
        }
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                listRef.current &&
                !listRef.current.contains(event.target) &&
                inputRef.current !== event.target
            ) {
                setPlaces([]);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                ref={refLocation}
                className='flex flex-col items-center justify-center gap-4 border border-x-0 border-b-0 border-t-black'
            >
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
                    onClick={HandleClick}
                >
                    Change Location
                </p>
                {HandleOpen && (
                    <input
                        ref={inputRef}
                        className={`${styles.locationChange} border rounded-[5px] text-center`}
                        type='text'
                        value={inputValue}
                        onChange={InputChange}
                        onClick={() => setPlaces([])} // Close the dropdown when input is clicked
                        style={{
                            backgroundColor: inputValue ? "#FBC495" : "white",
                            border: `2px solid `,
                        }}
                    />
                )}
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {inputValue && places.length > 0 && (
                    <ul
                        ref={listRef}
                        className='bg-white w-[150px] overflow-x-hidden h-[150px] overflow-y-scroll flex flex-col items-center justify-center'
                    >
                        {places.map((place) => (
                            <li
                                key={place.place_id}
                                onClick={() =>
                                    setInputValue(place.display_name)
                                }
                            >
                                {place.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default LocationFilter;
