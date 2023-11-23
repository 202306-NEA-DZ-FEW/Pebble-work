import { render } from "@testing-library/react";
import React from "react";

import GalleryCard from "@/components/Homecards/GalleryCard";

describe("GalleryCard", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<GalleryCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
