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
            className={`${styles.container} w-[100%] h-[100%] ${styles.information} `}
        >
            {members.map((member, index) => (
                <div
                    key={index}
                    data-index={index}
                    ref={(el) => (memberRefs.current[index] = el)}
                    className={`${styles.member}  flex flex-col absolute ${
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
                        backgroundSize: "cover",
                    }}
                >
                    <h2 className='text-black flex items-end mt-10'>
                        {member.name}
                    </h2>
                    <div className='flex sm:w-[70vw] w-[100vw] justify-center lg:gap-40 sm:gap-20 gap-8 pb-20 h-[70vh] items-end '>
                        <Link
                            href={member.google}
                            key='index'
                            className='social-media-icon'
                        >
                            <Image
                                className='xl:w-[50px] xl:h-[50px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[22px] h-[22px]'
                                width={50}
                                height={50}
                                src='/icons/Google.png'
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
