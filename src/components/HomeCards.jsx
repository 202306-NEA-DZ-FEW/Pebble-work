import React from "react";

import GalleryCard from "@/components/Homecards/GalleryCard";
import HeaderCard from "@/components/Homecards/HeaderCard";
import HeroCard from "@/components/Homecards/HeroCard";
import ImageSquareCard from "@/components/Homecards/ImageSquareCard";
import MainCard from "@/components/Homecards/MainCard";
import SocialCard from "@/components/Homecards/SocialCard";

const CardContainer = ({ children }) => (
    <div className='mb-8 sm:mb-12 md:mb-16 lg:mb-20'>{children}</div>
);

const Heading = ({ text }) => (
    <h2 className='text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16'>{text}</h2>
);

const HomeCards = () => {
    return (
        <div className='container xl:mt-24 xl:pt-0 pt-20 flex flex-col items-center justify-center mx-auto'>
            <HeaderCard />

            <Heading text='How It Works' />
            <MainCard />

            <Heading text='Sustainable Development' />
            <GalleryCard />

            <Heading text='Hear It from Volunteers' />
            <p className='mt-4 sm:mt-8 md:mt-12 lg:mt-16'>sentences here...</p>

            <div className='mb-8 sm:mb-12 md:mb-16 lg:mb-20'>
                <SocialCard />
            </div>

            <div className='mb-8 sm:mb-12 md:mb-16 lg:mb-20'>
                <ImageSquareCard />
            </div>

            <HeroCard />
        </div>
    );
};

export default HomeCards;
