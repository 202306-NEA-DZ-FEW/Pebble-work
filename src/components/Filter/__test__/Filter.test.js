import React from "react";
import { render } from "@testing-library/react";
import FirestoreLocation from "../FirestoreLocation"; // adjust this import to your file structure

describe("FirestoreLocation", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<FirestoreLocation />);
        expect(asFragment()).toMatchSnapshot();
    });
});
