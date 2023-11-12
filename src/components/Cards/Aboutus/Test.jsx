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

export default function Test({ members }) {
    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            loop={true}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
                rotate: 50,
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
                    >
                        <h2>{member.name}</h2>
                        <p>{member.description}</p>
                        <div>
                            <Link href={member.google}>Google</Link>
                            <Link href={member.linkedin}>LinkedIn</Link>
                            <Link href={member.github}>GitHub</Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
