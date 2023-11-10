import React, { useRef } from "react";

import styles from "@/styles/TechStack.module.css";

const TechStack = () => {
    const containerRef = useRef(null);
    const pngRef = useRef(null);
    const svgRefs = useRef([]);
    svgRefs.current = new Array(4)
        .fill()
        .map((_, i) => svgRefs.current[i] || React.createRef());

    const handleMouseOver = () => {
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
    };

    const handleMouseOut = () => {
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
    };
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
