import React, { useRef, useState, useEffect, useCallback } from "react";

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

export default function Test({ members }) {
    const [direction, setDirection] = useState("horizontal");

    useEffect(() => {
        setDirection(window.innerWidth < 640 ? "vertical" : "horizontal");
        const handleResize = () => {
            setDirection(window.innerWidth < 640 ? "vertical" : "horizontal");
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
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
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        >
            {members.map((member, index) => (
                <SwiperSlide key={index}>
                    <div
                        style={{
                            backgroundImage: `url(${member.imageSrc})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                        className='h-full w-full flex flex-col items-center justify-evenly'
                    >
                        <h2 className='text-red-600'>{member.name}</h2>
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
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
