import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/about.module.css";
const MembersCard = ({ imageSrc, name, google, linkedin, github }) => {
    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                }}
                data-testid='members-card'
                className={`${styles.hoverEffect} card flex xl:p-[20px] pt-2 xl:bg-[#BDD6D0] bg-[#29C5E6] justify-end flex-col xl:gap-5 gap-1 items-center xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] h-[125px] w-[125px]`}
            >
                <h2 className='text-white'>{name}</h2>
                <div className='social-media-icons mb-4 flex justify-center items-center gap-2 md:gap-10'>
                    <p className='absolute top-0'>Information</p>

                    <Link
                        href={google}
                        key='index'
                        className='social-media-icon'
                    >
                        <Image
                            className='xl:w-[35px] xl:h-[35px] md:w-[30px] md:h-[30px] w-[18px] h-[18px]'
                            width={50}
                            height={50}
                            src='/icons/Google.png'
                            alt='Gmail'
                        />
                    </Link>
                    <Link
                        href={linkedin}
                        key='index'
                        className='social-media-icon'
                    >
                        <Image
                            className='xl:w-[35px] xl:h-[35px] md:w-[30px] md:h-[30px] w-[18px] h-[18px]'
                            width={50}
                            height={50}
                            src='/icons/Linkedin.png'
                            alt='Linkedin'
                        />
                    </Link>
                    <Link
                        href={github}
                        key='index'
                        className='social-media-icon'
                    >
                        <Image
                            className='xl:w-[35px] xl:h-[35px] md:w-[30px] md:h-[30px] w-[18px] h-[18px]'
                            width={50}
                            height={50}
                            src='/icons/Github.svg'
                            alt='Github'
                        />
                    </Link>
                </div>

                <style jsx>{`
                    .card {
                        clip-path: polygon(
                            50% 0%,
                            61% 35%,
                            98% 35%,
                            68% 57%,
                            79% 91%,
                            50% 70%,
                            21% 91%,
                            32% 57%,
                            2% 35%,
                            39% 35%
                        );

                        transition: clip-path 500ms ease-out;
                        text-align: center;
                    }
                    .card:hover {
                        clip-path: polygon(
                            50% 0%,
                            100% 0%,
                            98% 35%,
                            100% 100%,
                            79% 91%,
                            50% 100%,
                            21% 91%,
                            0% 100%,
                            2% 35%,
                            0% 0%
                        );
                    }

                    .card:hover h2 {
                        animation: fadeOut 0.7s ease forwards;
                        animation-delay: 1s;
                    }

                    .card:hover .social-media-icons {
                        animation: fadeIn 1s ease forwards;
                    }

                    .social-media-icons {
                        opacity: 0;
                    }

                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }

                    @keyframes fadeOut {
                        0% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                        }
                    }

                    .social-media-icon {
                        display: inline-block;
                    }
                `}</style>
            </div>
        </>
    );
};

export default MembersCard;
