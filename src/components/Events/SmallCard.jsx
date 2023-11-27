import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SmallCard = ({ eventId, title, type, image }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const router = useRouter();
    const { t } = useTranslation(); // Initialize useTranslation

    const handleReviewClick = () => {
        router.push(`/events/${eventId}`);
    };
    return (
        <div
            style={{
                color: "black",
            }}
            className='flex flex-col justify-center text-black items-center'
        >
            <h1 className='flex items-center text-center font-[600] pl-3 h-[50px]'>
                {title}
            </h1>
            {!imageLoaded && <CircularProgress />}
            <img
                src={image}
                style={{ display: "none" }}
                onLoad={() => setImageLoaded(true)}
            />
            <div
                className='w-[250px] h-[250px] font-[300] rounded-t-[6px]'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.5s",
                }}
            ></div>
            <h2 className='w-[250px] bg-white h-[30px] text-center font-[400]'>
                {type}
            </h2>
            <button
                className={`w-[250px] h-[30px] bg-[#2E7EAA] text-white text-[14px] rounded-b-[6px]`}
                onClick={handleReviewClick}
            >
                {t("events:reviewButton")}
            </button>
        </div>
    );
};

export default SmallCard;
