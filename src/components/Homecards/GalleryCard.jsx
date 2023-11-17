import React, { useState, useEffect } from "react";
import styles from "@/styles/Homepage.module.css";

const GalleryCard = () => {
    const [isGallery, setIsGallery] = useState(false);
    const images = [
        "IMG1.png",
        "IMG2.png",
        "IMG3.png",
        "IMG4.png",
        "IMG5.png",
        "IMG6.png",
        "IMG7.png",
        "IMG8.png",
        "IMG9.png",
        "IMG10.png",
        "IMG11.png",
        "IMG12.png",
        "IMG13.png",
        "IMG14.png",
        "IMG15.png",
        "IMG16.png",
        "IMG17.png",
        "IMG18.png",
    ];
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
        <div className='flex justify-center items-center shadow-md'>
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
                            src={`/images/${image}`}
                            alt={`Image ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryCard;
