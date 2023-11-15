import React from "react";
import { render } from "@testing-library/react";
import EditEvent from "../EditEvent";

describe("EditEvent", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<EditEvent />);

        expect(asFragment()).toMatchSnapshot();
    });
});
