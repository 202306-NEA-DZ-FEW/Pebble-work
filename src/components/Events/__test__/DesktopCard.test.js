import React from "react";
import { render } from "@testing-library/react";
import DesktopCard from "../MobileCard";

describe("EventCardLeft", () => {
    it("renders correctly", () => {
        const event = {
            eventId: "1",
            title: "Test Event",
            type: "Test Type",
            image: "test-image.jpg",
            location: "Test Location",
            date: "2023-01-01",
            time: "12:00",
            description: "Test Description",
        };

        const { asFragment } = render(<DesktopCard {...event} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
