import React from "react";
import { render, screen } from "@testing-library/react";
import { usePagination } from "../Pagination";

// A simple component that uses the hook
function TestComponent() {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
    const {
        currentPage,
        itemsPerPage,
        totalPages,
        currentItems,
        setCurrentPage,
        setItemsPerPage,
    } = usePagination(1, 2, items);

    return (
        <div>
            {currentItems.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    );
}

describe("usePagination", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<TestComponent />);
        expect(asFragment()).toMatchSnapshot();
    });
});
