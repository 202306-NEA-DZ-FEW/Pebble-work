import React from "react";
import { useRouter } from "next/router";

const Test = ({
    eventId,
    title,
    type,
    image,
    location,
    date,
    time,
    description,
}) => {
    const router = useRouter();
    const handleReviewClick = () => {
        router.push(`/events/${eventId}`);
    };
    return (
        <div className='flex flex-col justify-center text-black items-center'>
            <h1>{title}</h1>
            <div
                className='w-[250px] h-[250px]'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <p className='text-end'>avatars</p>
                <h3>{location}</h3>
                <h3>{date}</h3>
                <h3>{time}</h3>
            </div>
            <h2 className='w-[250px] h-[30px] text-center'>{type}</h2>
            <button
                className={`w-[250px] h-[30px] bg-blue-400 hover:bg-blue-500 text-white text-[14px] rounded-[4px]`}
                onClick={handleReviewClick}
            >
                Review
            </button>
        </div>
    );
};

export default Test;
