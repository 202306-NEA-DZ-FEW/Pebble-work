import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FilterByType from "@/components/Filter/FilterByType";

afterEach(cleanup);

test("renders FilterByType", () => {
    const mockSetSelectedTypes = jest.fn();
    const mockSetFilteredTypes = jest.fn();
    const mockResetEvents = jest.fn();

    const { asFragment } = render(
        <FilterByType
            selectedTypes={[]}
            setSelectedTypes={mockSetSelectedTypes}
            setFilteredTypes={mockSetFilteredTypes}
            resetEvents={mockResetEvents}
        />
    );

    expect(asFragment()).toMatchSnapshot();
});
