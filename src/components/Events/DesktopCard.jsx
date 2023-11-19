import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/EventCard.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

const DesktopCard = ({ eventId, title, type, image, description }) => {
    const router = useRouter();
    const handleReviewClick = () => {
        router.push(`/events/${eventId}`);
    };
    const [hideBackground, setHideBackground] = useState(false);
    const [enterDelay, setEnterDelay] = useState(null);
    let timerId;
    let reverseTimer;
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation(); // Initialize useTranslation
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleHover = () => {
        clearTimeout(enterDelay); // clear the enter delay if the mouse enters again
        setEnterDelay(
            setTimeout(() => {
                setHideBackground(true);
                setIsHovered(true);
            }, 1000)
        ); // delay of 1 second before handleHover is executed
    };

    const handleMouseLeave = () => {
        clearTimeout(enterDelay); // clear the enter delay if the mouse leaves
        if (!isHovered) return; // if the mouse hasn't been hovered for at least 1 second, do nothing
        clearTimeout(timerId);
        setHideBackground(false);
        setIsHovered(false);
    };

    useEffect(() => {
        // This is to ensure that the timeouts don’t try to update the state of a component that is no longer in the DOM, which can cause memory leaks.
        return () => {
            clearTimeout(timerId);
            clearTimeout(reverseTimer);
            clearTimeout(enterDelay);
        };
    }, []);

    return (
        <>
            <div
                style={{
                    color: "black",
                    backgroundColor: "white",
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                className={`${styles.contai} ${styles.card} ${styles.wideFading} shadow-inner w-[55vw] h-[200px] flex flex-row items-center justify-around gap-2`}
            >
                <img
                    src={image}
                    alt='background'
                    style={{ display: "none" }}
                    onLoad={() => setImageLoaded(true)}
                />
                <div
                    style={{ backgroundImage: `url(${image})` }}
                    className={`${styles.backgroundImage} ${
                        hideBackground ? `${styles.backgroundImageHidden}` : ""
                    }`}
                >
                    {!imageLoaded && <CircularProgress />}
                </div>
                <div className={`flex flex-col gap-1 sm:gap-4 text-start`}>
                    <h1
                        className='xl:text-[25.70px] sm:text-[15px] text-[10.55px]'
                        style={{
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                            textShadow: "0px 1px 2px rgba(10, 10, 10, 0.8)",
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
                        className={`${styles.information} z-[-2] xl:leading-[17px] md:leading-[14px] leading-[10px] h-[26.2px] w-[214px] xl:w-[460px] xl:h-[63px] sm:w-[297px] sm:h-[37px] overflow-y-scroll xl:text-[15px] sm:text-[10.20px] text-[10px]`}
                    >
                        <h2 className='italic sm:text-[13px] mb-2 text-[#749D60] text-[10px] xl:text-[22.22px] '>
                            {type}
                        </h2>
                        {description.length > 110
                            ? `${description.substring(0, 110)}...`
                            : description}
                    </p>
                </div>
                <div className='flex flex-col justify-end h-40'>
                    <button
                        onClick={handleReviewClick}
                        className={`w-[45px] bg-[#2E7EAA] hover:bg-[#749D60] text-white text-[10px] xl:text-[15px] md:text-[12px] rounded-[4px] h-[14px] xl:w-[80px] xl:h-[30px] sm:w-[60px] sm:h-[18px]`}
                    >
                        {t("events:reviewButton")}
                    </button>
                </div>
            </div>
        </>
    );
};

export default DesktopCard;
