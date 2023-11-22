import React from "react";
import renderer from "react-test-renderer";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("Navbar component", () => {
    it("matches the snapshot", () => {
        useRouter.mockImplementation(() => ({
            pathname: "/",
        }));
        const tree = renderer.create(<Navbar />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
