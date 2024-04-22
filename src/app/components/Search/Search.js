"use client";
import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { StateDataContext } from "../StateDataProvider";
import { SearchResultsContext } from "../SearchResultsProvider";

function Search({ label }) {
  const { stateData } = useContext(StateDataContext);
  const { handleSubmit } = useContext(SearchResultsContext);

  return (
    <SearchBar label={label} options={stateData} onSearch={handleSubmit} />
  );
}

export default Search;
