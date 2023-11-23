import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import styles from "@/styles/Events.module.css";

import { db } from "@/util/firebase";

function FirestoreLocation({ onInputChange }) {
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationsArray, setLocationsArray] = useState([]);

    const handleLocationClick = (selectedLocation) => {
        onInputChange(selectedLocation);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };
    useEffect(() => {
        const filtered = locationsArray.filter((location) =>
            location.toLowerCase().includes(searchTerm)
        );
        setFilteredLocations(filtered);
    }, [searchTerm, locationsArray]);
    const fetchLocationData = async () => {
        try {
            const locationsDocRef = doc(db, "database", "locations");
            const locationsDoc = await getDoc(locationsDocRef);
            if (locationsDoc.exists()) {
                const locationData = locationsDoc.data();
                const locationsArray = [].concat(
                    ...Object.values(locationData)
                );
                setFilteredLocations(locationsArray);
                setLocationsArray(locationsArray);
            }
        } catch (error) {
            console.log("Error fetching locations:", error);
        }
    };

    useEffect(() => {
        fetchLocationData();
    }, []);

    return (
        <>
            <button
                className=' bg-[#2E7EAA] px-3 py-2   sm:text-center  lg:items-center sm:gap-0 gap-2 sm:justify-center lg:w-[281px] lg:h-[52px] sm:w-[149px] sm:h-[30px] text-white font-[500] lg:text-[18px] lg:tracking-[0.10px] sm:text-[12px] sm:px-4 sm:py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700  w-30 h-15  '
                onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                }
            >
                Location
            </button>
            <dialog id='my_modal_1' className='modal rounded-tr rounded-br'>
                <div className='modal-box'>
                    <div className='flex justify-center'>
                        <input
                            type='text'
                            placeholder='Search city...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className='mt-2 p-2 border rounded'
                        />
                    </div>
                    <h3 className='font-bold text-lg mb-0'>cities </h3>
                    <div className=' mt-2  '>
                        <ul
                            className={`list-none ${styles.information} h-[200px]`}
                        >
                            {Object.entries(filteredLocations).map(
                                ([key, value], index) => (
                                    <li
                                        key={index}
                                        className='my-2 block hover:bg-gray-400 cursor-pointer'
                                        onClick={() => {
                                            handleLocationClick(value);

                                            document
                                                .getElementById("my_modal_1")
                                                .close();
                                        }}
                                    >
                                        {value}
                                    </li>
                                )
                            )}
                        </ul>

                        <div className='modal-action absolute top-7 right-3 mt-0'>
                            <form method='dialog'>
                                <button
                                    className=''
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_1")
                                            .close()
                                    }
                                >
                                    <AiOutlineClose size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default FirestoreLocation;
