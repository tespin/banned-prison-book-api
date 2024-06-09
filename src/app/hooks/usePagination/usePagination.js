/* from https://github.com/mayankshubham/react-pagination */

import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    // [1, 2, 3, 4, 5]
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // calc indexes for left and right sibs
    // sib indexes cannot be less than 1 or greater than total page count
    const leftSibIndex = Math.max(currentPage - siblingCount, 1);
    const rightSibIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const showLeftDots = leftSibIndex > 2;
    const showRightDots = rightSibIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let midRange = range(leftSibIndex, rightSibIndex);

      return [firstPageIndex, DOTS, ...midRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return paginationRange;
}

export default usePagination;
