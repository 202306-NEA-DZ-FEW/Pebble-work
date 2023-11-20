import React from "react";
import { useTranslation } from "react-i18next";

function EditEvent() {
    const { t } = useTranslation();

    return (
        <>
            <div
                className={`bg-center bg-no-repeat w-screen h-[600px] `}
                style={{
                    backgroundImage: `url('/images/noAccess.jpg')`,
                    backgroundSize: "contain",
                }}
            >
                <p className='text-center text-xl text-red-600 px-5'>
                    {t("events:noPermissionsMessage")}
                </p>
            </div>

            <div className='flex justify-center items-center mb-6'>
                <button
                    className='text-center mb-[2rem] cursor-pointer text-2xl font-medium leading-10 tracking-tight bg-cyan-700 text-white px-4 py-2 rounded-lg'
                    onClick={() => (window.location.href = `/`)}
                >
                    {t("events:homepageButton")}
                </button>
            </div>
        </>
    );
}

export default EditEvent;
