import React, { useState, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Language = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsDropdownOpen(false);

        router.push(router.asPath, router.asPath, { locale: lng });
    };

    return (
        <>
            <div
                ref={dropdownRef}
                className='fixed bottom-0 right-20 sm:right-40'
            >
                <button
                    type='button'
                    onClick={toggleDropdown}
                    className='inline-flex items-center font-medium justify-center text-sm text-gray-900 rounded-lg cursor-pointer'
                >
                    <div className='flex items-center z-[444]'>
                        <img src='/icons/Web.png' alt='Pebble Logo' />
                        <p className='text-black'>
                            {t("common:language:language")}
                        </p>
                    </div>
                </button>
                <div
                    className={`z-50 ${
                        isDropdownOpen ? "block" : "hidden"
                    } text-base list-none divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
                    id='language-dropdown-menu'
                >
                    <ul
                        ref={dropdownRef}
                        className='font-medium overflow-hidden flex flex-col gap-2 fixed bottom-10 right-20 sm:right-40'
                    >
                        <li>
                            <button
                                onClick={() => changeLanguage("en")}
                                className='block text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/United-Kingdom.png'
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
                                className='block text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/Turkey.png'
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
                                className='block text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/Germany.png'
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
                                className='block text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/China.png'
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
        </>
    );
};

export default Language;
