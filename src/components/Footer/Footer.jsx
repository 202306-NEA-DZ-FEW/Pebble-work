import React from "react";
import Link from "next/link";
import Translat from "@/util/Translat";

const Footer = (props) => {
    const { t } = Translat(props);
    return (
        <footer
            data-testid='footer'
            className=' md:flex md:items-center md:justify-center flex items-center justify-center bg-[#FDA855]'
            style={{
                width: "100%",
                height: "180px",
                zIndex: "90",
            }}
        >
            <div className='md:flex md:flex-row md:justify-between flex flex-col items-center md:xl:gap-72 md:gap-20 md:items-center'>
                <div>
                    <Link href='/' className='flex items-center'>
                        <img
                            src='/logo/Logo.png'
                            className='md:h-20 md:mr-3 h-10'
                            alt='Logo'
                        />
                    </Link>
                </div>
                <div className='flex flex-col items-center md:flex md:flex-col md:items-center md:gap-5'>
                    <ul
                        style={{
                            color: "black",
                            fontSize: "20px",
                            fontFamily: "Rubik",
                            fontWeight: "700",
                            lineHeight: "30px",
                            letterSpacing: "0.10px",
                            wordWrap: "break-word",
                        }}
                        className='flex gap-[30px] '
                    >
                        <li>
                            <Link href='/events'>Events</Link>
                        </li>
                        <li>
                            <Link href='/about'>About</Link>
                        </li>
                        <li>
                            <Link href='#'>How it works</Link>
                        </li>
                    </ul>
                    <div>
                        <p
                            style={{
                                color: "#878787",
                                fontSize: "17px",
                                fontFamily: "Rubik",
                                fontWeight: "300",
                                lineHeight: "30px",
                                letterSpacing: "0.10px",
                                wordWrap: "break-word",
                            }}
                        >
                            © Pebble Work, 2023
                        </p>
                    </div>
                </div>
                <div className='md:flex '>
                    <ul className='flex gap-20 md:gap-8'>
                        <li>
                            <Link href='#'>
                                <img src='/icons/Facebook.png' alt='Facebook' />
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <img src='/icons/Google.png' alt='Gmail' />
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                <img src='/icons/Twitter.png' alt='Twitter' />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
