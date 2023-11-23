import { cleanup, render } from "@testing-library/react";
import React from "react";

import DesktopEvents from "../DesktopEvents";
afterEach(cleanup);
describe("DesktopEvents", () => {
    it("renders correctly", () => {
        const user = { name: "Test User" };

        const { asFragment } = render(<DesktopEvents user={user} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
