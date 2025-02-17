"use client";
import React, { useContext } from "react";
import FlexContainer from "../UI/FlexContainer";
import ResultsList from "../ResultsList";
import PageNav from "../PageNav";
import { SearchResultsContext } from "../Providers/SearchResultsProvider";
import useSearchResults from "@/app/hooks/useSearchResults";

function SearchResults({ className }) {
  const {
    pagination,
    currentData,
    setCurrentPage,
    numSiblings,
    query,
    status,
  } = useSearchResults();

  const hasResults = currentData.length > 0;

  return (
    <FlexContainer className={`flex-col ${className ? className : ""}`}>
      {status === "success" && hasResults ? (
        <>
          <p className="text-sm mb-4">
            There are{" "}
            <span className=" font-medium">{pagination.totalCount}</span> banned
            texts in {query}.
          </p>
          <FlexContainer className="flex-col">
            <ResultsList searchResults={currentData} />
            <PageNav
              className="my-4"
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={pagination.currentPage}
              totalCount={pagination.totalCount}
              siblingCount={numSiblings}
              pageSize={pagination.numPerPage}
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
