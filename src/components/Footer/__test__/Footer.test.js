import { render } from "@testing-library/react";
import React from "react";

import Footer from "../Footer"; // adjust this import to your file structure

describe("Footer", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Footer />);
        expect(asFragment()).toMatchSnapshot();
    });
});
