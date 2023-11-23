import { cleanup, render } from "@testing-library/react";
import React from "react";

import SmallScreenEvents from "../SmallScreenEvents";
afterEach(cleanup);
describe("SmallScreenEvents", () => {
    it("renders correctly", () => {
        const user = { name: "Test User" };

        const { asFragment } = render(<SmallScreenEvents user={user} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
