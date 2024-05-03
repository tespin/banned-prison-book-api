"use client";
import React, { useContext } from "react";
import FlexContainer from "../FlexContainer";
import ResultsList from "../ResultsList";
import PageNav from "../PageNav";
import { SearchResultsContext } from "../SearchResultsProvider";

function SearchResults() {
  const {
    totalCount,
    currentData,
    currentPage,
    setCurrentPage,
    numPerPage,
    numSiblings,
    query,
  } = useContext(SearchResultsContext);

  return (
    <FlexContainer className="flex-col my-14">
      {currentData.length === 0 ? (
        <p>No results were found for '{query}'.</p>
      ) : (
        <>
          <ResultsList searchResults={currentData} />
          {totalCount > numPerPage && (
            <PageNav
              className="my-4"
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
              totalCount={totalCount}
              siblingCount={numSiblings}
              pageSize={numPerPage}
            />
          )}
        </>
      )}
    </FlexContainer>
  );
}

export default SearchResults;
