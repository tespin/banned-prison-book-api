"use client";
import React, { useContext } from "react";
import SearchBar from "../SearchBar";
import { StateDataContext } from "../StateDataProvider";

function Search({ label }) {
  const { stateData } = useContext(StateDataContext);

  return <SearchBar label={label} data={stateData} />;
}

export default Search;
