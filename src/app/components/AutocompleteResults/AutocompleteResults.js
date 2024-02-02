"use client";
import React from "react";
import { useContext } from "react";
import { StateDataContext } from "../StateDataProvider";

function AutocompleteResults() {
  const { filteredData } = useContext(StateDataContext);

  return (
    <ul className="absolute top-full p-0">
      {filteredData.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );
}

export default AutocompleteResults;
