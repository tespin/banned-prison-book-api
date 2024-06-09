"use client";
import React from "react";
import { useState, useEffect, createContext, useRef } from "react";

export const StateDataContext = createContext();

import States from "../../utils/states.json";

function StateDataProvider({ children }) {
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    const newStates = States.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }));

    setStateData(newStates);
  }, []);

  return (
    <StateDataContext.Provider
      value={{
        stateData,
      }}
    >
      {children}
    </StateDataContext.Provider>
  );
}

export default StateDataProvider;
