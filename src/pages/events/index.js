import React from "react";
import MobileEvents from "@/components/Events/MobileEvents";
import DesktopEvents from "@/components/Events/DesktopEvents";
import useMediaQuery from "@mui/material/useMediaQuery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const EventsPage = () => {
    const matches = useMediaQuery("(min-width:1000px)");
    return (
        <>
            <div>{matches ? <DesktopEvents /> : <MobileEvents />}</div>
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
