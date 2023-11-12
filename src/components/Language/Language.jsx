import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";

const Language = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [rotationDegree, setRotationDegree] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [touchStartTime, setTouchStartTime] = useState(null);
    const handleStart = () => {
        setIsDragging(true);
        setTouchStartTime(Date.now());
    };

    // const handleStop = () => {
    //     setTimeout(() => {
    //         setIsDragging(false);
    //     }, 100);
    // };
    const handleStop = () => {
        setIsDragging(false);
    };
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
            setRotationDegree(0);
        }
    };
    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (event) => {
        if (isDragging || Date.now() - touchStartTime < 200) {
            return;
        }

        // Prevents the dropdown from closing if the event is a touch event
        if (event.type === "touchstart") {
            event.stopPropagation();
        }

        setIsDropdownOpen(!isDropdownOpen);
        setRotationDegree(isDropdownOpen ? 0 : 180);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsDropdownOpen(false);

        router.push(router.asPath, router.asPath, { locale: lng });
    };

    return (
        <Draggable onDrag={handleStart} onStop={handleStop}>
            <div
                ref={dropdownRef}
                className='fixed bottom-0 right-20 sm:right-40'
            >
                <button
                    type='button'
                    onClick={toggleDropdown}
                    onTouchStart={toggleDropdown}
                    className='inline-flex items-center font-medium justify-center text-sm text-gray-900 rounded-lg cursor-pointer'
                >
                    <div className='flex items-center z-[444]'>
                        <FontAwesomeIcon
                            icon={faEarthEurope}
                            size='2x'
                            style={{
                                color: "#63d4a9",
                                paddingRight: "2px",
                                transform: `rotate(${rotationDegree}deg)`,
                                transition: "transform 0.5s",
                            }}
                        />
                        <p className='text-black md:text-[15px] text-[12px]'>
                            {t("common:language:language")}
                        </p>
                    </div>
                </button>
                <div
                    className={`z-50 ${
                        isDropdownOpen ? "block" : "hidden"
                    } text-base list-none divide-y divide-gray-100 fixed bottom-10 right-0 rounded-[4px] shadow bg-transparent`}
                    id='language-dropdown-menu'
                >
                    <ul
                        ref={dropdownRef}
                        className='font-medium overflow-hidden flex flex-col gap-2 '
                    >
                        <li>
                            <button
                                onClick={() => changeLanguage("en")}
                                className='block text-sm text-gray-700 hover:border hover:rounded-sm w-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/United-Kingdom.svg'
                                        width='20px'
                                        height='20px'
                                    />
                                    {t("common:language:english")}
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => changeLanguage("tr")}
                                className='block text-sm text-gray-700 hover:border hover:rounded-sm w-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/Turkey.svg'
                                        width='20px'
                                        height='20px'
                                    />
                                    {t("common:language:turkish")}
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => changeLanguage("de")}
                                className='block text-sm text-gray-700 hover:border hover:rounded-sm w-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/Germany.svg'
                                        width='20px'
                                        height='20px'
                                    />
                                    {t("common:language:german")}
                                </div>
                            </button>
                        </li>
                        {/* Add Chinese language here */}
                        <li>
                            <button
                                onClick={() => changeLanguage("zh")}
                                className='block text-sm text-gray-700 hover:border hover:rounded-sm w-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/China.svg'
                                        width='20px'
                                        height='20px'
                                    />
                                    {t("common:language:chinese")}
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </Draggable>
    );
};

export default Language;
