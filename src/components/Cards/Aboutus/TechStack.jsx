import React, { useRef, useEffect, useCallback } from "react";

import styles from "@/styles/TechStack.module.css";

const TechStack = () => {
    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const pngRef = useRef(null);
    const svgRefs = useRef([]);
    svgRefs.current = new Array(8)
        .fill()
        .map((_, i) => svgRefs.current[i] || React.createRef());

    const timer = useRef(); // Move timer inside the component

    const handleMouseOver = useCallback((containerRef) => {
        timer.current = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.style.animationPlayState = "paused";
            }
            svgRefs.current.forEach((ref) => {
                if (
                    ref.current &&
                    ref.current.parentNode === containerRef.current
                ) {
                    ref.current.style.animationPlayState = "paused";
                }
            });
        }, 400);
    }, []);

    const handleMouseOut = useCallback((containerRef) => {
        clearTimeout(timer.current);
        if (containerRef.current) {
            containerRef.current.style.animationPlayState = "running";
        }
        svgRefs.current.forEach((ref) => {
            if (
                ref.current &&
                ref.current.parentNode === containerRef.current
            ) {
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
        <>
            <div className={`${styles.container}`}>
                <div className={styles.svgContainer} ref={containerRef1}>
                    <div
                        ref={svgRefs.current[0]}
                        className={`${styles.tooltip} ${styles.svg} `}
                        onMouseOver={() => handleMouseOver(containerRef1)}
                        onMouseOut={() => handleMouseOut(containerRef1)}
                    >
                        <img src='/Tech/icons8-css.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>CSS3</h3>
                                <ul>
                                    <li>Style sheet language for web</li>
                                    <li>Beautiful, responsive, interactive</li>
                                    <li>Enhanced design possibilities</li>
                                </ul>
                            </div>
                            <i></i>
                        </span>
                    </div>

                    <div
                        ref={svgRefs.current[3]}
                        onMouseOver={() => handleMouseOver(containerRef1)}
                        onMouseOut={() => handleMouseOut(containerRef1)}
                        className={`${styles.tooltip} ${styles.svg}`}
                    >
                        <img src='/Tech/icons8-tailwind-css.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>TailwindCSS</h3>
                                <ul>
                                    <li>Utility-first CSS framework</li>
                                    <li>Customizable, modular, efficient</li>
                                    <li>Rapid prototyping and development</li>
                                </ul>
                            </div>
                            <i></i>
                        </span>
                    </div>
                    <div
                        ref={svgRefs.current[4]}
                        onMouseOver={() => handleMouseOver(containerRef1)}
                        onMouseOut={() => handleMouseOut(containerRef1)}
                        className={`${styles.tooltip} ${styles.svg}`}
                    >
                        <img src='/Tech/jest-svgrepo.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>Jest</h3>
                                <ul>
                                    <li>JavaScript testing framework</li>
                                    <li>Simple, fast, powerful</li>
                                    <li>Confident code quality assurance</li>
                                </ul>
                            </div>
                            <i></i>
                        </span>
                    </div>

                    <div
                        ref={svgRefs.current[6]}
                        onMouseOver={() => handleMouseOver(containerRef1)}
                        onMouseOut={() => handleMouseOut(containerRef1)}
                        className={`${styles.tooltip} ${styles.svg}`}
                    >
                        <img src='/Tech/material-ui.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>Material UI</h3>
                                <ul>
                                    <li>
                                        React components based on Material
                                        Design
                                    </li>
                                    <li>Beautiful, responsive, customizable</li>
                                    <li>
                                        Comprehensive and production-ready
                                        library
                                    </li>
                                </ul>
                                <i></i>
                            </div>
                        </span>
                    </div>
                </div>
                <div className={styles.svgContainer1} ref={containerRef2}>
                    <div
                        ref={svgRefs.current[1]}
                        onMouseOver={() => handleMouseOver(containerRef2)}
                        onMouseOut={() => handleMouseOut(containerRef2)}
                        className={`${styles.tooltip} ${styles.svg}`}
                    >
                        <img src='/Tech/icons8-firebase.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>firebase</h3>
                                <ul>
                                    <li>Backend platform for apps</li>
                                    <li>Secure, scalable, reliable</li>
                                    <li>Seamless integration with web</li>
                                </ul>
                            </div>
                            <i></i>
                        </span>
                    </div>
                    <div
                        className={`${styles.tooltip} ${styles.svg}`}
                        ref={svgRefs.current[2]}
                        onMouseOver={() => handleMouseOver(containerRef2)}
                        onMouseOut={() => handleMouseOut(containerRef2)}
                    >
                        <img src='/Tech/icons8-nextjs.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>Next.js</h3>
                                <ul>
                                    <li>React framework for web</li>
                                    <li>Fast, easy, versatile</li>
                                    <li>Enjoyable development experience</li>
                                </ul>
                            </div>
                            <i></i>
                        </span>
                    </div>
                    <div
                        ref={svgRefs.current[5]}
                        onMouseOver={() => handleMouseOver(containerRef2)}
                        onMouseOut={() => handleMouseOut(containerRef2)}
                        className={`${styles.tooltip} ${styles.svg}`}
                    >
                        <img src='/Tech/i18next.svg' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>I18next</h3>
                                <ul>
                                    <li>
                                        Internationalization framework for
                                        JavaScript
                                    </li>
                                    <li>Learn once, translate everywhere</li>
                                    <li>
                                        Complete translation solution for web,
                                        mobile and desktop
                                    </li>
                                </ul>
                            </div>
                            <i></i>
                        </span>
                    </div>
                    <div
                        ref={svgRefs.current[7]}
                        onMouseOver={() => handleMouseOver(containerRef2)}
                        onMouseOut={() => handleMouseOut(containerRef2)}
                        className={`${styles.tooltip} ${styles.svg}`}
                    >
                        <img src='/Tech/DaisyUi.webp' />
                        <span className={styles.right}>
                            <div className={styles.textContent}>
                                <h3>daisyUI</h3>
                                <ul>
                                    <li>Tailwind CSS component library</li>
                                    <li>No JavaScript, pure CSS</li>
                                    <li>Cute and functional design</li>
                                </ul>
                                <i></i>
                            </div>
                        </span>
                    </div>
                </div>
                <img
                    className={styles.png}
                    src='/Tech/techstack.png'
                    ref={pngRef}
                />
            </div>
        </>
    );
};

export default TechStack;
