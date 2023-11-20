import React from "react";
import styles from "@/styles/EventCard.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const MobileCard = ({
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
    const { t } = useTranslation();

    const handleReviewClick = () => {
        router.push(`/events/${eventId}`);
    };

    return (
        <>
            <div
                style={{
                    color: "black",
                    backgroundColor: "white",
                }}
                className={`${styles.contai} shadow-inner relative sm:w-[62vw] md:w-[466px] h-[140px] flex flex-row-reverse items-center justify-center gap-2`}
            >
                <div className={`flex flex-col gap-1 sm:gap-4`}>
                    <h1
                        className='sm:text-[15px] text-[10.55px] text-center'
                        style={{
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        {title}
                    </h1>

                    <p
                        style={{
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
                        className={`w-[45px] bg-[#2E7EAA] hover:bg-gray-400 text-white text-[10px] md:text-[12px] rounded-[4px] h-[14px] sm:w-[60px] sm:h-[18px]`}
                        onClick={handleReviewClick}
                    >
                        {t("events:reviewButton")}
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
                                <strong>{t("events:locationLabel")}:</strong>{" "}
                                {location}
                            </li>
                            <li>
                                <strong>{t("events:dateLabel")}:</strong> {date}
                            </li>
                            <li>
                                <strong>{t("events:timeLabel")}:</strong> {time}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileCard;
