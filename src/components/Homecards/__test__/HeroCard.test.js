import { render } from "@testing-library/react";
import React from "react";

import HeroCard from "@/components/Homecards/HeroCard";

describe("HeroCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<HeroCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
