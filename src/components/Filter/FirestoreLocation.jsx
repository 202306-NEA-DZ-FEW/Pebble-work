import React, { useState } from "react";
import { db } from "@/util/firebase";
import { doc, getDoc } from "firebase/firestore";

function FirestoreLocation({ onLocationSelect, onInputChange }) {
    const [location, setLocation] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleLocationChange = (e) => {
        setInputValue(e.target.value);
        onInputChange(e.target.value);

        // Clear the filtered list
        setFilteredLocations([]);

        const inputLocation = e.target.value.toLowerCase();

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
        setFilteredLocations([]);

        // onLocationSelect(selectedLocation);
    };

    return (
        <form className='max-w-1/2'>
            <input
                required
                id='location'
                value={inputValue}
                onChange={handleLocationChange}
                placeholder='Set Location'
                className='p-1 mt-4 rounded-md focus:outline-2 outline outline-1 w-2/4'
                style={{
                    borderRadius: "8px",
                    border: "1px solid var(--container-border, #1A1A1A)",
                    background: "var(--fill-white, #FFF)",
                    width: "300px",
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
                            onClick={() => handleLocationItemClick(location)}
                        >
                            {location}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}

export default FirestoreLocation;
