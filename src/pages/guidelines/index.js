import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";

import { Heading } from "@/components/HomeCards";

function Guidelines() {
    const { t } = useTranslation();

    const Subtitle = ({ text }) => (
        <h3 className='text-center lg:text-[28px] md:text-[24px] sm:text-[20px] text-[18px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
            {text}
        </h3>
    );

    const Title = ({ text }) => (
        <h3 className='text-center lg:text-[30px] md:text-[28px] sm:text-[24px] text-[20px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
            {text}
        </h3>
    );

    return (
        <>
            <Heading text={t("guidline:communityGuidelines")} />
            <img src='/images/Guidelines.png' />

            <div className='px-5 mx-4 text-lg'>{t("guidline:introText")}</div>
            <div className='px-5 mx-4 text-lg mt-2'>
                {t("guidline:guidelinesText")}
            </div>

            <Title text={t("guidline:eventCreation")} />
            <div className='text-center px-5'>
                {t("guidline:eventCreationText")}
            </div>

            <div className='flex flex-row flex-wrap mb-[5rem] px-5'>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text={t("guidline:transparency")} />
                    {t("guidline:transparencyText")}
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text={t("guidline:genuineInteraction")} />
                    {t("guidline:genuineInteractionText")}
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text={t("guidline:host")} />
                    {t("guidline:hostText")}
                </div>
            </div>

            <hr />

            <Title text={t("guidline:codeOfConduct")} />
            <div className='text-center px-5 '>
                {t("guidline:codeOfConductText")}
            </div>

            <div className='flex flex-row flex-wrap mb-[5rem] px-5'>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text={t("guidline:hatefulContent")} />
                    {t("guidline:hatefulContentText")}
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text={t("guidline:misinformation")} />
                    {t("guidline:misinformationText")}
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text={t("guidline:respectfulInteractions")} />
                    {t("guidline:respectfulInteractionsText")}
                </div>
            </div>
            <hr />
            <div className='px-5 mx-4 text-lg mt-[3rem] mb-5'>
                <b>{t("guidline:reportingViolations")}:</b> <br />
                {t("guidline:reportingViolationsText")}
            </div>
        </>
    );
}

export default Guidelines;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "about",
                "guidline",
            ])),
            // Will be passed to the page component as props
        },
    };
}
