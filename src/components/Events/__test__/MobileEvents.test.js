import React from "react";

import MobileEvents from "../MobileEvents";
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);
describe("MobileEvents", () => {
    it("renders correctly", () => {
        const user = { name: "Test User" };

        const { asFragment } = render(<MobileEvents user={user} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
