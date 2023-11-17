jest.mock("swiper/modules", () => ({
    EffectCoverflow: jest.fn(),
    Pagination: jest.fn(),
    Autoplay: jest.fn(),
    Navigation: jest.fn(),
}));
jest.mock("swiper/react", () => ({
    Swiper: ({ children }) => <div>Mock Swiper {children}</div>,
    SwiperSlide: ({ children }) => <div>Mock SwiperSlide {children}</div>,
}));

import React from "react";
import renderer from "react-test-renderer";
import Members from "../Members";

describe("Test Component", () => {
    it("renders correctly", () => {
        const members = [
            {
                imageSrc: "/path/to/image.jpg",
                name: "Test Name",
                description: "Test Description",
                google: "https://google.com",
                linkedin: "https://linkedin.com",
                github: "https://github.com",
            },
            // add more member objects as needed
        ];

        const tree = renderer.create(<Members members={members} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
