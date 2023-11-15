import Calendar from "../Calendar";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

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

    test("should handles date click", async () => {
        renderComponent();
        const dayElement = screen.getByRole("link", { name: "1" });
        fireEvent.click(dayElement);

        expect(mockProps.checkEvents).toHaveBeenCalledWith(expect.any(String));
    });
});
