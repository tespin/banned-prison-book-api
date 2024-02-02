import React from "react";

function AutocompleteResults({ suggestions }) {
  return (
    <ul className="absolute top-full p-0">
      {suggestions.map((item) => {
        return <li>{item.name}</li>;
      })}
    </ul>
  );
}

export default AutocompleteResults;
