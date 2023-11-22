import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

function HeroCard() {
    const { t } = useTranslation();

    return (
        <div className='w-full  sm:h-[400px] flex justify-center items-center'>
            <div className='text-center p-4'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className='text-4xl font-medium leading-10 tracking-tight text-zinc-900 mb-5'>
                        {t("common:heroCard:title")}
                    </div>
                    <div className='text-xl font-normal leading-10 tracking-tight text-zinc-500 mb-5'>
                        {t("common:heroCard:description")}
                        <Link
                            href={`https://studentsstore.vercel.app`}
                            target='_BLANK'
                        >
                            <span className='font-semibold text-[#2E7EAA]'>
                                {t("common:heroCard:link")}
                            </span>
                        </Link>
                        {t("common:heroCard:description2")}
                    </div>
                    <div className=' flex flex-col sm:flex-row justify-center items-center gap-6'>
                        <Link
                            href='/signup'
                            className={`buttonTransition text-[22px] font-medium leading-10 tracking-tight text-white px-4 py-2 rounded-lg`}
                        >
                            {t("common:heroCard:getStarted")}
                        </Link>

                        <Link
                            href='/about'
                            className={`secondButton text-[2xl] font-medium leading-10 tracking-tight text-zinc-900`}
                        >
                            {t("common:heroCard:whoWeAre")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroCard;
