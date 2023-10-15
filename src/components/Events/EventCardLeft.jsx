import React from "react";
import styles from "@/styles/EventCard.module.css";

const EventCardLeft = () => {
    return (
        <>
            <div
                className={`${styles.container} overflow-hidden w-[335px] h-[86px] xl:w-[816px] xl:h-[210px] sm:w-[466px] sm:h-[140px] flex flex-row-reverse items-center justify-center border border-black rounded-[20px] gap-2`}
            >
                <div className={`flex flex-col gap-1 sm:gap-4 `}>
                    <h1
                        className='xl:text-[25.70px] sm:text-[15px] text-[10.55px]'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            letterSpacing: "0.11px",
                            wordWrap: "break-word",
                        }}
                    >
                        CHRISTMAS TREE
                    </h1>

                    <p
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 400",
                            letterSpacing: "0.06px",
                            wordWrap: "break-word",
                        }}
                        className={`${styles.information} xl:leading-[17px] md:leading-[14px] leading-[10px] h-[26.2px] w-[214px] xl:w-[520px] xl:h-[63px] sm:w-[297px] sm:h-[37px] overflow-y-scroll xl:text-[15px] sm:text-[10.20px] text-[10px]`}
                    >
                        Let s spread the joy, here is Christmas, the most
                        awaited day of the year. Christmas Tree is what one
                        needs the most. Here is the perfect tree that will
                        enhance your Christmas
                    </p>

                    <button
                        className={`w-[52px] xl:text-[15px] md:text-[12px] bg-blue-400 text-white text-[10px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px]`}
                    >
                        Join
                    </button>
                </div>
                <div
                    className={`${styles.productImage} xl:w-[244px] xl:h-[143px] sm:w-[139px] sm:h-[82px] w-[100px] h-[58px] `}
                >
                    <img
                        className={`{${styles.contaiImg} `}
                        src='https://images.unsplash.com/photo-1606830733744-0ad778449672?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNocmlzdG1hcyUyMHRyZWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                        alt='Product Image'
                    />
                    <div className={`${styles.info1}`}>
                        <h2 className='sm:text-[13px] text-[10px] xl:text-[22.22px] underline'>
                            Description
                        </h2>
                        <ul
                            className={`xl:text-[18.20px] text-[8px] leading-[10px] md:leading-[15px] xl:leading-[20px] sm:text-[10.20px]`}
                        >
                            <li>
                                <strong>Location:</strong> 5 Ft
                            </li>
                            <li>
                                <strong>Day:</strong> Olive green
                            </li>
                            <li>
                                <strong>Time:</strong> balls and bells
                            </li>
                            <li>
                                <strong>TimeZone:</strong> Eco-Friendly
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EventCardLeft;
