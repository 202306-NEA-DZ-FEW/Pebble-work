import React from "react";

import SmallScreenEvents from "../SmallScreenEvents";
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);
describe("SmallScreenEvents", () => {
    it("renders correctly", () => {
        const user = { name: "Test User" };

        const { asFragment } = render(<SmallScreenEvents user={user} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
