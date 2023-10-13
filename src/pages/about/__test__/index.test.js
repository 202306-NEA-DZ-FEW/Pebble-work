import { render, screen } from "@testing-library/react";
import AboutPage from "@/pages/about";
test("renders AboutPage component without crashing", () => {
    render(<AboutPage />);
});
test("renders 'About Pebble Work' heading correctly", () => {
    render(<AboutPage />);
    const headingElement = screen.getByText(/About Pebble Work/i);
    expect(headingElement).toBeInTheDocument();
});
test("renders 'Our Team' heading correctly", () => {
    render(<AboutPage />);
    const headingElement = screen.getByText(/Our Team/i);
    expect(headingElement).toBeInTheDocument();
});
test("renders MembersCard components correctly", () => {
    render(<AboutPage />);
    const membersCardElements = screen.getAllByTestId("members-card");
    expect(membersCardElements.length).toBe(5);
});
