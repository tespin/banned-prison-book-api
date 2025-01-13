"use client";
import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { StateDataContext } from "../Providers/StateDataProvider";
import { SearchResultsContext } from "../Providers/SearchResultsProvider";

function SearchContainer({ placeholder }) {
  const { stateData } = useContext(StateDataContext);
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
