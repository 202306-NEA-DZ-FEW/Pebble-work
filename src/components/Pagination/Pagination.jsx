import { useState } from "react";

export const usePagination = (initialPage, initialItemsPerPage, items) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        currentItems,
        setCurrentPage,
        setItemsPerPage,
    };
};
