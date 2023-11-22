import { renderHook } from "@testing-library/react-hooks";

import { usePagination } from "../Pagination";

describe("usePagination", () => {
    it("returns correct initial values", () => {
        const initialPage = 1;
        const initialItemsPerPage = 2;
        const items = ["item1", "item2", "item3", "item4", "item5"];

        const { result } = renderHook(() =>
            usePagination(initialPage, initialItemsPerPage, items)
        );

        expect(result.current.currentPage).toBe(initialPage);
        expect(result.current.itemsPerPage).toBe(initialItemsPerPage);
        expect(result.current.totalPages).toBe(
            Math.ceil(items.length / initialItemsPerPage)
        );
        expect(result.current.currentItems).toEqual(
            items.slice(0, initialItemsPerPage)
        );
    });
});
