import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";

import styles from "@/styles/Events.module.css";

const FilterByType = ({
    selectedTypes,
    setSelectedTypes,
    setFilteredTypes,
    resetEvents,
}) => {
    const dropdownRef = useRef(null);
    const [isInterestOpen, setInterestOpen] = useState(false);
    const { t } = useTranslation();

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
        t("common:eventTypes:cleanEnergy"),
        t("common:eventTypes:cleanWater"),
        t("common:eventTypes:climateAction"),
        t("common:eventTypes:decentWork"),
        t("common:eventTypes:genderEquality"),
        t("common:eventTypes:goodHealth"),
        t("common:eventTypes:innovationInfrastructure"),
        t("common:eventTypes:lifeBelowWater"),
        t("common:eventTypes:lifeOnLand"),
        t("eventTypes.noPoverty"),
        t("common:eventTypes:peaceJustice"),
        t("common:eventTypes:qualityEducation"),
        t("common:eventTypes:reducedInequalities"),
        t("common:eventTypes:responsibleConsumption"),
        t("common:eventTypes:sustainableCities"),
        t("common:eventTypes:zeroHunger"),
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
                <button
                    className='sm:hidden bg-[#749D60] rounded-lg px-3 py-2 text-white  font-[500] transition duration-300 ease-in-out hover:bg-opacity-70 w-30 h-15'
                    onClick={handleInterestClick}
                >
                    {t("common:eventTypes:interests")}
                </button>

                {isInterestOpen && (
                    <ul
                        className={`${styles.information} ${
                            isInterestOpen ? `${styles.fadeIn}` : ""
                        } flex p-5 sm:static sm:bg-transparent sm:h-[700px] fixed bottom-0 left-0 h-64 w-full sm:pt-8 pt-[330px] bg-[#2E7EAA] text-white z-[999] flex-col items-start gap-4 sm:items-center overflow-y-scroll`}
                    >
                        <button
                            onClick={resetEvents}
                            className={`sm:bg-[#749D60] sm:block hidden hover:bg-[#B4CD93] sm:text-center flex lg:items-center sm:gap-0 gap-2 sm:justify-center lg:w-[281px] lg:h-[52px] sm:w-[149px] items-center sm:min-h-[50px] text-white font-[500] lg:text-[18px] lg:tracking-[0.10px] sm:text-[12px] sm:px-4 sm:py-2 rounded-lg`}
                        >
                            {t("common:eventTypes:resetFilter")}
                        </button>
                        {types.map((type) => (
                            <button
                                key={type}
                                className={`sm:bg-[#749D60] hover:bg-[#B4CD93] sm:text-center flex lg:items-center sm:gap-0 gap-2 sm:justify-center lg:w-[281px] lg:h-[52px] sm:w-[149px] items-center sm:min-h-[50px] text-white font-[500] lg:text-[18px] lg:tracking-[0.10px] sm:text-[12px] sm:px-4 sm:py-2 rounded-lg ${
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
