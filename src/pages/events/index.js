import useMediaQuery from "@mui/material/useMediaQuery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import DesktopEvents from "@/components/Events/DesktopEvents";
import MobileEvents from "@/components/Events/MobileEvents";
import SmallScreenEvents from "@/components/Events/SmallScreenEvents";

const EventsPage = () => {
    const isDesktop = useMediaQuery("(min-width:1080px)");
    const isMobile = useMediaQuery("(min-width:640px)");

    let ComponentToRender;

    if (isDesktop) {
        ComponentToRender = DesktopEvents;
    } else if (isMobile) {
        ComponentToRender = MobileEvents;
    } else {
        ComponentToRender = SmallScreenEvents;
    }

    return (
        <>
            <div>
                <ComponentToRender />
            </div>
        </>
    );
};

export default EventsPage;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "about",
                "eventCreation",
                "events",
            ])),
            // Will be passed to the page component as props
        },
    };
}
