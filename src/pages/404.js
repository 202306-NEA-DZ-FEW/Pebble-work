import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

export default function NotFoundPage() {
    return (
        <div className='flex justify-center'>
            <Image src='/images/404.png' alt='404' width={800} height={800} />
        </div>
    );
}
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "about",
                "events",
                "eventCreation",
            ])),
            // Will be passed to the page component as props
        },
    };
}
