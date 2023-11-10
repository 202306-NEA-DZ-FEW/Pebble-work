import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import FirestoreLocation from "../FirestoreLocation"; // adjust this import to your file structure
import Calendar from "../Calendar";
import FilterByType from "../FilterByType";

describe("FirestoreLocation", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<FirestoreLocation />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Calendar", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Calendar />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("FilterByType", () => {
    it("renders correctly", () => {
        const setFilteredTypes = jest.fn();
        const { asFragment } = render(
            <FilterByType
                selectedTypes={[]}
                setSelectedTypes={() => {}}
                setFilteredTypes={setFilteredTypes}
                resetEvents={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("handles type click correctly", () => {
        const setFilteredTypes = jest.fn();
        const setSelectedTypes = jest.fn();
        const resetEvents = jest.fn();

        render(
            <FilterByType
                selectedTypes={["No Poverty"]}
                setSelectedTypes={setSelectedTypes}
                setFilteredTypes={setFilteredTypes}
                resetEvents={resetEvents}
            />
        );

        expect(setFilteredTypes).toHaveBeenCalledWith(["No Poverty"]);

        expect(resetEvents).not.toHaveBeenCalled();
    });
});
