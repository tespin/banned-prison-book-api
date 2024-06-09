"use client";
import React from "react";
import Card from "../Card";

function ResultsList({ className, searchResults }) {
  return (
    <ul className={`flex flex-col gap-y-4 ${className ? className : ""}`}>
      {searchResults.map((item) => {
        return <Card data={item} />;
      })}
    </ul>
  );
}

export default ResultsList;
