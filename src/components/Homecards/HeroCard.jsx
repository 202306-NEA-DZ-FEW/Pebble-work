import React from "react";
import { useTranslation } from "next-i18next";

function HeroCard() {
    const { t } = useTranslation();

    const handleButtonClick = (path) => {
        window.location.href = path;
    };

    return (
        <div className='w-full h-[720px] xl:mt-[-300px] md:mt-[-400px] sm:mt-[-500px] mt-[-250px] bg-white flex justify-center items-center'>
            <div className='text-center p-4'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className="text-4xl font-medium font-'Rubik' leading-10 tracking-tight text-zinc-900">
                        {t("common:heroCard:title")}
                    </div>
                    <div className="text-xl font-normal font-'Rubik' leading-10 tracking-tight text-zinc-500">
                        {t("common:heroCard:description")}
                    </div>
                    <div className='mt-8 flex flex-col sm:flex-row justify-center items-center gap-6'>
                        <div className='cursor-pointer'>
                            <div
                                className="text-2xl font-medium font-'Rubik' leading-10 tracking-tight bg-cyan-700 text-white px-4 py-2 rounded-lg"
                                onClick={() =>
                                    handleButtonClick("/target-page-1")
                                }
                            >
                                {t("common:heroCard:getStarted")}
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <div
                                className="text-2xl font-medium font-'Rubik' leading-10 tracking-tight text-zinc-900"
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
