import React from "react";

import SearchBar from "../SearchBar";
import AutocompleteResults from "../AutocompleteResults";
import StateDataProvider from "../StateDataProvider";

function Search() {
  return (
    <StateDataProvider>
      <SearchBar className="mt-10">
        <AutocompleteResults />
      </SearchBar>
    </StateDataProvider>
  );
}

export default Search;
