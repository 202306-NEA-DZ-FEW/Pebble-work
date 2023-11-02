import React from "react";
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
    return (
        <>
            <div
                // style={{
                //     backgroundImage: `url("/images/AboutPebble.png")`,
                //     backgroundSize: "100% 100%",
                // }}
                className={`${styles.contai} ${styles.card} ${styles.fading} border relative w-[335px] h-[86px] xl:w-[816px] xl:h-[210px] sm:w-[466px] sm:h-[140px] flex flex-row items-center justify-center gap-2`}
            >
                <div className={`${styles.backgroundImage}`}></div>
                <div className={`flex flex-col gap-1 sm:gap-4 items-end `}>
                    <h1
                        className='xl:text-[25.70px] sm:text-[15px] text-[10.55px] text-center'
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
                        className={`${styles.information} xl:leading-[17px] md:leading-[14px] leading-[10px] h-[26.2px] w-[214px] xl:w-[520px] xl:h-[63px] sm:w-[297px] sm:h-[37px] overflow-y-scroll xl:text-[15px] sm:text-[10.20px] text-[10px]`}
                    >
                        {description}
                    </p>

                    <div className='flex'>
                        <p>avatars</p>
                        <button
                            onClick={handleReviewClick}
                            className={`w-[45px] bg-blue-400 hover:bg-blue-500 text-white text-[10px] xl:text-[15px] md:text-[12px] rounded-[4px] h-[14px] xl:w-[80px] xl:h-[30px] sm:w-[60px] sm:h-[18px]`}
                        >
                            Review
                        </button>
                    </div>
                </div>
                <div className={`${styles.productImage} bg-red-600 h-full `}>
                    {/* <img
                        className={`h-full `}
                        src='/images/AboutPebble.png'
                        alt={title}
                    /> */}
                    <div className={`${styles.info}`}>
                        <h2 className='sm:text-[13px] text-[10px] xl:text-[22.22px] underline'>
                            {type}
                        </h2>
                        <ul
                            className={`xl:text-[18.20px] text-[8px] leading-[10px] md:leading-[15px] xl:leading-[20px] sm:text-[10.20px]`}
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
export default WideScreenCard;
