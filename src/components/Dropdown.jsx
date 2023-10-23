import React, { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/util/firebase";
import Link from "next/link";
import Signup from "./Signup/Signup";
import { useMediaQuery } from "react-responsive";
import Signin from "./Signin/Signin";
import styles from "@/styles/DropMenu.module.css";

const Dropdown = () => {
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
    };

    useEffect(() => {
        const logged = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log("Name:", user);
            } else {
                setUser(null);
            }
        });
        return () => {
            logged();
        };
    }, []);

    return (
        <>
            <div className={user ? "hidden" : ""}>
                <Signup />
            </div>
            <div className='relative ' ref={dropdownRef}>
                <div className='flex gap-1 items-center justify-center'>
                    <button
                        onMouseEnter={handleMouseEnter}
                        className={`w-[52px] xl:mb-0 md:mb-2 md:mt-0 sm:mt-[2px] mt-[5px] bg-blue-400 text-white text-[10px] hover:bg-blue-500 xl:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px]`}
                    >
                        {user
                            ? // if the screen width is below 640px limit the display name to 5 characters
                              isMobile
                                ? user.displayName?.length > 5
                                    ? user.displayName.slice(0, 5) + "..."
                                    : user.displayName
                                : // if the screen width is above 640px limit the display name to 10 characters
                                user.displayName?.length > 10
                                ? user.displayName.slice(0, 10) + "..."
                                : user.displayName
                            : "Account"}
                    </button>

                    <img
                        className='rounded-full md:w-8 md:h-8 w-6 h-6'
                        src={user ? user.photoURL : "/logo/Logo.png"}
                        alt={
                            user
                                ? user.email.length > 2
                                    ? user.email.slice(0, 2) + "..."
                                    : user.email
                                : "Account"
                        }
                    />
                </div>

                {isOpen && (
                    <div
                        onMouseLeave={handleMouseLeave}
                        className='absolute cursor-pointer right-0 xl:mr-11 md:mt-2 md:mr-10 sm:mt-1 sm:mr-4 mr-7 mt-1 bg-white rounded-md shadow-lg overflow-hidden'
                    >
                        <ul className='text-[10px] lg:text-[14px] xl:text-[16px] md:text-[12px] h-full flex items-center justify-center sm:w-[90px] lg:w-[100px] xl:w-[110px]'>
                            {user ? (
                                <div className='flex flex-col pl-1'>
                                    <Link
                                        href='/profile'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href='/events/create'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        Host Event
                                    </Link>
                                    <Link
                                        href='/myevents'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        My Events
                                    </Link>
                                    <hr />
                                    <Link
                                        href='/editprofile'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        Account Settings
                                    </Link>
                                    <hr />
                                    <button
                                        onClick={handleSignOut}
                                        className='px-2 py-2 border border-t-transparent border-r-transparent border-l-transparent hover:bg-gray-100'
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className='w-[52px] text-[10px] xl:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px] hover:bg-gray-200'>
                                        <Link href='/signin'>Log in</Link>
                                    </button>
                                </div>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dropdown;
