"use client";
import React, { useState, createContext, useEffect, useMemo } from "react";
import supabase from "@/app/utils/supabase";
import usePagination from "@/app/hooks/usePagination";
import { stateToAbbrev } from "@/app/utils/helpers";

export const SearchResultsContext = createContext();
const DOTS = "...";
const numPerPage = 10;
const numSiblings = 1;

function SearchResultsProvider({ children }) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage, setNumPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [query, setQuery] = useState("");

  async function handleSubmit(e, value) {
    e.preventDefault();
    setStatus("loading");
    const query = stateToAbbrev[value.toLowerCase()];
    const { data } = await supabase
      .from("books")
      .select()
      .eq("state_arc", query);

    setData(data);
    setStatus("success");
    setTotalCount(data.length);
    setQuery(value);
  }

  useEffect(() => {
    console.log(filteredData.length);
    setTotalCount(filteredData.length);
  }, [filteredData]);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * numPerPage;
    const lastPageIndex = firstPageIndex + numPerPage;

    if (filteredData?.length > 0) {
      return filteredData.slice(firstPageIndex, lastPageIndex);
    }

    return data.slice(firstPageIndex, lastPageIndex);
  }, [numPerPage, currentPage, data, filteredData]);

  return (
    <SearchResultsContext.Provider
      value={{
        handleSubmit,
        setCurrentPage,
        currentPage,
        currentData,
        totalCount,
        setTotalCount,
        numPerPage,
        numSiblings,
        data,
        filteredData,
        setFilteredData,
        query,
        status,
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
}

export default SearchResultsProvider;
