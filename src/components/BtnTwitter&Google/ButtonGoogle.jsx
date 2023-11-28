import { useTranslation } from "next-i18next"; // Import useTranslation
import React from "react";
import { FcGoogle } from "react-icons/fc";

const BtnGoogle = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <button
            className=' border px-4 py-2 mb-2 rounded-md shadow-md hover:opacity-80 flex items-center justify-center'
            style={{ height: "40px", width: "300px" }}
            onClick={onClick}
        >
            <FcGoogle className='ml-2 mr-1' />
            <span>{t("common:buttons:continueWithGoogle")}</span>
        </button>
    );
};

export default BtnGoogle;
