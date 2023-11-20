import React from "react";
import { render } from "@testing-library/react";
import Modal from "../Modal";
describe("Modal", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Modal />);
        expect(asFragment()).toMatchSnapshot();
    });
});
