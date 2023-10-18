import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar/Navbar";

test("Navbar should exist", () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();
});

// test('Navbar should contain "Sign in" and "Sign up" buttons', () => {
//     render(<Navbar />);
//     const signInButton = screen.getByRole("button", { name: /sign in/i });
//     const signUpButton = screen.getByRole("button", { name: /sign up/i });

//     expect(signInButton).toBeInTheDocument();
//     expect(signUpButton).toBeInTheDocument();
// });

// test('Navbar should contain a <ul> with three <li> elements for "Events", "About", and "Contact"', () => {
//     render(<Navbar />);
//     const eventsLink = screen.getByRole("link", { name: /events/i });
//     const aboutLink = screen.getByRole("link", { name: /about/i });
//     const contactLink = screen.getByRole("link", { name: /contact/i });

//     expect(eventsLink).toBeInTheDocument();
//     expect(aboutLink).toBeInTheDocument();
//     expect(contactLink).toBeInTheDocument();

//     const listElement = screen.getByRole("list");
//     const listItemElements = screen.getAllByRole("listitem");
// });
