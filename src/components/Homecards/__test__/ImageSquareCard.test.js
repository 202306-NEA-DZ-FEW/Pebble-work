import { render } from "@testing-library/react";
import React from "react";

import ImageSquareCard from "@/components/Homecards/ImageSquareCard";

describe("ImageSquareCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<ImageSquareCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
