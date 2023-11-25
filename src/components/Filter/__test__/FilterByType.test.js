import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FilterByType from "../FilterByType";

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
        expect(
            screen.getByText("common:eventTypes:interests")
        ).toBeInTheDocument();
        expect(renderComponent()).toMatchSnapshot();
    });
});
