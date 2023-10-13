import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const EventsPage = (user) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <>
            <main className='flex flex-col justify-center items-center xl:mt-32 xl:pb-[200px]'>
                <div>
                    <h1>Walecome, {user.name}!</h1>
                    <p>This is the events page</p>
                </div>
                <div className='grid grid-cols-5 gap-8 h-full w-full'>
                    <ul className='bg-[#C8C555] flex flex-col col-start-3 col-end-6 row-start-1'>
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                        <Image
                            src='/images/AboutPebble.png'
                            width={150}
                            height={150}
                            alt=''
                        />
                    </ul>
                    <div className='bg-[#95B9AB] flex flex-col items-center text-black gap-7'>
                        <div className='flex flex-col items-center gap-2'>
                            <Image
                                className='xl:w-[273px] xl:h-[243px] '
                                src='/images/AboutPebble.png'
                                width={150}
                                height={150}
                                alt=''
                            />

                            <div className='flex flex-row gap-4'>
                                <button className='bg-blue-500 text-center text-white font-medium rounded-lg xl:w-[111px] xl:h-[30px]'>
                                    Previous Month
                                </button>
                                <button className='bg-blue-500 text-center text-white font-medium rounded-lg xl:w-[111px] xl:h-[30px]'>
                                    Next Month
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-4 border border-x-0 border-b-0 border-t-black'>
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "20px",
                                    fontFamily: "Rubik",
                                    fontWeight: "400",
                                    textDecoration: "underline",
                                    lineHeight: "30px",
                                    letterSpacing: "0.10px",
                                    wordWrap: "break-word",
                                }}
                                className='pt-10'
                            >
                                Change Location
                            </p>
                            <input
                                className='border rounded-[5px] text-center'
                                type='text'
                                value={inputValue}
                                onChange={handleInputChange}
                                style={{
                                    backgroundColor: inputValue
                                        ? "#FBC495"
                                        : "white",
                                    border: `2px solid `,
                                }}
                            />
                        </div>
                        <ul className='flex flex-col gap-4 border-x-0 border-b-0 w-10/12 pt-4 items-center border border-t-black'>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                All
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                No Poverty
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Zero Hunger
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Good Heakth and Well Being
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Quality Education
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Gender Equality
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Clean Water and Sanitation
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Affordable and Clean Energy
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Decent Work and Economic Growth
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Industry, Innovation and Infrastructure
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Reduced Inequalities
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Sustainable Cities and Communities
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Responsible Consumption/Production
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Life Bellow Water
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Life on Land
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Peace, Justice and Strong institutions
                            </button>
                            <button className='bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg'>
                                Climate Action
                            </button>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventsPage;
