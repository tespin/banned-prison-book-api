"use client";
import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { BannedBooksContext } from "../Providers/BannedBooksProvider";
import { SearchResultsContext } from "../Providers/SearchResultsProvider";

function SearchContainer({ placeholder }) {
  const { stateData } = useContext(BannedBooksContext);
  const { handleSubmit } = useContext(SearchResultsContext);

  return (
    <SearchBar
      placeholder={placeholder}
      options={stateData}
      onSearch={handleSubmit}
    />
  );
}

export default SearchContainer;
