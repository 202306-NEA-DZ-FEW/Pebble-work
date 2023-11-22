import Bubble from "@/components/Chat/Bubble";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const MorphingSvg = () => (
    <>
        <div className='min-h-screen'>
            <Bubble />
        </div>
    </>
);

export default MorphingSvg;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
