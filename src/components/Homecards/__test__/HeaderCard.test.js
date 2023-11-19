import React from "react";
import { render } from "@testing-library/react";
import HeaderCard from "@/components/Homecards/HeaderCard";

describe("HeaderCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<HeaderCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
