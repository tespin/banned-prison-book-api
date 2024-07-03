"use client";
import React from "react";
import Card from "../UI/Card";

function ResultsList({ className, searchResults }) {
  return (
    <ul className={`flex flex-col gap-y-4 ${className ? className : ""}`}>
      {searchResults.map((item) => {
        return <Card data={item} key={item.id} />;
      })}
    </ul>
  );
}

export default ResultsList;
