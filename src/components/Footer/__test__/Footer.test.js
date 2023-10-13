import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer/Footer";

test("Footer component exists", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
});
test("Footer component contains three images with specific alt attributes", () => {
    render(<Footer />);
    const facebookImage = screen.getByAltText("Facebook");
    const gmailImage = screen.getByAltText("Gmail");
    const twitterImage = screen.getByAltText("Twitter");

    expect(facebookImage).toBeInTheDocument();
    expect(gmailImage).toBeInTheDocument();
    expect(twitterImage).toBeInTheDocument();
});
test("Footer component contains a logo", () => {
    render(<Footer />);
    const logoImage = screen.getByAltText("Logo");

    expect(logoImage).toBeInTheDocument();
});
test("Logo in Footer component takes to homepage", () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const logoLink = screen.getByAltText("Logo").closest("a");

    expect(logoLink).toHaveAttribute("href", "/");
});
test("About link in Footer component takes to about page", () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const aboutLink = screen.getByText("About").closest("a");

    expect(aboutLink).toHaveAttribute("href", "/about");
});
