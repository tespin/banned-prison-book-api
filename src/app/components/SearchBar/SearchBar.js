"use client";
import React from "react";
import InputForm from "../InputForm";
import SearchInputProvider from "../Providers/SearchQueryProvider";
import SelectedBookProvider from "../Providers/SelectedBookProvider";

function SearchBar({ placeholder, options, onSearch }) {
  return (
    <SearchInputProvider data={options}>
      <SelectedBookProvider>
        <InputForm placeholder={placeholder} handleSubmit={onSearch} />
      </SelectedBookProvider>
    </SearchInputProvider>
  );
}

export default SearchBar;
