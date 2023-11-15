import FilterByType from "../FilterByType";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("FilterByType Component", () => {
    const mockProps = {
        selectedTypes: [],
        setSelectedTypes: jest.fn(),
        setFilteredTypes: jest.fn(),
        resetEvents: jest.fn(),
    };

    const renderComponent = (props = {}) => {
        render(<FilterByType {...mockProps} {...props} />);
    };

    test("should render component", () => {
        renderComponent();
        expect(screen.getByText("Interests")).toBeInTheDocument();
        expect(renderComponent()).toMatchSnapshot();
    });

    test("should handle type selection", async () => {
        renderComponent();
        const typeButton = screen.getByText("Affordable and Clean Energy");
        fireEvent.click(typeButton);

        expect(mockProps.setSelectedTypes).not.toHaveBeenCalledWith([
            "Life on Land",
        ]);
        expect(mockProps.setSelectedTypes).toHaveBeenCalledWith([
            "Affordable and Clean Energy",
        ]);
    });

    test("should handle type reset", async () => {
        renderComponent();
        const resetButton = screen.getByText("Reset Filter");
        fireEvent.click(resetButton);

        expect(mockProps.resetEvents).toHaveBeenCalled();
    });
});
