import React from "react";
import { useTranslation } from "next-i18next";
import GalleryCard from "@/components/Homecards/GalleryCard";
import HeaderCard from "@/components/Homecards/HeaderCard";
import HeroCard from "@/components/Homecards/HeroCard";
import ImageSquareCard from "@/components/Homecards/ImageSquareCard";
import MainCard from "@/components/Homecards/MainCard";
import SocialCard from "@/components/Homecards/SocialCard";
import ContactForm from "./ContactUs";
import Wave from "./Wave";
import styles from "@/styles/Homepage.module.css";

export const Heading = ({ text }) => {
    const { t } = useTranslation();

    return (
        <h2 className='text-center lg:text-[36px] md:text-[28px] sm:text-[22px] text-[18px] text-black font-[500]'>
            {t(text)}
        </h2>
    );
};

const HomeCards = () => {
    const { t } = useTranslation();

    return (
        <div className='container overflow-hidden flex flex-col items-center justify-center mx-auto'>
            <div className='overflow-hidden p-2'>
                <HeaderCard />
            </div>

            <p className='lg:text-[42px] sm:text-[32px] font-[500] text-black'>
                {t("common:homeCards:howItWorks")}
            </p>
            <MainCard />

            <p style={{ fontSize: "42px", color: "black" }}>
                {t("common:homeCards:sustainableDevelopmentGoals")}
            </p>
            <p>{t("common:homeCards:introductorySentence")}</p>
            <div className='p-2 overflow-hidden'>
                <GalleryCard />
            </div>

            <p></p>
            <div className='xl:h-[420px] p-2 lg:h-[420px] '>
                <SocialCard />
            </div>

            <div className='p-2'>
                <ImageSquareCard />
            </div>
            <div
                className={`w-screen flex flex-col items-center justify-center  ${styles.components}`}
            >
                <HeroCard />

                <div className={styles.blur}>
                    <Wave />
                </div>
                <div className='sm:w-[600px] shadow-inner w-[95vw]'>
                    {" "}
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default HomeCards;
