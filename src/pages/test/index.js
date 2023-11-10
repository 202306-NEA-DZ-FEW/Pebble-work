import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./TechStack.module.css";

const TechStack = () => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.tooltip} ${styles.svg}`}>
                <img src='/Tech/icons8-css.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>Fade in Effect</h3>
                        <ul>
                            <li>This demo has fade in/out effect.</li>
                            <li>
                                It is using CSS opacity, visibility, and
                                transition property to toggle the tooltip.
                            </li>
                            <li>
                                Other demos are using display property
                                <em>(none or block)</em> for the toggle.
                            </li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
            <div className={`${styles.tooltip} ${styles.svg}`}>
                <img src='/Tech/icons8-firebase.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>Fade in Effect</h3>
                        <ul>
                            <li>This demo has fade in/out effect.</li>
                            <li>
                                It is using CSS opacity, visibility, and
                                transition property to toggle the tooltip.
                            </li>
                            <li>
                                Other demos are using display property
                                <em>(none or block)</em> for the toggle.
                            </li>
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
                        <h3>Fade in Effect</h3>
                        <ul>
                            <li>This demo has fade in/out effect.</li>
                            <li>
                                It is using CSS opacity, visibility, and
                                transition property to toggle the tooltip.
                            </li>
                            <li>
                                Other demos are using display property
                                <em>(none or block)</em> for the toggle.
                            </li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
            <div className={`${styles.tooltip} ${styles.svg}`}>
                <img src='/Tech/icons8-tailwind-css.svg' />
                <span className={styles.right}>
                    <div className='text-content'>
                        <h3>Fade in Effect</h3>
                        <ul>
                            <li>This demo has fade in/out effect.</li>
                            <li>
                                It is using CSS opacity, visibility, and
                                transition property to toggle the tooltip.
                            </li>
                            <li>
                                Other demos are using display property
                                <em>(none or block)</em> for the toggle.
                            </li>
                        </ul>
                    </div>
                    <i></i>
                </span>
            </div>
        </div>
    );
};

export default TechStack;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
