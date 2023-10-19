import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";

const Language = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const { locale } = router;

    const changeLanguage = (selectedLocale) => {
        const currentPath = router.pathname;
        const newPath = `/${selectedLocale}${currentPath}`;
        router.push(newPath).then(() => {
            router.replace(router.asPath); // Reset the path state
        });
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                        <p className='text-black'>(EN)</p>
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
                                href='#'
                                onClick={() => changeLanguage("en")}
                                className={`block text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                                    locale === "en" ? "bg-gray-200" : ""
                                }`}
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/Palestine.png'
                                        width='20px'
                                        height='20px'
                                    />
                                    English (EN)
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                href='#'
                                onClick={() => changeLanguage("ar")}
                                className={`block text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                                    locale === "ar" ? "bg-gray-200" : ""
                                }`}
                            >
                                <div className='inline-flex items-center'>
                                    <img
                                        className='mr-1'
                                        src='/Palestine.png'
                                        width='20px'
                                        height='20px'
                                    />
                                    Arabic (AR)
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
