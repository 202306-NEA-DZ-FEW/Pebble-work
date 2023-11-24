import { render } from "@testing-library/react";
import React from "react";

import GalleryCard from "@/components/Homecards/GalleryCard";
import { useTranslation } from "next-i18next";

jest.mock("next-i18next", () => ({
    useTranslation: () => ({
        t: (str) => str,
        i18n: {
            language: "en",
        },
    }),
}));

describe("GalleryCard", () => {
    it("should match snapshot", () => {
        const { asFragment } = render(<GalleryCard />);
        expect(asFragment()).toMatchSnapshot();
    });
});
