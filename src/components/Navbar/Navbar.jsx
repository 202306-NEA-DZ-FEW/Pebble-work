import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

    const menuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className='bg-white border rounded-b-[45px] border-gray-200 dark:bg-gray-900 xl:flex xl:flex-col xl:items-center'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between p-4 xl:gap-40'>
                <Link href='./' className='flex items-center'>
                    <img
                        src='/logo/Logo.png'
                        className='h-8 mr-3'
                        alt='Pebble Logo'
                    />
                </Link>
                <div className='flex items-center md:order-2'>
                    <div className='flex gap-4'>
                        <button class='inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md'>
                            Sign in
                        </button>
                        <button class='inline-flex items-center px-4 py-2 bg-[#2F7DA9] hover:bg-[#62b1de] text-white text-sm font-medium rounded-md'>
                            Sign up
                        </button>
                    </div>
                    <button
                        type='button'
                        onClick={toggleDropdown}
                        className='inline-flex items-center font-medium justify-center px-4 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer'
                    >
                        <div className='flex items-center'>
                            <img
                                src='/icons/Web.png'
                                className=''
                                alt='Pebble Logo'
                            />
                            <p>(EN)</p>
                        </div>
                    </button>
                    <div
                        className={`z-50 ${
                            isDropdownOpen ? "block" : "hidden"
                        } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
                        id='language-dropdown-menu'
                    >
                        <ul className='py-10 font-medium flex absolute right-[3px]'>
                            <li>
                                <Link
                                    href='#'
                                    className='block px-4 py-2 text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                                >
                                    <div className='inline-flex items-center'>
                                        <svg
                                            aria-hidden='true'
                                            className='h-3.5 w-3.5 rounded-full mr-2'
                                            xmlns='http://www.w3.org/2000/svg'
                                            id='flag-icon-css-us'
                                            viewBox='0 0 512 512'
                                        >
                                            <path
                                                fill='#3c3b6e'
                                                d='M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0z'
                                                transform='scale(3.9385)'
                                            />
                                            <path
                                                fill='#192f5d'
                                                d='M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0z'
                                                transform='scale(3.9385)'
                                            />
                                            <path
                                                fill='#fff'
                                                d='M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0z'
                                                transform='scale(3.9385)'
                                            />
                                        </svg>
                                        English (EN)
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='block px-4 py-2 text-sm text-gray-700 hover:border hover:rounded-full dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                                >
                                    <div className='inline-flex items-center'>
                                        <img
                                            className='mr-1'
                                            src='/palestine.png'
                                            width='20px'
                                            height='20px'
                                        />
                                        Arabic (AR)
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <button
                        data-collapse-toggle='navbar-language'
                        type='button'
                        onClick={menuDropdown}
                        className='inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                        aria-controls='navbar-language'
                        aria-expanded='false'
                    >
                        <svg viewBox='0 0 100 80' width='40' height='40'>
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
                        className='md:static text-center gap-3 absolute w-full bottom-2 flex flex-col font-medium  md:p-0 border border-gray-300 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700 left-[0px]'
                        role='menu'
                    >
                        <li>
                            <Link
                                href='#'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                            >
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='#'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='#'
                                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
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
