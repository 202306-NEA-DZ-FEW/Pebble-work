import React from "react";
import { useTranslation } from "next-i18next";
import styles from "@/styles/Homepage.module.css";

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
                        <div className='cursor-pointer'>
                            <button
                                className={`buttonTransition text-2xl font-medium leading-10 tracking-tight text-white px-4 py-2 rounded-lg`}
                                onClick={() =>
                                    handleButtonClick("/target-page-1")
                                }
                            >
                                {t("common:heroCard:getStarted")}
                            </button>
                        </div>
                        <div className='cursor-pointer'>
                            <div
                                className='text-2xl font-medium leading-10 tracking-tight text-zinc-900'
                                onClick={() =>
                                    handleButtonClick("/target-page-2")
                                }
                            >
                                {t("common:heroCard:whoWeAre")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroCard;
