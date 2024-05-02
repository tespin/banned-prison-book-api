import React from "react";
import FlexContainer from "../FlexContainer";
import Link from "next/link";
import usePagination, { DOTS } from "@/app/hooks/usePagination";

function PageNav({
  onPageChange,
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
}) {
  const pageRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  function onNext() {
    onPageChange(currentPage + 1);
  }

  function onPrevious() {
    onPageChange(currentPage - 1);
  }

  return (
    <FlexContainer>
      <ul className="flex justify-between w-full">
        {pageRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li>&#8230;</li>;
          }
          return (
            <li onClick={() => onPageChange(pageNumber)}>
              <Link href="/#/">{pageNumber}</Link>
            </li>

            //   <li
            //   onClick={() => {
            //     onPageChange(page);
            //   }}
            //   className={`${currentPage === page ? "font-bold" : ""}`}
            // >
            //   <Link href={`/#`}>{page}</Link>
            // </li>
          );
        })}
      </ul>
    </FlexContainer>
  );
}

export default PageNav;
