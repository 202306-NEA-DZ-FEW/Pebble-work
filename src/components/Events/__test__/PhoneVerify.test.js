import React from "react";
import { render } from "@testing-library/react";
import PhoneVerify from "../PhoneVerify";

describe("PhoneVerify", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<PhoneVerify />);

        expect(asFragment()).toMatchSnapshot();
    });
});
