import React from "react";

const SocialCardData = [
    {
        name: "Emilia W.",
        occupation: "Volunteer",
        text: "Thanks to PebbleWork I'm able to make a positive impact on my community and the people around me. I'm thankful to have a website where we can all come together and TRULY change things.",
        imageSrc: "./images/icon_default.png",
    },
    {
        name: "Mubashir Aazar",
        occupation: "Beyrouth Youth Club rep.",
        text: " I must commend Pebble Work for being a game-changer in our mission for positive community impact. Kudos to Pebble Work for providing us with the tools to transform our vision into meaningful actions.",
        imageSrc: "./images/Aazar_BYC.png",
    },
    {
        name: "Ali",
        occupation: "occupation",
        text: "This is the third testimonial. Yet another testimonial here.",
        imageSrc: "./images/icon_default.png",
    },
];

const SocialCardSection = () => {
    return (
        <div className=' w-full max-w-[1440px] px-5 md:px-[123px] lg:px-[127px] bg-white bg-opacity-50 flex flex-wrap justify-center items-center gap-10 py-8 rounded-md'>
            <div className='w-full text-center text-[#2E72AA] text-4xl font-medium leading-[44px] tracking-tight'>
                Hear it from our volunteers
            </div>
            {SocialCardData.map((SocialCard, index) => (
                <div
                    key={index}
                    className='bg-white p-3 rounded-xl w-full md:w-1/3 lg:w-1/4 flex flex-col items-center gap-5'
                >
                    <img
                        loading='lazy'
                        className='w-20 h-20 rounded-full'
                        src={SocialCard.imageSrc}
                        alt={`Image ${index}`}
                    />
                    <div className='w-full text-center'>
                        <div className='text-zinc-900 text-xl md:text-lg lg:text-xl font-medium leading-[30px] tracking-tight'>
                            {SocialCard.name}
                            <br />
                            <span className='italic font-normal text-[#2E72AA]'>
                                {SocialCard.occupation}
                            </span>
                        </div>
                        <div className='text-zinc-500 text-base md:text-md lg:text-lg font-normal leading-[30px] tracking-tight'>
                            {SocialCard.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialCardSection;
