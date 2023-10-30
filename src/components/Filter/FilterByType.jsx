import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Events.module.css";

const FilterByType = ({ setFilteredTypes }) => {
    const dropdownRef = useRef(null);
    const [isInterestOpen, setInterestOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);

    // Handle click outside the dropdown to close it
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setInterestOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for click outside the dropdown
        if (typeof window !== "undefined") {
            window.addEventListener("click", handleClickOutside);
        }
        return () => {
            // Remove event listener on component unmount
            if (typeof window !== "undefined") {
                window.removeEventListener("click", handleClickOutside);
            }
        };
    }, []);

    useEffect(() => {
        // Handle resize event to update dropdown visibility
        const handleResize = () => {
            setInterestOpen(window.innerWidth > 640);
        };

        // Set initial dropdown visibility based on window width
        if (typeof window !== "undefined") {
            setInterestOpen(window.innerWidth > 640);
        }

        // Add event listener for resize
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
        }

        return () => {
            // Remove event listener on component unmount
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    // Handle click on the interest button to toggle dropdown visibility
    const handleInterestClick = () => {
        setInterestOpen(!isInterestOpen);
    };

    // Handle click on a type button to select/deselect it
    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    useEffect(() => {
        // Update filtered types when selected types change
        setFilteredTypes(selectedTypes);
    }, [selectedTypes]);

    const types = [
        "Affordable and Clean Energy",
        "Clean Water and Sanitation",
        "Climate Action",
        "Decent Work and Economic Growth",
        "Gender Equality",
        "Good Health and Well Being",
        "Industry, Innovation and Infrastructure",
        "Life Below Water",
        "Life on Land",
        "No Poverty",
        "Peace, Justice and Strong Institutions",
        "Quality Education",
        "Reduced Inequalities",
        "Responsible Consumption/Production",
        "Sustainable Cities and Communities",
        "Zero Hunger",
    ];

    return (
        <>
            <div
                ref={
                    typeof window !== "undefined" && window.innerWidth <= 640
                        ? dropdownRef
                        : null
                }
            >
                <button className='sm:hidden' onClick={handleInterestClick}>
                    Change Interest
                </button>
                {isInterestOpen && (
                    <ul
                        className={`${styles.information} ${
                            isInterestOpen ? `${styles.fadeIn}` : ""
                        } flex sm:static sm:bg-transparent sm:h-[700px]  fixed bottom-0 left-0 h-64 w-full pt-8  bg-gray-900 text-white z-[999] flex-col items-start sm:pl-0 pl-4  gap-4 sm:border-x-0 sm:border-b-0 sm:pt-4 sm:items-center sm:border sm:border-t-black overflow-y-scroll`}
                    >
                        {types.map((type) => (
                            <button
                                key={type}
                                className={`sm:bg-blue-500 sm:text-center flex lg:items-center sm:gap-0 gap-2 sm:justify-center lg:w-[281px] lg:h-[52px] sm:w-[149px] sm:h-[30px] text-white font-[500] lg:text-[18px] lg:tracking-[0.10px] sm:text-[12px] sm:px-4 sm:py-2 rounded-lg ${
                                    selectedTypes.includes(type)
                                        ? styles.selectedType
                                        : ""
                                }`}
                                onClick={() => handleTypeClick(type)}
                            >
                                {selectedTypes.includes(type) ? (
                                    <span className='visible sm:hidden mr-2'>
                                        &#10003;
                                    </span>
                                ) : (
                                    <span className='visible sm:hidden mr-2'>
                                        &#9634;
                                    </span>
                                )}
                                {type}
                            </button>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default FilterByType;
