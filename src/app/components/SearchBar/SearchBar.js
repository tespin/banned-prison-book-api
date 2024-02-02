"use client";
import React from "react";
import { useState, useEffect } from "react";
import FlexContainer from "../FlexContainer";
import AutocompleteResults from "../AutocompleteResults";
import Books from "../../assets/books.json";
import States from "../../utils/states.json";

function SearchBar({ className }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(States);
  }, []);

  useEffect(() => {
    const nextSuggestions = States.filter((item) => {
      return item.name.toLowerCase().startsWith(query.toLowerCase());
    });
    setSuggestions(nextSuggestions);
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const results = Books.filter((item) =>
      item.publication.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <form className={`${className}`} onSubmit={handleSubmit} autoComplete="off">
      <FlexContainer className="items-center">
        <label htmlFor="search-input" className="shrink-0">
          I'm looking for books in{" "}
        </label>
        <FlexContainer className="ml-2 border-b-2 border-black relative">
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => {
              // handleChange(e);
              setQuery(e.target.value);
            }}
            // onChange={(event) => {
            //   handleChange;
            // }}
            className="px-2 py-1 w-full"
          />
          <button type="submit">
            <svg
              width="18"
              height="18"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <AutocompleteResults suggestions={suggestions} />
        </FlexContainer>
      </FlexContainer>
    </form>
  );
}

export default SearchBar;
