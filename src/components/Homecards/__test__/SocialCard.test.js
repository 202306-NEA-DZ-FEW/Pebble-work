import { render } from "@testing-library/react";
import React from "react";

import SocialCard from "@/components/Homecards/SocialCard";

describe("SocialCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<SocialCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
