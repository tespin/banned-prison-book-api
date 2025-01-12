"use client";
import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { StateDataContext } from "../Providers/StateDataProvider";
import useSearchResults from "@/app/hooks/useSearchResults";

function Search({ placeholder }) {
  const { stateData } = useContext(StateDataContext);
  const { handleSubmit } = useSearchResults();

  return (
    <SearchBar
      placeholder={placeholder}
      options={stateData}
      onSearch={handleSubmit}
    />
  );
}

export default Search;
