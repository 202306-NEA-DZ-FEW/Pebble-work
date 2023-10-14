import React from "react";
import styles from "@/styles/EventCard.module.css";

const EventCard = () => {
    return (
        <>
            <div
                className={`${styles.container} xl:w-[816px] xl:h-[210px] w-[466px] h-[140px] flex flex-row items-center justify-center border border-black rounded-[20px] gap-2`}
            >
                <div className={`flex flex-col gap-4 items-end `}>
                    <h1
                        className='xl:text-[25.70px] md:text-[15px]'
                        style={{
                            color: "#1A1A1A",
                            fontFamily: "Rubik",
                            fontWeight: " 500",
                            lineHeight: "25.82px",
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
                            lineHeight: "17.6px",
                            letterSpacing: "0.06px",
                            wordWrap: "break-word",
                        }}
                        className={`${styles.information} xl:w-[520px] xl:h-[63px] md:w-[297px] md:h-[37px] overflow-y-scroll xl:text-[15px] md:text-[10.20px]`}
                    >
                        Let s spread the joy, here is Christmas, the most
                        awaited day of the year. Christmas Tree is what one
                        needs the most. Here is the perfect tree that will
                        enhance your Christmas
                    </p>

                    <button
                        className={`${styles.btn} ${styles.control} xl:w-[127px] xl:h-[41px] md:w-[72.23px] md:h-[25.5px]`}
                    >
                        <span className={`${styles.infor} text-red-600 pl-2`}>
                            avatar
                        </span>

                        <span
                            className={`${styles.buy} xl:text-[20.66px] md:text-[15px]`}
                        >
                            attendees
                        </span>
                    </button>
                </div>
                <div
                    className={`${styles.productImage} xl:w-[244px] xl:h-[143px] md:w-[139px] md:h-[82px]`}
                >
                    <img
                        className={`{${styles.contaiImg}`}
                        src='https://images.unsplash.com/photo-1606830733744-0ad778449672?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNocmlzdG1hcyUyMHRyZWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                        alt='Product Image'
                    />
                    <div className={`${styles.info}`}>
                        <h2 className='md:text-[13px] xl:text-[22.22px]'>
                            Description
                        </h2>
                        <ul className={`xl:text-[18.20px] md:text-[10.20px]`}>
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
export default EventCard;
