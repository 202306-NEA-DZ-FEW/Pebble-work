import React from "react";
import { render } from "@testing-library/react";
import BtnGoogle from "../ButtonGoogle";
describe("BtnGoogle", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<BtnGoogle />);
        expect(asFragment()).toMatchSnapshot();
    });
});
