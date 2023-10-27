import Link from "next/link";
import React, { useEffect, useState } from "react";

import styles from "@/styles/Navbar.module.css";

import Signin from "@/components/Signin/Signin";

import { auth } from "@/util/firebase";

import Dropdown from "../Dropdown";
import Language from "../Language/Language";
import Pebble from "../Pebble";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    const menuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeMenuDropdown = () => {
        setMenuDropdownOpen(false);
    };

    useEffect(() => {
        const logged = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => {
            logged();
        };
    }, []);

    return (
        <nav className='sticky z-[9999] md:mb-10 mb-4 bg-gray-200 top-0 xl:flex xl:flex-col xl:items-center'>
            <div
                style={{
                    width: "100%",
                    height: "8%",
                    zIndex: "9999",
                }}
                className='flex flex-wrap items-center justify-between p-4 xl:gap-40'
            >
                <Link href='./' className='flex items-center'>
                    <img
                        src='/logo/Logo.png'
                        className='h-8 mr-3'
                        alt='Pebble Logo'
                    />
                    <Pebble />
                </Link>
                <div className='flex items-center md:order-2'>
                    <div className='flex gap-4'>
                        <Dropdown />
                    </div>
                    <Language />
                    <button
                        data-collapse-toggle='navbar-language'
                        type='button'
                        onClick={menuDropdown}
                        className='inline-flex z-50 items-center p-2 ml-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                        aria-controls='navbar-language'
                        aria-expanded='false'
                    >
                        <svg viewBox='0 0 100 80' width='20' height='20'>
                            <rect
                                fill='grey'
                                width='100'
                                height='15'
                                rx='10'
                            ></rect>
                            <rect
                                fill='grey'
                                y='25'
                                width='100'
                                height='15'
                                rx='10'
                            ></rect>
                            <rect
                                fill='grey'
                                y='50'
                                width='100'
                                height='15'
                                rx='10'
                            ></rect>
                        </svg>
                    </button>
                </div>
                <div
                    className={`${
                        menuDropdownOpen ? "block" : "hidden"
                    } md:block md:flex md:items-center w-full md:w-auto`}
                    id='navbar-language'
                >
                    <ul
                        style={{ fontFamily: "Rubik" }}
                        className={`' md:static text-center md:bg-transparent bg-white gap-3 fixed sm:w-full w-60 md:min-h-0 min-h-screen flex flex-col font-medium  md:p-0 border border-gray-300  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700 left-[0px] top-0 z-10 ${styles.tiltIn}`}
                        role='menu'
                    >
                        <li>
                            <Link
                                href='/'
                                onClick={closeMenuDropdown}
                                className='block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/events'
                                onClick={closeMenuDropdown}
                                className='block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                            >
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/about'
                                onClick={closeMenuDropdown}
                                className='block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='#'
                                onClick={closeMenuDropdown}
                                className='block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
