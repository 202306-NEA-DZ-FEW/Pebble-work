import { render } from "@testing-library/react";
import React from "react";

import NoEvent from "../NoEvent";

describe("NoEvent", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<NoEvent />);

        expect(asFragment()).toMatchSnapshot();
    });
});
