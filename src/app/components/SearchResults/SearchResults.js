"use client";
import React, { useContext } from "react";
import FlexContainer from "../UI/FlexContainer";
import ResultsList from "../ResultsList";
import ResultsPagination from "../ResultsPagination";
import { SearchResultsContext } from "../Providers/SearchResultsProvider";

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
            <ResultsPagination
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
          <p className="text-sm">
            No results were found for &apos;{query}&apos;
          </p>
        )
      )}
    </FlexContainer>
  );
}

export default SearchResults;
