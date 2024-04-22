"use client";
import React, { useState, createContext } from "react";
import supabase from "@/app/utils/supabase";
import { getRange, stateToAbbrev } from "@/app/utils/helpers";

export const SearchResultsContext = createContext();

function SearchResultsProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  async function handleSubmit(e, value) {
    e.preventDefault();
    const page = 1;
    const numPerPage = 10;
    const { from, to } = getRange(page, numPerPage);

    const query = stateToAbbrev[value.toLowerCase()];
    const { data } = await supabase
      .from("books")
      .select()
      .eq("state_arc", query)
      .range(from, to);

    setSearchResults(data);
  }

  return (
    <SearchResultsContext.Provider value={{ handleSubmit, searchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
}

export default SearchResultsProvider;
