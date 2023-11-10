import React from "react";

import styles from "@/styles/TechStack.module.css";

const TechStack = () => {
    return (
        <div className={`z-10 ${styles.container}`}>
            <div className={`${styles.tooltip} ${styles.svg}`}>
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
            <div className={`${styles.tooltip} ${styles.svg}`}>
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
            <img className={styles.png} src='/Tech/techstack.png' />
            <div className={`${styles.tooltip} ${styles.svg}`}>
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
            <div className={`${styles.tooltip} ${styles.svg}`}>
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
