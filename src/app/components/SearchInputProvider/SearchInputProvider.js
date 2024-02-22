"use client";
import React, { useState, useEffect, createContext } from "react";

export const SearchInputContext = createContext();

function SearchInputProvider({ children, data }) {
  const [currentData, setCurrentData] = useState([]);
  const [filtered, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  function filterData(query) {
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().startsWith(query.toLowerCase());
    });

    setFilteredData(filteredData);
  }

  return (
    <SearchInputContext.Provider
      value={{
        filterData,
        filtered,
        currentData,
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
}
export default SearchInputProvider;
