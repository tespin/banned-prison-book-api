"use client";
import React, { useContext } from "react";
import Card from "../Card";
import { SearchResultsContext } from "../SearchResultsProvider";

function ResultsContainer({ className }) {
  const { searchResults } = useContext(SearchResultsContext);

  return (
    <ul className={`flex flex-col gap-y-10 ${className ? className : ""}`}>
      {searchResults.map((item) => {
        return <Card data={item} />;
      })}
    </ul>
  );
}

export default ResultsContainer;
