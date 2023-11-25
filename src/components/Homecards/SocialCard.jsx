import { useTranslation } from "next-i18next";
import React from "react";

const SocialCardData = [
    {
        name: "Mubashir Aazar",
        occupation: "Beyrouth Youth Club rep.",
        text: " I must commend Pebble Work for being a turning point in our mission for helping our community and making sustainable impact. Kudos to Pebble Work for providing us with a platform where we can all come together, turn our vision into actions, and TRULY change things.",
        imageSrc: "./images/Aazar_BYC.png",
    },
    {
        name: "Menar S.",
        occupation: "Volunteer",
        text: "Pebble Work is a beacon of hope, using events to tackle humanitarian crises like poverty and water scarcity. Their impactful initiatives inspire change and prove that small actions can create significant ripples of positive impact. Proud to be part of a community dedicated to making the world a better place through meaningful events.",
        imageSrc: "./images/NotQuby.png",
    },
    {
        name: "Hiba M.",
        occupation: "Volunteer",
        text: "Pebble Work has been a total game-changer for me in making a positive impact on our community. The tools they provide have turned our ideas into real actions, helping us make a difference. I'm grateful for the chance Pebble Work has given us to contribute meaningfully.",
        imageSrc: "https://avatars.githubusercontent.com/u/58190902?v=4",
    },
];

const SocialCardSection = () => {
    const { t } = useTranslation();

    return (
        <div className=' w-full max-w-[1440px] px-5 md:px-[123px] lg:px-[127px] bg-white bg-opacity-50 flex flex-wrap justify-center items-center gap-10 py-8 rounded-md'>
            <div className='w-full text-center text-[#2E72AA] text-4xl font-medium leading-[44px] tracking-tight'>
                {t("social.volunteerTestimony")}
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
