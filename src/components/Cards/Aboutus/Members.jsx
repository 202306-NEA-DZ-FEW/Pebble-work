import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Member.module.css";

import Link from "next/link";
import Image from "next/image";

const Members = ({ members, scrollContainerRef }) => {
    const [current, setCurrent] = useState(0);
    const memberRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = +entry.target.getAttribute("data-index");
                        setCurrent(index);
                        if (index === members.length - 1) {
                            const scrollContainer = document.getElementById(
                                "scroll-disable-container"
                            );
                            scrollContainer.scrollTop = 0;
                            setCurrent(0); // Reset the current state to 0
                        }
                    }
                });
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.78,
            }
        );

        memberRefs.current.forEach((ref) => observer.observe(ref));

        return () => {
            memberRefs.current.forEach((ref) => {
                if (ref && observer.unobserve(ref)) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);
    useEffect(() => {
        let startY;

        const handleTouchStart = (event) => {
            startY = event.touches[0].clientY;
        };

        const handleTouchMove = (event) => {
            const currentY = event.touches[0].clientY;
            if (currentY > startY) {
                // The touch moved upwards, prevent scrolling
                event.preventDefault();
            }
        };

        // Add event listener to the component's container
        const container = document.getElementById("scroll-disable-container");
        container.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        container.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });

        // Clean up the event listener when the component is unmounted
        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    useEffect(() => {
        const handleScroll = (event) => {
            if (event.deltaY < 0) {
                event.preventDefault();
            }
        };

        // Add event listener to the component's container
        const container = document.getElementById("scroll-disable-container");
        container.addEventListener("wheel", handleScroll, { passive: false });

        // Clean up the event listener when the component is unmounted
        return () => {
            container.removeEventListener("wheel", handleScroll);
        };
    }, []);

    return (
        <div
            id='scroll-disable-container'
            className={`${styles.container} w-[100%] h-[100%] ${styles.information} overflow-x-hidden overflow-y-scroll `}
        >
            {members.map((member, index) => (
                <div
                    key={index}
                    data-index={index}
                    ref={(el) => (memberRefs.current[index] = el)}
                    className={`${
                        styles.member
                    } rounded-[4px] flex flex-col absolute ${
                        index === current ? styles.clip : styles.active
                    }`}
                    style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${member.imageSrc})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        zIndex: 10 - index,
                        backgroundSize: "cover",
                    }}
                >
                    <h2 className='text-black flex sm:static absolute top-[-40px] font-[500] items-end mt-10'>
                        {member.name}
                    </h2>
                    <p
                        style={{ fontSize: "clamp(8px, 2vw, 18px)" }}
                        className='xl:w-[30vw] w-[38vw] sm:w-[45vw] max-h-[10vh] sm:static absolute text-center text-black'
                    >
                        {member.description}
                    </p>
                    <div className='flex sm:w-[70vw] w-[100vw] justify-center lg:gap-40 sm:gap-20 gap-10 sm:pb-20 sm:h-[70vh] items-end '>
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
                    {/* <p className='absolute text-red-600 top-0'>Information</p> */}
                </div>
            ))}
        </div>
    );
};

export default Members;
