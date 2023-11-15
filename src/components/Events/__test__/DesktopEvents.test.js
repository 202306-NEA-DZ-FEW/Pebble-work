import React from "react";

import DesktopEvents from "../DesktopEvents";
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);
describe("DesktopEvents", () => {
    it("renders correctly", () => {
        const user = { name: "Test User" };

        const { asFragment } = render(<DesktopEvents user={user} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
