"use client";
import React, { useState } from "react";
import FilterDialog from "../FilterDialog";
import FilterProvider from "../Providers/FilterProvider";

function Filter() {
  const [activeFilters, setActiveFilters] = useState([]);

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
export default Filter;
