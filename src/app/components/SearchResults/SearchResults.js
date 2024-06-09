"use client";
import React, { useContext } from "react";
import FlexContainer from "../FlexContainer";
import ResultsList from "../ResultsList";
import PageNav from "../PageNav";
import { SearchResultsContext } from "../SearchResultsProvider";

function SearchResults({ className }) {
  const {
    totalCount,
    currentData,
    currentPage,
    setCurrentPage,
    numPerPage,
    numSiblings,
    query,
    status,
  } = useContext(SearchResultsContext);

  const hasResults = currentData.length > 0;

  return (
    <FlexContainer className={`flex-col ${className ? className : ""}`}>
      {status === "success" && hasResults ? (
        <>
          <p className="text-sm mb-4">
            There are <span className=" font-medium">{totalCount}</span> banned
            texts in {query}.
          </p>
          <FlexContainer className="flex-col">
            <ResultsList searchResults={currentData} />
            <PageNav
              className="my-4"
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
              totalCount={totalCount}
              siblingCount={numSiblings}
              pageSize={numPerPage}
            />
          </FlexContainer>
        </>
      ) : (
        status === "success" &&
        !hasResults && (
          <p className="text-sm">No results were found for '{query}'</p>
        )
      )}
    </FlexContainer>
  );
}

export default SearchResults;
