import React from "react";
import { useTranslation } from "next-i18next";
import GalleryCard from "@/components/Homecards/GalleryCard";
import HeaderCard from "@/components/Homecards/HeaderCard";
import HeroCard from "@/components/Homecards/HeroCard";
import ImageSquareCard from "@/components/Homecards/ImageSquareCard";
import MainCard from "@/components/Homecards/MainCard";
import SocialCard from "@/components/Homecards/SocialCard";
import ContactForm from "./ContactUs";

const CardContainer = ({ children }) => <div className=''>{children}</div>;

export const Heading = ({ text }) => {
    const { t } = useTranslation();

    return (
        <h2 className='text-center lg:text-[36px] md:text-[28px] sm:text-[22px] text-[18px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
            {t(text)}
        </h2>
    );
};

const HomeCards = () => {
    const { t } = useTranslation();

    return (
        <div className='container overflow-hidden flex flex-col items-center justify-center mx-auto'>
            <HeaderCard />

            <Heading />
            <p
                className='mt-4 sm:mt-8 md:mt-12 lg:mt-16'
                style={{ fontSize: "42px", color: "black" }}
            >
                {t("common:homeCards:howItWorks")}
            </p>
            <MainCard />

            <Heading />
            <p
                className='mt-4 sm:mt-8 md:mt-12 lg:mt-16'
                style={{ fontSize: "42px", color: "black" }}
            >
                {t("common:homeCards:sustainableDevelopmentGoals")}
            </p>
            <p className='mt-4 sm:mt-8 md:mt-12 lg:mt-16'>
                {t("common:homeCards:introductorySentence")}
            </p>
            <GalleryCard />

            <p className='mt-4 sm:mt-8 md:mt-12 lg:mt-16'></p>
            <div className='xl:h-[420px] lg:h-[420px] sm:mb-20'>
                <SocialCard />
            </div>

            <div className='lg:pt-20 overflow-hidden sm:mt-[-80px] pt-40 sm:pt-0 pb-40'>
                <ImageSquareCard />
            </div>

            <HeroCard />
            <ContactForm />
        </div>
    );
};

export default HomeCards;
