import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Signup = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <Link className='flex items-center justify-center' href='/signup'>
                <button
                    className={`w-[52px] bg-[#2E7EAA] text-white text-[10px] hover:bg-[#749D60] xl:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px]`}
                >
                    {t("common:sign:signup")}
                </button>
            </Link>
        </>
    );
};

export default Signup;
