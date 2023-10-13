import React from "react";
import Image from "next/image";
import styles from "@/styles/about.module.css";

const AboutPage = () => {
    return (
        <>
            <div
                className={` grid grid-rows-1 content-center place-items-center xl:pt-20 xl:pb-[150px] lg:pb-[250px]`}
            >
                <div className='absolute xl:static top-0 pb-40'>
                    <Image
                        className={`${styles.topImage} xl:w-[1440px] object-cover xl:object-cover lg:object-cover md:object-cover xl:h-[780px] lg:w-[1233px] lg:h-[630px] md:h-[516px] h-[363px]`}
                        src='/images/AboutPebble.png'
                        alt='Pebbles'
                        width={1440}
                        height={780}
                    />
                </div>
                <div className='flex flex-col flex-wrap items-center pb-[200px] xl:pb-40 z-[1]'>
                    <h1
                        style={{
                            fontFamily: "Rubik",
                            fontWeight: "500",
                            lineHeight: "56.70px",
                            letterSpacing: "0.23px",
                            wordWrap: "break-word",
                        }}
                        className={`${styles.text0} xl:mb-7`}
                    >
                        About Pebble Work
                    </h1>
                    <p
                        className={`${styles.text1} flex text-center text-[#878787] px-4`}
                    >
                        Body placeholder for text paragraph. A paragraph is a
                        self-contained unit of text dealing with a particular
                        point or idea.
                    </p>
                </div>
                <div className='rounded-[20px] flex flex-col items-center bg-[#fbc495] xl:mb-40'>
                    <h2
                        className={`${styles.teamText} text-[40px] text-[#1A1A1A] md:mt-10 md:mb-10`}
                    >
                        Our Team
                    </h2>
                    <div className='flex flex-row xl:flex-col flex-wrap gap-10 mx-3 md:mx-10'>
                        <div className='flex flex-col xl:flex-row gap-7 xl:gap-96 flex-wrap'>
                            <div className='rounded-[25px] xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] w-[100px] h-[100px]'>
                                <Image
                                    className='rounded-[25px] object-cover'
                                    src='/images/300x300px.jpg'
                                    alt='Pebbles'
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className='rounded-[25px] xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] w-[100px] h-[100px]'>
                                <Image
                                    className='rounded-[25px]'
                                    src='/images/300x300px.jpg'
                                    alt='Pebbles'
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col xl:flex-row gap-7 xl:gap-20 justify-center mb-7 xl:mb-20'>
                            <div className='rounded-[25px] xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] w-[100px] h-[100px]'>
                                <Image
                                    className='rounded-[25px] object-cover'
                                    src='/images/300x300px.jpg'
                                    alt='Pebbles'
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className='rounded-[25px] xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] w-[100px] h-[100px]'>
                                <Image
                                    className='rounded-[25px] object-cover'
                                    src='/images/300x300px.jpg'
                                    alt='Pebbles'
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='xl:mb-10 md:mb-7 mb-4'>
                        <div className='rounded-[25px] xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] w-[100px] h-[100px]'>
                            <Image
                                className='rounded-[25px] object-cover'
                                src='/images/300x300px.jpg'
                                alt='Pebbles'
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center text-center xl:mb-40 md:pb-40 pb-[222px]'>
                    <h6 className={`${styles.techText} text-[#878787] xl:mb-4`}>
                        Tech Stack
                    </h6>
                    <h2
                        className={`${styles.techText1} text-[#1A1A1A] xl:mb-4`}
                    >
                        Technologies Used and Project Structure
                    </h2>
                    <p className={`${styles.techText2} text-[#878787] px-3`}>
                        Body placeholder for text paragraph. A paragraph is a
                        self-contained unit of text dealing with a particular
                        point or idea.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
