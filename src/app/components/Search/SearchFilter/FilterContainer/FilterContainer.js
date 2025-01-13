"use client";
import React, { useState, useContext } from "react";
import FilterDialog from "../FilterDialog";
import FilterProvider from "../../../Providers/FilterStateProvider";
import { SearchResultsContext } from "../../../Providers/SearchResultsProvider";

function FilterContainer() {
  const [activeFilters, setActiveFilters] = useState([]);
  const { data, setFilteredData } = useContext(SearchResultsContext);

  function handleActiveFilters(filter) {
    let newFilters = [];

    if (activeFilters.includes(filter)) {
      newFilters = activeFilters.filter(
        (activeFilter) => activeFilter != filter
      );
    } else {
      newFilters = [...activeFilters, filter];
    }
    setActiveFilters(newFilters);
  }

  return (
    <FilterProvider>
      <FilterDialog
        handleActiveFilters={handleActiveFilters}
        activeFilters={activeFilters}
      />
    </FilterProvider>
  );
}
export default FilterContainer;
