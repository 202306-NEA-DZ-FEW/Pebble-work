import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import styles from "@/styles/Homepage.module.css";

const GalleryCard = () => {
    const [isGallery, setIsGallery] = useState(false);
    const { t, i18n } = useTranslation();
    const images = [
        "IMG1",
        "IMG2",
        "IMG3",
        "IMG4",
        "IMG5",
        "IMG6",
        "IMG7",
        "IMG8",
        "IMG9",
        "IMG10",
        "IMG11",
        "IMG12",
        "IMG13",
        "IMG14",
        "IMG15",
        "IMG16",
        "IMG17",
        "IMG18",
    ].map((img) => `${img}.png`);
    useEffect(() => {
        const handleScroll = () => {
            // Get the current scroll position
            const scrollPosition = window.scrollY;
            // Get the height of the window
            const windowHeight = window.innerHeight;
            // Get the gallery element by its ID
            const element = document.getElementById("gallery");

            // Check if the element exists
            if (element) {
                // Get the position of the element relative to the top of the document
                const elementPosition = element.offsetTop;

                // Check if the scroll position is greater than half of the window height from the top of the element
                if (scrollPosition > elementPosition - windowHeight / 1.3) {
                    // Set the visibility of the featured card to true
                    setIsGallery(true);
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

    return (
        <div className='flex justify-center items-center p-4'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                {images.map((image, index) => (
                    <div
                        id='gallery'
                        key={index}
                        className={`bg-gray-100 xl:w-[190px] xl:h-[172px] lg:w-[156px] lg:h-[154px] m-2 sm:w-[138px] sm:h-[132px] w-[112px] h-[106px]  flex items-center justify-center ${
                            styles.gallery
                        } ${
                            isGallery ? styles.gallerySlide : styles.invisible
                        }`}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        <img
                            style={{
                                objectPosition: "center",
                                objectFit: "cover",
                                display: "block",
                                width: "100%",
                                aspectRatio: "1/1",
                            }}
                            loading='lazy'
                            src={`/images/${i18n.language}/${image}`}
                            alt={`Image ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryCard;
