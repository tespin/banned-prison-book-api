"use client";
import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { StateDataContext } from "../StateDataProvider";
import { SearchResultsContext } from "../SearchResultsProvider";

function Search({ placeholder }) {
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

export default Search;
