"use client";
import React, { useReducer, createContext, useEffect, useMemo } from "react";
import supabase from "@/app/utils/supabase";
import usePagination from "@/app/hooks/usePagination";
import { stateToAbbrev } from "@/app/utils/helpers";

export const SearchResultsContext = createContext();
const DOTS = "...";
const numPerPage = 10;
const numSiblings = 1;

const initialState = {
  status: "idle",
  error: null,
  data: [],
  filteredData: [],
  pagination: {
    currentPage: 1,
    numPerPage: 10,
    totalCount: 0,
  },
  query: "",
};

function searchResultsReducer(state, action) {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        status: "loading",
        query: action.payload,
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        status: "success",
        data: action.payload,
        filteredData: action.payload,
        pagination: {
          ...state.pagination,
          currentPage: 1,
          totalCount: action.payload.length,
        },
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };
    case "SET_FILTERED_DATA":
      return {
        ...state,
        filteredData: action.payload,
        pagination: {
          ...state.pagination,
          totalCount: action.payload.length,
        },
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

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
  const [state, dispatch] = useReducer(searchResultsReducer, initialState);

  async function handleSubmit(e, value) {
    e.preventDefault();

    dispatch({ type: "SEARCH_START", payload: value });

    try {
      const results = await fetchSearchResults(value);
      dispatch({ type: "SEARCH_SUCCESS", payload: results });
    } catch (error) {
      dispatch({ type: "SEARCH_ERROR", payload: error });
    }
  }

  const setCurrentPage = (page) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const setFilteredData = (newData) => {
    dispatch({ type: "SET_FILTERED_DATA", payload: newData });
  };

  const currentData = useMemo(() => {
    const dataToDisplay =
      state.filteredData.length > 0 ? state.filteredData : state.data;

    const firstPageIndex =
      (state.pagination.currentPage - 1) * state.pagination.numPerPage;
    const lastPageIndex = firstPageIndex + state.pagination.numPerPage;

    return dataToDisplay.slice(firstPageIndex, lastPageIndex);
  }, [state.pagination, state.data, state.filteredData]);

  const contextValue = useMemo(
    () => ({
      ...state,
      handleSubmit,
      setCurrentPage,
      setFilteredData,
      currentData,
      numSiblings,
    }),
    [state, currentData]
  );

  return (
    <SearchResultsContext.Provider value={contextValue}>
      {children}
    </SearchResultsContext.Provider>
  );
}

export default SearchResultsProvider;
