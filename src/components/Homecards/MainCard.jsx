import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import styles from "@/styles/Homepage.module.css";

const FeatureCard = ({ title, description, buttonText, imageUrl, link }) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    // handle scroll event and update the visibility of the featuredcard
    useEffect(() => {
        const handleScroll = () => {
            // Get the current scroll position
            const scrollPosition = window.scrollY;
            // Get the height of the window
            const windowHeight = window.innerHeight;
            // Get the featuredcard element by its ID
            const element = document.getElementById("featuredCard");

            // Check if the element exists
            if (element) {
                // Get the position of the element relative to the top of the document
                const elementPosition = element.offsetTop;

                // Check if the scroll position is greater than half of the window height from the top of the element
                if (scrollPosition > elementPosition - windowHeight / 1.7) {
                    // Set the visibility of the featured card to true
                    setIsVisible(true);
                }
            }
        };

        // Add scroll event listener and call the handleScroll function
        window.addEventListener("scroll", handleScroll);

        // Clean up by removing the scroll event listener when the component is unmounted
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleButtonClick = () => {
        window.location.href = link;
    };

    return (
        <div
            id='featuredCard'
            className={`bg-slate-50 bg-opacity-30 w-1/2 p-2 sm:min-h-[320px] min-h-[200px] lg:min-h-[550px] lg:w-1/3 md:w-1/2 flex flex-col justify-evenly items-center  ${
                isVisible ? styles.visible : styles.invisible
            }`}
        >
            <div
                className={`xl:w-[216px] xl:h-[245.75px] lg:w-[177px] lg:h-[200px] md:w-[131px] md:h-[145px] sm:w-[100px] sm:h-[110px] w-[80px] h-[80px]`}
            >
                <img src={imageUrl} loading='lazy' alt='Card Image' />
            </div>
            <div className='w-full text-center px-2'>
                <div
                    className={`text-zinc-900 w- lg:text-[32px] md:text-[24px] sm:text-[20px] font-medium sm:leading-[44px] tracking-[0.10px]`}
                >
                    {title}
                </div>
                <div
                    className={`text-zinc-500 lg:text-[18px] md:text-[15px] sm:text-[13px] text-[10px] font-normal sm:leading-[30px] tracking-[0.10px]`}
                >
                    {description}
                </div>
            </div>
            <Link
                href={link}
                className={`xl:w-[163px] mb-5 xl:h-[52px] justify-center items-center gap-2.5 inline-flex text-[#749D60] lg:text-[22px] sm:text-[16px] font-medium leading-[30px] tracking-tight`}
                onClick={handleButtonClick}
            >
                {buttonText}
            </Link>
        </div>
    );
};

const MainCard = () => {
    const { t } = useTranslation();

    return (
        <div className='w-full lg:flex lg:flex-wrap lg:flex-row lg:gap-0 flex flex-col items-center gap-8 sm:gap-5 lg:justify-start lg:items-start mb-[6rem]'>
            <FeatureCard
                title={t("common:main:joinCommunityTitle")}
                description={t("common:main:joinCommunityDescription")}
                buttonText={t("common:main:joinCommunityButtonText")}
                imageUrl='/Homepage/ManTop.png'
                link='/signup'
            />
            <FeatureCard
                title={t("common:main:attendEventsTitle")}
                description={t("common:main:attendEventsDescription")}
                buttonText={t("common:main:attendEventsButtonText")}
                imageUrl='/Homepage/attend.png'
                link='/events'
            />
            <FeatureCard
                title={t("common:main:hostEventTitle")}
                description={t("common:main:hostEventDescription")}
                buttonText={t("common:main:hostEventButtonText")}
                imageUrl='/Homepage/Girl.png'
                link='/events/create'
            />
        </div>
    );
};

export default MainCard;
