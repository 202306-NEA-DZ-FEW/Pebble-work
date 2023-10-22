import React, { useState, useEffect } from "react";
import styles from "@/styles/Pebble.module.css";

const Pebble = () => {
    const [isWaveVisible, setIsWaveVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsWaveVisible((prevIsWaveVisible) => !prevIsWaveVisible);
        }, 6000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div
            className={`${
                isWaveVisible ? styles.wave : styles.nowave
            } flex flex-row gap-1 lg:text-[18px] sm:text-[16px] text-[14px]`}
        >
            <span style={{ "--i": 1 }} className={styles.letter}>
                P
            </span>
            <span style={{ "--i": 2 }} className={styles.letter}>
                E
            </span>
            <span style={{ "--i": 3 }} className={styles.letter}>
                B
            </span>
            <span style={{ "--i": 4 }} className={styles.letter}>
                B
            </span>
            <span style={{ "--i": 5 }} className={styles.letter}>
                L
            </span>
            <span style={{ "--i": 6 }} className={styles.letter}>
                E
            </span>
        </div>
    );
};

export default Pebble;
