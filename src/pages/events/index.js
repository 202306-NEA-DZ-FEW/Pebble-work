import React from "react";
import MobileEvents from "@/components/Events/MobileEvents";
import DesktopEvents from "@/components/Events/DesktopEvents";
import SmallScreenEvents from "@/components/Events/SmallScreenEvents";
import useMediaQuery from "@mui/material/useMediaQuery";

const EventsPage = () => {
    const isDesktop = useMediaQuery("(min-width:1000px)");
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
