import React from "react";
import { useRouter } from "next/router";

const MobileCard = (
    eventId,
    title,
    type,
    image,
    location,
    date,
    time,
    description
) => {
    const router = useRouter();
    const handleReviewClick = () => {
        router.push(`/events/${eventId}`);
    };
    return (
        <div className='flex flex-col justify-center items-center'>
            <div
                className='w-[250px] h-[250px]'
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                <p className='text-end'>avatars</p>
            </div>
            <h1 className='w-[250px] h-[30px] text-center'>title</h1>
            <button
                className={`w-[250px] h-[30px] bg-blue-400 hover:bg-blue-500 text-white text-[14px] rounded-[4px]`}
                onClick={handleReviewClick}
            >
                Review
            </button>
        </div>
    );
};

export default MobileCard;
