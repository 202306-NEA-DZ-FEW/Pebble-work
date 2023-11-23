import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "@/styles/Homepage.module.css";

const ImageSquareCard = () => {
    const [isImage, setIsImage] = useState(false);
    const [isImage1, setIsImage1] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            // Get the current scroll position
            const scrollPosition = window.scrollY;
            // Get the height of the window
            const windowHeight = window.innerHeight;
            // Get the gallery element by its ID
            const element = document.getElementById("imagecard");
            const element1 = document.getElementById("imagecard1");
            if (element1) {
                const elementPosition = element1.offsetTop;

                // Check if the scroll position is greater than half of the window height from the top of the element
                if (scrollPosition > elementPosition - windowHeight / 1.2) {
                    // Set the visibility of the featured card to true
                    setIsImage1(true);
                }
            }

            // Check if the element exists
            if (element) {
                // Get the position of the element relative to the top of the document
                const elementPosition = element.offsetTop;

                // Check if the scroll position is greater than half of the window height from the top of the element
                if (scrollPosition > elementPosition - windowHeight / 2.3) {
                    // Set the visibility of the featured card to true
                    setIsImage(true);
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
        <div className={`${styles.container} mt-[3rem]`}>
            <div className={`${styles.gridContainer}`}>
                <div
                    id='imagecard1'
                    className={`${styles.imageWrapper} ${
                        isImage1 ? styles.bottomRight : styles.invisible
                    }`}
                >
                    <Image
                        fetchpriority='high'
                        width={768}
                        height={768}
                        src='/Homepage/Oxfams-COVID-19-Relief-Efforts 2.png'
                        className={`${styles.imageSquare}`}
                        alt='Image 1'
                    />
                </div>
                <div
                    id='imagecard'
                    className={`${styles.imageWrapper} ${
                        isImage ? styles.bottomRight : styles.invisible
                    }`}
                >
                    <Image
                        fetchpriority='high'
                        width={768}
                        height={768}
                        src='/Homepage/Image.png'
                        className={`${styles.imageSquare}`}
                        alt='Image 2'
                    />
                </div>
                <div
                    className={`${styles.imageWrapper} ${
                        isImage ? styles.bottomLeft : styles.invisible
                    }`}
                >
                    <Image
                        fetchpriority='high'
                        width={768}
                        height={768}
                        src='/Homepage/Image (1).jpg'
                        className={`${styles.imageSquare}`}
                        alt='Image 3'
                    />
                </div>
                <div
                    className={`${styles.imageWrapper} ${
                        isImage1 ? styles.bottomRight : styles.invisible
                    }`}
                >
                    <Image
                        fetchpriority='high'
                        width={768}
                        height={768}
                        src='/Homepage/Image (2).png'
                        className={`${styles.imageSquare}`}
                        alt='Image 4'
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageSquareCard;
