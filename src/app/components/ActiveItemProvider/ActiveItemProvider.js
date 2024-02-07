"use client";
import React, { createContext, useContext } from "react";
import { StateDataContext } from "../StateDataProvider";
export const ActiveItemContext = createContext();

function ActiveItemProvider({ children }) {
  const { setQuery } = useContext(StateDataContext);

  function handleClick(e) {
    setQuery(e.target.innerHTML);
  }

  return (
    <ActiveItemContext.Provider value={{ handleClick }}>
      {children}
    </ActiveItemContext.Provider>
  );
}

export default ActiveItemProvider;
