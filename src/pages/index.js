import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Profile from "@/pages/profile/index";

export default function HomePage() {
    return <Profile />;
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
