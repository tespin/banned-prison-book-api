import React from "react";

import SearchBar from "../SearchBar";
import AutocompleteResults from "../AutocompleteResults";
import StateDataProvider from "../StateDataProvider";
import ActiveItemProvider from "../ActiveItemProvider";

function Search() {
  return (
    <StateDataProvider>
      <ActiveItemProvider>
        <SearchBar>
          <AutocompleteResults />
        </SearchBar>
      </ActiveItemProvider>
    </StateDataProvider>
  );
}

export default Search;
