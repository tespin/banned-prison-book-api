"use client";
import React, { useState, createContext, useEffect, useMemo } from "react";
import supabase from "@/app/utils/supabase";
import usePagination from "@/app/hooks/usePagination";
import { stateToAbbrev } from "@/app/utils/helpers";

export const SearchResultsContext = createContext();
const DOTS = "...";
const numPerPage = 10;
const numSiblings = 2;

function SearchResultsProvider({ children }) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage, setNumPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  async function handleSubmit(e, value) {
    e.preventDefault();
    setStatus("loading");
    // const { from, to } = getRange(currentPage, numPerPage);
    const query = stateToAbbrev[value.toLowerCase()];
    const { data } = await supabase
      .from("books")
      .select()
      .eq("state_arc", query);

    setData(data);
    setTotalCount(data.length);
  }

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * numPerPage;
    const lastPageIndex = firstPageIndex + numPerPage;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  return (
    <SearchResultsContext.Provider
      value={{
        handleSubmit,
        setCurrentPage,
        currentPage,
        currentData,
        totalCount,
        numPerPage,
        data,
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
}

export default SearchResultsProvider;
