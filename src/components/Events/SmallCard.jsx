import React from "react";
import { useRouter } from "next/router";

const MobileCard = ({ eventId, title, type, image, location, date, time }) => {
    const router = useRouter();
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
            <h1 className='font-[600]'>{title}</h1>
            <div
                className='w-[250px] h-[250px] font-[300] rounded-t-[6px]'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <p className='text-end'>avatars</p>
                <h3 className='font-[400] ml-2'>{location}</h3>
                <h3 className='font-[400] ml-2'>{date}</h3>
                <h3 className='font-[400] ml-2'>{time}</h3>
            </div>
            <h2 className='w-[250px] h-[30px] text-center font-[400]'>
                {type}
            </h2>
            <button
                className={`w-[250px] h-[30px] bg-[#749D60] text-white text-[14px] rounded-b-[6px]`}
                onClick={handleReviewClick}
            >
                Review
            </button>
        </div>
    );
};

export default MobileCard;
