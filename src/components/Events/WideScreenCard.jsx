import React, { useState } from "react";
import styles from "@/styles/EventCard.module.css";
import { useRouter } from "next/router";
const WideScreenCard = ({
    eventId,
    title,
    type,
    image,
    location,
    date,
    time,
    description,
}) => {
    const router = useRouter();
    const handleReviewClick = () => {
        router.push(`/events/${eventId}`);
    };
    const [hideBackground, setHideBackground] = useState(false);
    let timerId;

    const handleHover = () => {
        timerId = setTimeout(() => {
            setHideBackground(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(timerId);
        setHideBackground(false);
    };
    return (
        <>
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                className={`${styles.contai} ${styles.card} ${styles.fading} border relative w-[55vw] h-[24vh] flex flex-row items-center justify-center gap-2`}
            >
                <div
                    style={{ backgroundImage: `url(${image})` }}
                    className={`${styles.backgroundImage} ${
                        hideBackground ? `${styles.backgroundImageHidden}` : ""
                    }`}
                >
                    <h2 className='sm:text-[13px] text-black text-[10px] xl:text-[22.22px] underline'>
                        type{type}
                    </h2>
                    <ul
                        className={`xl:text-[18.20px] ${
                            hideBackground
                                ? `${styles.backgroundImageHidden}`
                                : "hidden"
                        } text-black bottom-0 right-0 text-[8px] leading-[10px] md:leading-[15px] xl:leading-[20px] sm:text-[10.20px]`}
                    >
                        <li>
                            <strong>Location:</strong> {location}
                        </li>
                        <li>
                            <strong>Date:</strong> {date}
                        </li>
                        <li>
                            <strong>Time:</strong> {time}
                        </li>
                    </ul>
                </div>
                <div
                    className={`flex flex-col gap-1 sm:gap-4 items-start text-start`}
                >
                    <h1
                        className='xl:text-[25.70px] sm:text-[15px] text-[10.55px]'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        title{title}
                    </h1>

                    <p
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 400",
                            letterSpacing: "0.06px",
                            wordWrap: "break-word",
                        }}
                        className={`${styles.information} z-[-2] xl:leading-[17px] md:leading-[14px] leading-[10px] h-[26.2px] w-[214px] xl:w-[520px] xl:h-[63px] sm:w-[297px] sm:h-[37px] overflow-y-scroll xl:text-[15px] sm:text-[10.20px] text-[10px]`}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.consectetur adipiscing elit {description}
                    </p>
                </div>
                <div className='flex flex-col justify-end h-40'>
                    <p>avatars</p>
                    <button
                        onClick={handleReviewClick}
                        className={`w-[45px] bg-blue-400 hover:bg-blue-500 text-white text-[10px] xl:text-[15px] md:text-[12px] rounded-[4px] h-[14px] xl:w-[80px] xl:h-[30px] sm:w-[60px] sm:h-[18px]`}
                    >
                        Review
                    </button>
                </div>
            </div>
        </>
    );
};
export default WideScreenCard;
