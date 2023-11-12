import React, { useRef, useState, useEffect, useCallback } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Test from "@/components/Cards/Aboutus/Test";

export default function App() {
    return (
        <>
            <div className='flex self-center min-w-screen min-h-screen'>
                <Test />
            </div>
        </>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
