import React from "react";
import { render } from "@testing-library/react";
import ButtonTwitter from "../ButtonGoogle";
describe("ButtonTwitter", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<ButtonTwitter />);
        expect(asFragment()).toMatchSnapshot();
    });
});
