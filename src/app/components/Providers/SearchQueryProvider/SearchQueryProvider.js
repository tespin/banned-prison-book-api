"use client";
import React, { useState, useEffect, createContext } from "react";

export const SearchQueryContext = createContext();

function SearchQueryProvider({ children, data }) {
  const [filtered, setFilteredData] = useState([]);
  const [value, setValue] = useState("");

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
    <SearchQueryContext.Provider
      value={{
        filterData,
        filtered,
        value,
        setValue,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
}
export default SearchQueryProvider;
