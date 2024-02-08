"use client";
import React, { createContext, useContext } from "react";
import { StateDataContext } from "../StateDataProvider";
export const ActiveItemContext = createContext();

function ActiveItemProvider({ children }) {
  const { setQuery } = useContext(StateDataContext);

  function handleClick(e, inputRef) {
    setQuery(e.target.innerHTML);
    inputRef.current.focus();
  }

  return (
    <ActiveItemContext.Provider value={{ handleClick }}>
      {children}
    </ActiveItemContext.Provider>
  );
}

export default ActiveItemProvider;
