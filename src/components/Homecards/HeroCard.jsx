import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

function HeroCard() {
    const { t } = useTranslation();

    const handleButtonClick = (path) => {
        window.location.href = path;
    };

    return (
        <div className='w-full shadow-md sm:h-[400px] flex justify-center items-center'>
            <div className='text-center p-4'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className='text-4xl font-medium leading-10 tracking-tight text-zinc-900'>
                        {t("common:heroCard:title")}
                    </div>
                    <div className='text-xl font-normal leading-10 tracking-tight text-zinc-500'>
                        {t("common:heroCard:description")}
                    </div>
                    <div className=' flex flex-col sm:flex-row justify-center items-center gap-6'>
                        <Link
                            href='/signup'
                            className={`buttonTransition text-2xl font-medium leading-10 tracking-tight text-white px-4 py-2 rounded-lg`}
                        >
                            {t("common:heroCard:getStarted")}
                        </Link>

                        <Link
                            href='/guidelines'
                            className={`secondButton text-2xl font-medium leading-10 tracking-tight text-zinc-900`}
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
