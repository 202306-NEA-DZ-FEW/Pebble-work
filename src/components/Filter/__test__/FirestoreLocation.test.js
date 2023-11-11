import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FirestoreLocation from "@/components/Filter/FirestoreLocation";

afterEach(cleanup);

test("renders FirestoreLocation", () => {
    const mockOnInputChange = jest.fn();
    const mockOnInputDelete = jest.fn();
    const mockSetInputValue1 = jest.fn();

    const { asFragment } = render(
        <FirestoreLocation
            onInputChange={mockOnInputChange}
            onInputDelete={mockOnInputDelete}
            inputValue1=''
            setInputValue1={mockSetInputValue1}
        />
    );

    expect(asFragment()).toMatchSnapshot();
});
