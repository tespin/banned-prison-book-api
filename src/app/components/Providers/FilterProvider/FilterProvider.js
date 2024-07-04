import React, { createContext, useReducer } from "react";

export const FilterContext = createContext();

function reducer(filters, action) {
  switch (action.type) {
    case "SORT":
      return { ...filters, sort: action.payload };
    case "YEARS":
      let years = [...new Set(action.payload)];
      years.sort((a, b) => a - b);

      return { ...filters, years };
    default:
      return filters;
  }
}

function FilterProvider({ children }) {
  const [filters, dispatch] = useReducer(reducer, {
    sort: "ascending",
    years: [],
  });

  function handleSort(sort) {
    dispatch({ type: "SORT", payload: sort });
  }

  function handleYears(years) {
    dispatch({ type: "YEARS", payload: years });
  }

  function handleIsSelected(value) {
    switch (type) {
      case "SORT":
        return filters.sort === value;
      case "YEARS":
        return filters.years.includes(value);
    }
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        handleSort,
        handleYears,
        handleIsSelected,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
