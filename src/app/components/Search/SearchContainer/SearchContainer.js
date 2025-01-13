"use client";
import React, { useContext } from "react";
import InputForm from "../../UI/InputForm";
import SearchInputProvider from "../../Providers/SearchQueryProvider";
import SelectedBookProvider from "../../Providers/SelectedBookProvider";

import { BannedBooksContext } from "../../Providers/BannedBooksProvider";
import { SearchResultsContext } from "../../Providers/SearchResultsProvider";

function SearchContainer({ placeholder }) {
  const { stateData } = useContext(BannedBooksContext);
  const { handleSubmit } = useContext(SearchResultsContext);

  return (
    <SearchInputProvider data={stateData}>
      <SelectedBookProvider>
        <InputForm placeholder={placeholder} handleSubmit={handleSubmit} />
      </SelectedBookProvider>
    </SearchInputProvider>
  );
}

export default SearchContainer;
