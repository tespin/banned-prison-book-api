"use client";
import React from "react";
import { useState, useEffect, createContext, useRef } from "react";

export const StateDataContext = createContext();

import States from "../../utils/states.json";

function StateDataProvider({ children }) {
  const [stateData, setStateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    const newStates = States.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }));

    setStateData(newStates);
  }, []);

  function filterData(query) {
    const filtered = stateData.filter((item) => {
      return item.name.toLowerCase().startsWith(query.toLowerCase());
    });

    setFilteredData(filtered);
  }

  return (
    <StateDataContext.Provider
      value={{
        stateData,
        filterData,
        filteredData,
        query,
        setQuery,
        inputActive,
        setInputActive,
      }}
    >
      {children}
    </StateDataContext.Provider>
  );
}

export default StateDataProvider;
