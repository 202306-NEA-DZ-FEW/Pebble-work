import React from "react";
import { render } from "@testing-library/react";
import EventCreation from "../EventCreation";

describe("EventCreation", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<EventCreation />);

        expect(asFragment()).toMatchSnapshot();
    });
});
