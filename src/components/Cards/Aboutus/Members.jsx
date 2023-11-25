import React, { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import {
    EffectCoverflow,
    Pagination,
    Autoplay,
    Navigation,
} from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

export default function Members({ members }) {
    const [direction, setDirection] = useState("");

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setDirection(
                    window.innerWidth < 640 ? "vertical" : "horizontal"
                );
            }
        };

        // Call handleResize once to set the direction based on the initial window size
        handleResize();

        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    return (
        <Swiper
            direction={direction}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
                rotate: 70,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        >
            {members.map((member, index) => (
                <SwiperSlide key={index}>
                    <div className='h-full shadow-md w-full flex flex-col items-center justify-evenly'>
                        <img
                            src={member.imageSrc}
                            alt='member'
                            className='rounded-full w-[30vw] sm:w-[80px] lg:w-[140px] '
                        />
                        <div className='flex flex-col items-center'>
                            <h2 className='text-black font-[500]'>
                                {member.name}
                            </h2>
                            <p className='slide-content p-5 text-black'>
                                {member.description}
                            </p>
                            <div className='flex w-full justify-evenly slide-content'>
                                <Link
                                    href={member.google}
                                    key='index'
                                    className='social-media-icon'
                                >
                                    <Image
                                        className='xl:w-[50px] xl:h-[50px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[22px] h-[22px]'
                                        width={50}
                                        height={50}
                                        src='/icons/Google.svg'
                                        alt='Gmail'
                                    />
                                </Link>
                                <Link
                                    href={member.linkedin}
                                    key='index'
                                    className='social-media-icon'
                                >
                                    <Image
                                        className='xl:w-[50px] xl:h-[50px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[22px] h-[22px]'
                                        width={50}
                                        height={50}
                                        src='/icons/Linkedin.png'
                                        alt='Linkedin'
                                    />
                                </Link>
                                <Link
                                    href={member.github}
                                    key='index'
                                    className='social-media-icon'
                                >
                                    <Image
                                        className='xl:w-[50px] xl:h-[50px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[22px] h-[22px]'
                                        width={50}
                                        height={50}
                                        src='/icons/Github.svg'
                                        alt='Github'
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
