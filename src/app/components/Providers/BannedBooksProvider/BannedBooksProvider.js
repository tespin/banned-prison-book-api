"use client";
import React from "react";
import { useState, useEffect, createContext, useRef } from "react";

export const BannedBooksContext = createContext();

import States from "@/app/utils/states.json";

function BannedBooksProvider({ children }) {
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    const newStates = States.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }));

    setStateData(newStates);
  }, []);

  return (
    <BannedBooksContext.Provider
      value={{
        stateData,
      }}
    >
      {children}
    </BannedBooksContext.Provider>
  );
}

export default BannedBooksProvider;
