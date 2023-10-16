import React from "react";
import styles from "@/styles/Loader.module.css";

const Loader = () => {
    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.candles}`}>
                <div className={`${styles.lightWave}`}></div>
                <div className={`${styles.candle1}`}>
                    <div className={`${styles.candle1Body}`}>
                        <div className={`${styles.candle1Eyes}`}>
                            <span className={`${styles.candle1EyesOne}`}></span>
                            <span className={`${styles.candle1EyesTwo}`}></span>
                        </div>
                        <div className={`${styles.candle1Mouth}`}></div>
                    </div>
                    <div className={`${styles.candle1Stick}`}></div>
                </div>

                <div className={`${styles.candle2}`}>
                    <div className={`${styles.candle2Body}`}>
                        <div className={`${styles.candle2Eyes}`}>
                            <div className={`${styles.candle2EyesOne}`}></div>
                            <div className={`${styles.candle2EyesTwo}`}></div>
                        </div>
                    </div>
                    <div className={`${styles.candle2Stick}`}></div>
                </div>
                <div className={`${styles.candle2Fire}`}></div>
                <div className={`${styles.sparklesOne}`}></div>
                <div className={`${styles.sparklesTwo}`}></div>
                <div className={`${styles.candleSmokeOne}`}></div>
                <div className={`${styles.candleSmokeTwo}`}></div>
            </div>
            <div className={`${styles.floor}`}></div>
        </div>
    );
};

export default Loader;
