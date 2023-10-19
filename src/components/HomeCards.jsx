import React from "react";

import GalleryCard from "./HomeCards/GalleryCard";
import HeaderCard from "./HomeCards/HeaderCard";
import HeroCard from "./HomeCards/HeroCard";
import ImageSquareCard from "./HomeCards/ImageSquareCard";
import MainCard from "./HomeCards/MainCard";
import SocialCard from "./HomeCards/SocialCard";

const CardContainer = ({ children }) => (
    <div className='mb-8 sm:mb-12 md:mb-16 lg:mb-20'>{children}</div>
);

const Heading = ({ text }) => (
    <h2 className='text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16'>{text}</h2>
);

const HomeCards = () => {
    return (
        <div className='container mx-auto'>
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
