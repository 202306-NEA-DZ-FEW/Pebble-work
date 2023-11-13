import React, { useState, useEffect, useRef } from "react";
import { db } from "@/util/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
function FirestoreLocation({ onInputChange, inputValue1, setInputValue1 }) {
    const [filteredLocations, setFilteredLocations] = useState([]);
    // const [isFormVisible, setFormVisible] = useState(false);
    // const buttonRef = useRef(null);
    // const formRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (!buttonRef.current.contains(event.target) && formRef.current && !formRef.current.contains(event.target)) {
    //         setFormVisible(false);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener("click", handleClickOutside);

    //     return () => {
    //         window.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    // const handleButtonClick = () => {
    //     setFormVisible(!isFormVisible);
    // };

    // const handleLocationItemClick = (selectedLocation) => {
    //     setInputValue1(selectedLocation);
    //     onInputChange(selectedLocation);
    //     setFormVisible(false);
    // };

    // const handleLocationChange = (e) => {
    //     setInputValue1(e.target.value);

    //     // Clear the filtered list
    //     setFilteredLocations([]);

    //     // const inputLocation = e.target.value.toLowerCase();
    // }
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
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useEffect(() => {
        fetchLocationData();
    }, []);

    return (
        <>
            <button
                className='btn'
                onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                }
            >
                Location
            </button>
            <dialog id='my_modal_1' className='modal rounded-tr rounded-br'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg mb-0'>Citys </h3>

                    <div className=' mt-2  '>
                        <ul className='list-none '>
                            {Object.entries(filteredLocations).map(
                                ([key, value], index) => (
                                    <li key={index} className='my-2 block  '>
                                        {value}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className='modal-action'>
                        <form method='dialog'>
                            <button
                                className='btn'
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_1")
                                        .close()
                                }
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default FirestoreLocation;
