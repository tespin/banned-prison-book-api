"use client";
import React, { useState } from "react";
import InputForm from "../InputForm";
import SearchInputProvider from "../SearchInputProvider";
import ActiveItemProvider from "../ActiveItemProvider";

function SearchBar({ label, options }) {
  return (
    <SearchInputProvider data={options}>
      <ActiveItemProvider>
        <InputForm label={label} />
      </ActiveItemProvider>
    </SearchInputProvider>
  );
}

export default SearchBar;
