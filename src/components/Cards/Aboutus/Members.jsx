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
                        setCurrent(+entry.target.getAttribute("data-index"));
                    }
                });
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.87,
            }
        );

        memberRefs.current.forEach((ref) => observer.observe(ref));

        return () => {
            memberRefs.current.forEach((ref) => observer.unobserve(ref));
        };
    }, []);

    return (
        <div className={styles.container}>
            {members.map((member, index) => (
                <div
                    key={index}
                    data-index={index}
                    ref={(el) => (memberRefs.current[index] = el)}
                    className={`${styles.member} ${
                        index === current ? styles.clip : styles.active
                    }`}
                    style={{
                        backgroundImage: `url(${member.imageSrc})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <h2>{member.name}</h2>
                    <div className='social-media-icons mb-4 flex justify-center items-center gap-2 md:gap-10'>
                        <p className='absolute top-0'>Information</p>

                        <Link
                            href={member.google}
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
                            href={member.linkedin}
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
                            href={member.github}
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
                </div>
            ))}
        </div>
    );
};

export default Members;
