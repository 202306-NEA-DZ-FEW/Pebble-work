import React from "react";

import GalleryCard from "@/components/Homecards/GalleryCard";
import HeaderCard from "@/components/Homecards/HeaderCard";
import HeroCard from "@/components/Homecards/HeroCard";
import ImageSquareCard from "@/components/Homecards/ImageSquareCard";
import MainCard from "@/components/Homecards/MainCard";
import SocialCard from "@/components/Homecards/SocialCard";

const CardContainer = ({ children }) => <div className=''>{children}</div>;

const Heading = ({ text }) => (
    <h2 className='text-center lg:text-[36px] md:text-[28px] sm:text-[22px] text-[18px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
        {text}
    </h2>
);

const HomeCards = () => {
    return (
        <div className='container overflow-hidden flex flex-col items-center justify-center mx-auto'>
            <HeaderCard />

            <Heading text='How It Works' />
            <MainCard />

            <Heading text='Sustainable Development Goals' />
            <GalleryCard />

            <Heading text='Hear It from Volunteers' />
            <p className='mt-4 sm:mt-8 md:mt-12 lg:mt-16'>sentences here...</p>

            <div className='xl:h-[420px] lg:h-[420px] sm:mb-20 '>
                <SocialCard />
            </div>

            <div className='lg:pt-20 overflow-hidden sm:mt-[-80px] pt-40 sm:pt-0 pb-40'>
                <ImageSquareCard />
            </div>

            <HeroCard />
        </div>
    );
};

export default HomeCards;
