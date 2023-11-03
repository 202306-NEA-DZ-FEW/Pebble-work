import React from "react";
import MobileEvents from "@/components/Events/MobileEvents";
import DesktopEvents from "@/components/Events/DesktopEvents";
import useMediaQuery from "@mui/material/useMediaQuery";

const EventsPage = () => {
    const matches = useMediaQuery("(min-width:1000px)");
    return (
        <>
            <div>{matches ? <DesktopEvents /> : <MobileEvents />}</div>
        </>
    );
};

export default EventsPage;
