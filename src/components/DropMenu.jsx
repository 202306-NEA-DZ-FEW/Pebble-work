import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BeatLoader } from "react-spinners";

import styles from "@/styles/DropMenu.module.css";

import { auth } from "@/util/firebase";

import Signup from "./Signup/Signup";
import Bubble from "./Chat/Bubble";

const DropMenu = () => {
    const { t } = useTranslation("common");
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const spinner = <BeatLoader size={10} color={"#749D60"} loading={true} />;
    const [loading, setLoading] = useState(true);
    const [loadingName, setLoadingName] = useState(false);
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
    const handleSigninClick = () => {
        if (!user) {
            router.push("/signin");
        }
    };

    useEffect(() => {
        const logged = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                if (!user.displayName) {
                    setLoadingName(true);
                } else {
                    setLoadingName(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            logged();
        };
    }, []);
    useEffect(() => {
        if (user) {
            const interval = setInterval(async () => {
                await user.reload();
                if (user.displayName) {
                    setLoadingName(false);
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [user]);

    if (loading) {
        return spinner;
    }

    return (
        <div className='flex sm:flex-row flex-col gap-3 sm:gap-4'>
            <div className={user ? "hidden" : ""}>
                <Signup />
            </div>
            <div className='relative' ref={dropdownRef}>
                <div
                    onMouseEnter={handleMouseEnter}
                    className='flex gap-1 items-center cursor-pointer justify-center'
                >
                    <button
                        onClick={handleSigninClick}
                        className={
                            user
                                ? `text-[#749D60] hover:text-inherit text-[12px] lg:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:h-[41px] sm:h-[25.5px]`
                                : `w-[52px] bg-[#2E7EAA] text-white text-[10px] hover:bg-[#749D60] xl:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px]`
                        }
                    >
                        {user && loadingName
                            ? spinner
                            : user
                            ? isMobile
                                ? user.displayName?.length > 6
                                    ? user.displayName.slice(0, 4) + ".."
                                    : user.displayName
                                : user.displayName?.length > 10
                                ? user.displayName.slice(0, 10) + ".."
                                : user.displayName
                            : t("common:dropdown:signIn")}
                    </button>
                    {user ? (
                        <div>
                            <Bubble />
                            <img
                                className='rounded-full md:w-8 md:h-8 w-6 h-6'
                                src={
                                    auth?.currentUser.photoURL !== null
                                        ? auth?.currentUser.photoURL
                                        : "/images/icon_default.png"
                                }
                                alt='Profile'
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                {isOpen && (
                    <div
                        onMouseLeave={handleMouseLeave}
                        className='absolute cursor-pointer right-0 xl:mr-11 md:mt-2 md:mr-10 sm:mt-1 sm:mr-4 mr-7 mt-1 bg-white rounded-md shadow-lg overflow-hidden'
                    >
                        <ul className='text-[10px] lg:text-[14px] xl:text-[16px] md:text-[12px] h-full flex items-center justify-center w-[90px] lg:w-[100px] xl:w-[110px]'>
                            {user ? (
                                <div className='flex flex-col pl-1'>
                                    <Link
                                        href='/profile'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        {t("common:dropdown:profile")}
                                    </Link>
                                    <Link
                                        href='/events/create'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        {t("common:dropdown:hostEvent")}
                                    </Link>
                                    <Link
                                        href='/dashboard'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        {t("common:dropdown:myEvents")}
                                    </Link>
                                    <hr />
                                    <Link
                                        href='/profile/edit'
                                        className={`hover:text-red-600 ${styles.listItem}`}
                                    >
                                        {t("common:dropdown:accountSettings")}
                                    </Link>
                                    <hr />
                                    <button
                                        onClick={handleSignOut}
                                        className='px-2 py-2 border border-t-transparent border-r-transparent border-l-transparent hover:bg-gray-100'
                                    >
                                        {t("common:dropdown:signOut")}
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropMenu;
