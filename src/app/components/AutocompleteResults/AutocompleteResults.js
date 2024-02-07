"use client";
import React from "react";
import { useContext } from "react";
import { StateDataContext } from "../StateDataProvider";
import { ActiveItemContext } from "../ActiveItemProvider";

function AutocompleteResults() {
  const { filteredData } = useContext(StateDataContext);
  const { handleClick } = useContext(ActiveItemContext);

  return (
    <ul className="absolute top-full p-0 w-full">
      {filteredData.map((item) => {
        return (
          <li
            key={item.id}
            className="px-2 py-1 hover:bg-neutral-300"
            onClick={(e) => handleClick(e)}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default AutocompleteResults;
