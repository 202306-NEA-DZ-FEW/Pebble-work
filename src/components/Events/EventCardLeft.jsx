import React from "react";
import styles from "@/styles/EventCard.module.css";
import { useRouter } from "next/router";

const EventCardLeft = ({
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

    return (
        <>
            <div
                className={`${styles.contai} border ${styles.fading} relative sm:w-[62vw] sm:h-[16vh] w-[335px] h-[86px] md:w-[466px] md:h-[140px] flex flex-row-reverse items-center justify-center gap-2`}
            >
                <div className={`flex flex-col gap-1 sm:gap-4 `}>
                    <h1
                        className='sm:text-[15px] text-[10.55px] text-center'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        {title}
                    </h1>

                    <p
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 400",
                            letterSpacing: "0.06px",
                            wordWrap: "break-word",
                        }}
                        className={`${styles.information} md:leading-[14px] leading-[10px] h-[26.2px] w-[214px] sm:w-[297px] sm:h-[37px] overflow-y-scroll sm:text-[10.20px] text-[10px]`}
                    >
                        {description.length > 105
                            ? `${description.substring(0, 105)}...`
                            : description}
                    </p>

                    <button
                        className={`w-[45px] bg-blue-400 hover:bg-blue-500 text-white text-[10px] md:text-[12px] rounded-[4px] h-[14px] sm:w-[60px] sm:h-[18px]`}
                        onClick={handleReviewClick}
                    >
                        Review
                    </button>
                </div>
                <div className={`${styles.productImage} w-full h-full`}>
                    <img
                        className='w-full h-full'
                        src={image}
                        alt='Product Image'
                    />
                    <div className={`${styles.info1}`}>
                        <h2 className='sm:text-[13px] text-[10px] underline'>
                            {type}
                        </h2>
                        <ul
                            className={`text-[8px] leading-[10px] md:leading-[15px] sm:text-[10.20px]`}
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
                </div>
            </div>
        </>
    );
};
export default EventCardLeft;
