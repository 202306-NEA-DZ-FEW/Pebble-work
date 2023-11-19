import React from "react";
import { render } from "@testing-library/react";
import MainCard from "@/components/Homecards/MainCard";

describe("MainCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<MainCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
