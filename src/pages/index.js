import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import HomeCards from "@/components/HomeCards";

export default function HomePage() {
    return (
        <main>
            <HomeCards /> {/* Render the HomeCards component here */}
            <i class='fa-solid fa-language fa-2xl'></i>
        </main>
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
