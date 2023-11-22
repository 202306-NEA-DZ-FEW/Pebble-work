import { cleanup, render } from "@testing-library/react";
import React from "react";

import MobileEvents from "../MobileEvents";
afterEach(cleanup);
describe("MobileEvents", () => {
    it("renders correctly", () => {
        const user = { name: "Test User" };

        const { asFragment } = render(<MobileEvents user={user} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
