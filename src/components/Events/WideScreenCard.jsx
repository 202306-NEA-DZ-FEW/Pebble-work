import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/EventCard.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

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
    const [enterDelay, setEnterDelay] = useState(null);
    let timerId;
    let reverseTimer;
    const [isHovered, setIsHovered] = useState(false);
    const h2Ref = useRef();
    const { t } = useTranslation(); // Initialize useTranslation

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
        reverseTimer = setTimeout(() => {
            if (h2Ref.current) {
                const letters = h2Ref.current.innerText.split("");
                h2Ref.current.innerHTML = "";
                letters.forEach((letter, i) => {
                    const span = document.createElement("span");
                    span.innerText = letter;
                    span.style.opacity = 0;
                    span.style.animationDelay = `${
                        (letters.length - i) * 0.1
                    }s`;
                    span.className = styles.reverseExplode;
                    h2Ref.current.appendChild(span);
                });
            }
        }, 1500);
    };
    useEffect(() => {
        if (isHovered && h2Ref.current) {
            const letters = h2Ref.current.innerText.split("");
            h2Ref.current.innerHTML = "";
            letters.forEach((letter, i) => {
                const span = document.createElement("span");
                span.innerText = letter;
                span.style.animationDelay = `${i * 0.1}s`;
                span.className = styles.explode;
                h2Ref.current.appendChild(span);
            });
        }
    }, [isHovered]);

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
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                className={`${styles.contai} ${styles.card} ${styles.wideFading} shadow-inner w-[55vw] h-[200px] flex flex-row items-center justify-around gap-2`}
            >
                <h2
                    ref={h2Ref}
                    className={`absolute top-[35%] sm:text-[13px] text-black text-[10px] xl:text-[22.22px]`}
                >
                    {type}
                </h2>
                <div
                    style={{ backgroundImage: `url(${image})` }}
                    className={`${styles.backgroundImage} ${
                        hideBackground ? `${styles.backgroundImageHidden}` : ""
                    }`}
                >
                    <h2 className='sm:text-[13px] text-black text-[10px] xl:text-[22.22px] underline'>
                        {type}
                    </h2>
                    <ul
                        className={`xl:text-[18.20px] ${
                            hideBackground
                                ? `${styles.backgroundImageHidden}`
                                : "hidden"
                        } text-black text-[8px] leading-[10px] md:leading-[15px] xl:leading-[20px] sm:text-[10.20px]`}
                    >
                        <li>
                            <strong>
                                {t("event:locationLabel")}: {location}
                            </strong>
                        </li>
                        <li>
                            <strong>
                                {t("events:dateLabel")}: {date}
                            </strong>
                        </li>
                        <li>
                            <strong>
                                {t("events:timeLabel")}: {time}
                            </strong>
                        </li>
                    </ul>
                </div>
                <div className={`flex flex-col gap-1 sm:gap-4 text-start`}>
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
                        className={`${styles.information} z-[-2] xl:leading-[17px] md:leading-[14px] leading-[10px] h-[26.2px] w-[214px] xl:w-[520px] xl:h-[63px] sm:w-[297px] sm:h-[37px] overflow-y-scroll xl:text-[15px] sm:text-[10.20px] text-[10px]`}
                    >
                        {description.length > 130
                            ? `${description.substring(0, 130)}...`
                            : description}
                    </p>
                </div>
                <div className='flex flex-col justify-end h-40'>
                    <p>{t("events:avatars")}</p>
                    <button
                        onClick={handleReviewClick}
                        className={`w-[45px] bg-blue-400 hover:bg-blue-500 text-white text-[10px] xl:text-[15px] md:text-[12px] rounded-[4px] h-[14px] xl:w-[80px] xl:h-[30px] sm:w-[60px] sm:h-[18px]`}
                    >
                        {t("events:reviewButton")}
                    </button>
                </div>
            </div>
        </>
    );
};

export default WideScreenCard;
