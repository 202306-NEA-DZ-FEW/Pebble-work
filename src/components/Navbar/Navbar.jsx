import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";

import styles from "@/styles/Navbar.module.css";

import DropMenu from "../DropMenu";
import Language from "../Language/Language";
import Pebble from "../Pebble";
import Bubble from "../Chat/Bubble";

let tabs = [
    { id: "home", label: "Home" },
    { id: "events", label: "Events" },
    { id: "about", label: "About" },
];
const Navbar = () => {
    const dropdownRef = useRef(null);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const { t } = useTranslation();
    const router = useRouter(); //so the motion will always stay on the current active tab
    const scrollDir = useScrollDirection();
    //get user state from dropdown
    const handleUserChange = (newUser) => {
        setUser(newUser);
    };

    function useScrollDirection() {
        const [scrollDir, setScrollDir] = useState("up");

        useEffect(() => {
            const threshold = 0;
            let lastScrollY = window.pageYOffset;
            let ticking = false;

            const updateScrollDir = () => {
                const scrollY = window.pageYOffset;

                if (Math.abs(scrollY - lastScrollY) < threshold) {
                    ticking = false;
                    return;
                }
                setScrollDir(scrollY > lastScrollY ? "down" : "up");
                lastScrollY = scrollY > 0 ? scrollY : 0;
                ticking = false;
            };

            const onScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateScrollDir);
                    ticking = true;
                }
            };

            window.addEventListener("scroll", onScroll);

            return () => window.removeEventListener("scroll", onScroll);
        }, []);

        return scrollDir;
    }

    const menuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen);
    };

    const closeMenuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuDropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                closeMenuDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        //so the motion will always stay on the current active tab
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuDropdownOpen]);
    useEffect(() => {
        setActiveTab(
            router.pathname === "/" ? "home" : router.pathname.slice(1)
        );
    }, [router.pathname]); //to mount when ever the route is change

    return (
        <>
            <motion.nav
                initial={{ top: 0, opacity: 1 }}
                animate={{
                    top: scrollDir === "down" ? -80 : 0,
                    opacity: scrollDir === "down" ? 0 : 1,
                }}
                transition={{ ease: "linear", duration: 0.3 }}
                className='sticky z-[555] bg-[#B4CD93] top-0 xl:flex xl:flex-col xl:items-center'
            >
                <div
                    style={{
                        width: "100%",
                        height: "8%",
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
                            <DropMenu onUserChange={handleUserChange} />
                        </div>

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
                        }  md:flex md:items-center w-full md:w-auto navbar-content`}
                        id='navbar-language'
                        ref={dropdownRef}
                    >
                        <ul
                            className={`md:static text-center md:bg-transparent gap-10 fixed sm:w-full w-60 md:min-h-0 min-h-screen flex flex-col font-medium md:p-0 md:flex-row md:space-x-8 md:mt-0 bg-gray-800 left-[0px] top-0 z-10 ${styles.tiltIn}`}
                            role='menu'
                        >
                            {tabs.map((tab) => (
                                <li key={tab.id}>
                                    <Link
                                        href={
                                            tab.id === "home"
                                                ? "/"
                                                : `/${tab.id}`
                                        }
                                    >
                                        <p
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                closeMenuDropdown();
                                            }}
                                            className={`block rounded dark:border-gray-700 ${
                                                activeTab === tab.id
                                                    ? "" //text on hover while the motion is on it
                                                    : "hover:text-[#547543]" //text on hover while the motion is not on it
                                            } relative rounded-full lg:text-[18px] md:text-[15px] font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                                            style={{
                                                WebkitTapHighlightColor:
                                                    "transparent",
                                            }}
                                        >
                                            {activeTab === tab.id &&
                                                activeTab !== "" && (
                                                    <motion.span
                                                        layoutId='line'
                                                        className='absolute bottom-0 left-0 right-0 md:h-[2px] h-1 z-10 bg-[#547543]'
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
            </motion.nav>
            <Language />
            {user ? <Bubble /> : ""}
        </>
    );
};

export default Navbar;
