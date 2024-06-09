"use client";
import React from "react";
import InputForm from "../InputForm";
import SearchInputProvider from "../SearchInputProvider";
import ActiveItemProvider from "../ActiveItemProvider";

function SearchBar({ placeholder, options, onSearch }) {
  return (
    <SearchInputProvider data={options}>
      <ActiveItemProvider>
        <InputForm placeholder={placeholder} handleSubmit={onSearch} />
      </ActiveItemProvider>
    </SearchInputProvider>
  );
}

export default SearchBar;
