import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Homepage.module.css";

const FeatureCard = ({ title, description, buttonText, imageUrl, link }) => {
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
            className={`w-1/2 md:w-1/2 flex flex-col justify-evenly items-center shadow-md ${
                styles.featuredCard
            } ${isVisible ? styles.visible : styles.invisible}`}
        >
            <div
                className={`xl:w-[216px] xl:h-[245.75px] lg:w-[177px] lg:h-[200px] md:w-[131px] md:h-[145px] sm:w-[100px] sm:h-[110px] w-[80px] h-[80px] ${styles.cardImage}`}
            >
                <img src={imageUrl} alt='Card Image' />
            </div>
            <div className='w-full text-center px-2'>
                <div
                    className={`text-zinc-900 w- lg:text-[32px] md:text-[24px] sm:text-[20px] font-medium font-['Rubik'] sm:leading-[44px] tracking-[0.10px] ${styles.title}`}
                >
                    {title}
                </div>
                <div
                    className={`text-zinc-500 lg:text-[18px] md:text-[15px] sm:text-[13px] text-[10px] font-normal font-['Rubik'] sm:leading-[30px] tracking-[0.10px] ${styles.description}`}
                >
                    {description}
                </div>
            </div>
            <Link
                href=''
                className={`xl:w-[163px] xl:h-[52px] justify-start items-center gap-2.5 inline-flex text-zinc-900 lg:text-[22px] sm:text-[16px] font-medium font-['Rubik'] leading-[30px] tracking-tight ${styles.button}`}
                onClick={handleButtonClick}
            >
                {buttonText}
            </Link>
        </div>
    );
};

const MainCard = () => (
    <div className='w-full bg-white lg:flex lg:flex-wrap lg:flex-row lg:gap-0 flex flex-col items-center gap-8 sm:gap-5 lg:justify-start lg:items-start'>
        <FeatureCard
            title='Join the community!'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='Sign up'
            imageUrl='/Homepage/ManTop.png'
            link='/signup'
        />
        <FeatureCard
            title='Attend events'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='View events'
            imageUrl='/Homepage/attend.png'
            link='/events'
        />
        <FeatureCard
            title='Host your event!'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='Get started'
            imageUrl='/Homepage/Girl.png'
            link='/get-started-page'
        />
    </div>
);

export default MainCard;
