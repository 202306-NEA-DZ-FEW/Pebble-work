import React from "react";
import { render } from "@testing-library/react";
import TechStack from "../TechStack";

describe("TechStack", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<TechStack />);
        expect(asFragment()).toMatchSnapshot();
    });
});
