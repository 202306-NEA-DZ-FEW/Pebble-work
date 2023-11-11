import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer
            data-testid='footer'
            className='md:flex md:items-center md:justify-center flex items-center justify-center bg-[#FDA855]'
            style={{
                width: "100%",
                height: "180px",
                zIndex: "90",
            }}
        >
            <div className='md:flex md:flex-row md:justify-between flex flex-col items-center md:xl:gap-72 md:gap-20 md:items-center'>
                <div>
                    <Link href='/' passHref>
                        <img
                            src='/logo/Logo.png'
                            className='md:h-20 md:mr-3 h-10'
                            alt='Logo'
                        />
                    </Link>
                </div>
                <div className='flex flex-col items-center md:flex md:flex-col md:items-center md:gap-5'>
                    <ul className='flex gap-[30px]'>
                        <li>
                            <Link href='/events'>{t("footer.events")}</Link>
                        </li>
                        <li>
                            <Link href='/about'>{t("footer.about")}</Link>
                        </li>
                        <li>
                            <Link href='#'>{t("footer.howItWorks")}</Link>
                        </li>
                    </ul>
                    <div>
                        <p className='text-[#878787] text-17px'>
                            © Pebble Work, 2023
                        </p>
                    </div>
                </div>
                <div className='md:flex '>
                    <ul className='flex gap-20 md:gap-8'>
                        <li>
                            <Link href='#'>
                                <img
                                    src='/icons/Facebook.svg'
                                    className='md:w-[50px] w-[30px]'
                                    alt='Facebook'
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <img
                                    src='/icons/Google.svg'
                                    className='md:w-[50px] w-[30px]'
                                    alt='Gmail'
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <img
                                    src='/icons/Github.svg'
                                    className='md:w-[50px] w-[30px]'
                                    alt='Github'
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
