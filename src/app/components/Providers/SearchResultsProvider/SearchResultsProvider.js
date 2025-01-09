"use client";
import React, { useState, createContext, useEffect, useMemo } from "react";
import supabase from "@/app/utils/supabase";
import usePagination from "@/app/hooks/usePagination";
import { stateToAbbrev } from "@/app/utils/helpers";

export const SearchResultsContext = createContext();
const DOTS = "...";
const numPerPage = 10;
const numSiblings = 1;

const sortByDateAndPublication = (data) => {
  return data.sort((a, b) => {
    const yearA = a.date ? a.date.split("-")[0] : "";
    const yearB = b.date ? b.date.split("-")[0] : "";

    if (yearA && yearB) return yearA - yearB;
    if (!yearA && !yearB) return a.publication.localeCompare(b.publication);

    return !yearA ? 1 : -1;
  });
};

const fetchSearchResults = async (query) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select()
      .eq("state_arc", stateToAbbrev[query.toLowerCase()]);

    if (error) throw error;
    return sortByDateAndPublication(data);
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error.message}`);
  }
};

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

    const results = await fetchSearchResults(value);

    setData(results);
    setFilteredData(results);
    setStatus("success");
    setCurrentPage(1);
    setTotalCount(results.length);
    setQuery(value);
  }

  useEffect(() => {
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
