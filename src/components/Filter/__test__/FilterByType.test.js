import FilterByType from "../FilterByType";
import { render, screen } from "@testing-library/react";
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
});
