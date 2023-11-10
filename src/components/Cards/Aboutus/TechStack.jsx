import React, { useRef, useEffect, useCallback } from "react";

import styles from "@/styles/TechStack.module.css";

const TechStack = () => {
    const containerRef = useRef(null);
    const pngRef = useRef(null);
    const svgRefs = useRef([]);
    svgRefs.current = new Array(4)
        .fill()
        .map((_, i) => svgRefs.current[i] || React.createRef());

    const timer = useRef(); // Move timer inside the component

    // Wrap the handlers with useCallback to avoid creating new functions on each render
    const handleMouseOver = useCallback(() => {
        timer.current = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.style.animationPlayState = "paused";
            }
            if (pngRef.current) {
                pngRef.current.style.animationPlayState = "paused";
            }
            svgRefs.current.forEach((ref) => {
                if (ref.current) {
                    ref.current.style.animationPlayState = "paused";
                }
            });
        }, 400);
    }, []);

    const handleMouseOut = useCallback(() => {
        clearTimeout(timer.current);
        if (containerRef.current) {
            containerRef.current.style.animationPlayState = "running";
        }
        if (pngRef.current) {
            pngRef.current.style.animationPlayState = "running";
        }
        svgRefs.current.forEach((ref) => {
            if (ref.current) {
                ref.current.style.animationPlayState = "running";
            }
        });
    }, []);

    // Clear the timer when the component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
    return (
        <div className={`z-10 ${styles.container}`} ref={containerRef}>
            <div
                ref={svgRefs.current[0]}
                className={`${styles.tooltip} ${styles.svg} `}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <img src='/Tech/icons8-css.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>testing</h3>
                        <ul>
                            <li>This will work as a tooltip</li>
                            <li>Am sure i will make it</li>
                            <li>Why not? we still got time</li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
            <div
                ref={svgRefs.current[1]}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={`${styles.tooltip} ${styles.svg}`}
            >
                <img src='/Tech/icons8-firebase.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>testing</h3>
                        <ul>
                            <li>This will work as a tooltip</li>
                            <li>Am sure i will make it</li>
                            <li>Why not? we still got time</li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
            <img
                className={styles.png}
                src='/Tech/techstack.png'
                ref={pngRef}
            />
            <div
                className={`${styles.tooltip} ${styles.svg}`}
                ref={svgRefs.current[2]}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <img src='/Tech/icons8-nextjs.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>testing</h3>
                        <ul>
                            <li>This will work as a tooltip</li>
                            <li>Am sure i will make it</li>
                            <li>Why not? we still got time</li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
            <div
                ref={svgRefs.current[3]}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={`${styles.tooltip} ${styles.svg}`}
            >
                <img src='/Tech/icons8-tailwind-css.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>testing</h3>
                        <ul>
                            <li>This will work as a tooltip</li>
                            <li>Am sure i will make it</li>
                            <li>Why not? we still got time</li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
        </div>
    );
};

export default TechStack;
