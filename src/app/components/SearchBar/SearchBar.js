"use client";
import React, { useState } from "react";
import InputForm from "../InputForm";
import SearchInputProvider from "../SearchInputProvider";

function SearchBar({ label, data }) {
  return (
    <SearchInputProvider data={data}>
      <InputForm label={label} />
    </SearchInputProvider>
  );
}

export default SearchBar;
