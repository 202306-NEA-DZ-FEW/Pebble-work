import FirestoreLocation from "../FirestoreLocation";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/util/firebase", () => ({
    db: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
}));

describe("FirestoreLocation Component", () => {
    const mockProps = {
        onInputChange: jest.fn(),
        onInputDelete: jest.fn(),
        inputValue1: "",
        setInputValue1: jest.fn(),
    };

    const renderComponent = (props = {}) => {
        render(<FirestoreLocation {...mockProps} {...props} />);
    };

    test("should render component", () => {
        render(<FirestoreLocation />);
        expect(renderComponent()).toMatchSnapshot();
    });

    test("should handle location input change", () => {
        renderComponent();
        const inputElement = screen.getByPlaceholderText("Set Location");
        fireEvent.change(inputElement, { target: { value: "New York" } });

        expect(mockProps.setInputValue1).toHaveBeenCalledWith("New York");
        expect(mockProps.setInputValue1).not.toHaveBeenCalledWith("Ben Aknoun");
    });
});
