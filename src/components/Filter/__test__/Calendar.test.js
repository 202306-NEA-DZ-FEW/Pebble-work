import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Calendar from "../Calendar";

describe("Calendar Component", () => {
    const mockProps = {
        checkEvents: jest.fn(),
        resetDays: {},
    };

    const renderComponent = (props = {}) => {
        render(<Calendar {...mockProps} {...props} />);
    };

    test("should render component", () => {
        render(<Calendar />);
        expect(screen.getByAltText("Previous")).toBeInTheDocument();
        expect(screen.getByAltText("Next")).toBeInTheDocument();
        expect(renderComponent()).toMatchSnapshot();
    });
});
