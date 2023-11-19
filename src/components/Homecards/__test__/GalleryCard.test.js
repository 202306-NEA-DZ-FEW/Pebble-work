import React from "react";
import { render } from "@testing-library/react";
import GalleryCard from "@/components/Homecards/GalleryCard";

describe("GalleryCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<GalleryCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
