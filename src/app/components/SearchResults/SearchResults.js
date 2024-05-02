"use client";
import React, { useContext } from "react";
import FlexContainer from "../FlexContainer";
import ResultsList from "../ResultsList";
import PageNav from "../PageNav";
import { SearchResultsContext } from "../SearchResultsProvider";

function SearchResults() {
  const { totalCount, currentData, currentPage, setCurrentPage, numPerPage } =
    useContext(SearchResultsContext);

  return (
    <FlexContainer className="flex-col">
      {currentData.length > 0 && (
        <ResultsList className="mt-10" searchResults={currentData} />
      )}
      <PageNav
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        totalCount={totalCount}
        siblingCount={1}
        pageSize={numPerPage}
      />
    </FlexContainer>
  );
}

export default SearchResults;
