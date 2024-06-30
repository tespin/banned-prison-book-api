"use client";
import React, { useState } from "react";
import FilterDialog from "../FilterDialog";

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
    // console.log(newButtons);
    setActiveFilters(newFilters);
  }

  return (
    <FilterDialog
      handleActiveFilters={handleActiveFilters}
      activeFilters={activeFilters}
    />
  );
}

export default Filter;
