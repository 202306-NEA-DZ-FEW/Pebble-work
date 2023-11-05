import React, { useState, useEffect, useRef } from "react";
import { db } from "@/util/firebase";
import { doc, getDoc } from "firebase/firestore";

function FirestoreLocation({ onInputChange, onInputDelete }) {
    const [location, setLocation] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isFormVisible, setFormVisible] = useState(false);
    const formRef = useRef(null);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            // Check if the event target is the paragraph element
            if (
                event.target.tagName === "P" &&
                event.target.textContent === "Locations"
            ) {
                return;
            }
            setFormVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const handleLocationChange = (e) => {
        setInputValue(e.target.value);

        // Clear the filtered list
        setFilteredLocations([]);

        const inputLocation = e.target.value.toLowerCase();
        if (inputLocation.length === 0) {
            onInputDelete();
        }
        // Get the 'data' field from Firestore document
        const fetchLocationData = async () => {
            try {
                const locationRef = doc(db, "database", "locations");
                const locationDoc = await getDoc(locationRef);

                if (locationDoc.exists()) {
                    const locationData = locationDoc.data().data || [];
                    const filtered = locationData.filter((location) =>
                        location.toLowerCase().includes(inputLocation)
                    );
                    setFilteredLocations(filtered);
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        if (inputLocation.length >= 2) {
            fetchLocationData();
        }
    };

    // Function to handle clicking a list item
    const handleLocationItemClick = (selectedLocation) => {
        setLocation(selectedLocation);
        setInputValue(selectedLocation);
        // Clear the filtered list when an item is selected
        onInputChange(selectedLocation);
        setFilteredLocations([]);
    };

    return (
        <>
            <p
                className='md:hidden relative'
                onClick={() => setFormVisible(!isFormVisible)}
            >
                Locations
            </p>
            {(isFormVisible ||
                (typeof window !== "undefined" && window.innerWidth > 640)) && (
                <form ref={formRef} className='max-w-1/2 sm:static absolute'>
                    <input
                        required
                        id='location'
                        value={inputValue}
                        onChange={handleLocationChange}
                        placeholder='Set Location'
                        className='p-1 mt-4 rounded-md focus:outline-2 xl:w-[15vw] outline outline-1 md:w-[20vw]'
                        style={{
                            borderRadius: "8px",
                            border: "1px solid var(--container-border, #1A1A1A)",
                            background: "var(--fill-white, #FFF)",
                            height: "55px",
                        }}
                    ></input>

                    {filteredLocations.length > 0 && (
                        <ul className='location-list p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
                            {filteredLocations.map((location, index) => (
                                <li
                                    key={index}
                                    value={location}
                                    className='h-[2rem] pt-2 cursor-pointer hover:bg-slate-50'
                                    onClick={() =>
                                        handleLocationItemClick(location)
                                    }
                                >
                                    {location}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            )}
            <style jsx>{`
                @media (min-width: 640px) {
                    p {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}

export default FirestoreLocation;
