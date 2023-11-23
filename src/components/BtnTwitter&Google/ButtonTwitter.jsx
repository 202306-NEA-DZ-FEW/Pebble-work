import { useTranslation } from "next-i18next"; // Import useTranslation
import React from "react";
import { RiTwitterXFill } from "react-icons/ri";

const ButtonTwitter = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <button
            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
            style={{ height: "40px", width: "300px" }}
            onClick={onClick}
        >
            <RiTwitterXFill className='ml-2 mr-1' />
            <span>{t("common:button:continueWithTwitter")}</span>
        </button>
    );
};

export default ButtonTwitter;
