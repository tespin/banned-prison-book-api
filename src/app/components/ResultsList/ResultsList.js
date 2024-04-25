"use client";
import React, { useContext } from "react";
import Card from "../Card";
import { SearchResultsContext } from "../SearchResultsProvider";

function ResultsList({ className }) {
  const { searchResults } = useContext(SearchResultsContext);

  return (
    <ul className={`flex flex-col gap-y-4 ${className ? className : ""}`}>
      {searchResults.map((item) => {
        return <Card data={item} />;
      })}
    </ul>
  );
}

export default ResultsList;
