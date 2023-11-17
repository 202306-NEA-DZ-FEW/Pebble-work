import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";

import { auth } from "@/util/firebase";

import Dropdown from "../Dropdown";
import Language from "../Language/Language";
import Pebble from "../Pebble";
import { motion } from "framer-motion";

let tabs = [
    { id: "", label: "Home" },
    { id: "events", label: "Events" },
    { id: "about", label: "About" },
];
const Navbar = () => {
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const { t } = useTranslation();
    const router = useRouter(); //so the motion will always stay on the current active tab

    const menuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen);
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

        setActiveTab(router.pathname.slice(1)); //so the motion will always stay on the current active tab

        return () => {
            logged();
        };
    }, []);

    return (
        <nav className='sticky z-[9999] md:mb-10 mb-4 bg-[#B4CD93] top-0 xl:flex xl:flex-col xl:items-center'>
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
                    }  md:flex md:items-center w-full md:w-auto`}
                    id='navbar-language'
                >
                    <ul
                        className={`md:static text-center md:bg-transparent gap-10 fixed sm:w-full w-60 md:min-h-0 min-h-screen flex flex-col font-medium md:p-0 border border-gray-300 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700 left-[0px] top-0 z-10 ${styles.tiltIn}`}
                        role='menu'
                    >
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <Link href={`/${tab.id}`}>
                                    <p
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            closeMenuDropdown();
                                        }}
                                        className={`block rounded dark:border-gray-700 ${
                                            activeTab === tab.id
                                                ? "cursor-default" //text on hover while the motion is on it
                                                : "hover:text-[#547543]" //text on hover while the motion is not on it
                                        } relative rounded-full lg:text-[18px] md:text-[15px] font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                                        style={{
                                            WebkitTapHighlightColor:
                                                "transparent",
                                        }}
                                    >
                                        {activeTab === tab.id && (
                                            <motion.span
                                                layoutId='line'
                                                className='absolute bottom-0 left-0 right-0 h-1 z-10 bg-[#2E7EAA] mix-blend-difference'
                                                transition={{
                                                    type: "spring",
                                                    bounce: 0.3,
                                                    duration: 1.2,
                                                }}
                                            />
                                        )}
                                        {t(
                                            `common:navbar:${tab.label.toLowerCase()}`
                                        )}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
