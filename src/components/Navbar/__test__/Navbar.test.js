import React from "react";
import { render } from "@testing-library/react";
import Navbar from "../Navbar"; // adjust this import to your file structure

describe("Navbar", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Navbar />);
        expect(asFragment()).toMatchSnapshot();
    });
});
