"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { SearchResultsContext } from "../SearchResultsProvider";

export const FilterContext = createContext();

function reducer(filters, action) {
  switch (action.type) {
    case "toggle-sort":
      return { ...filters, sort: action.payload };
    case "toggle-years":
      let newYears = [];
      if (filters.years.includes(action.payload)) {
        newYears = filters.years.filter((year) => year !== action.payload);
      } else {
        newYears = [...filters.years, action.payload];
      }

      return { ...filters, years: newYears };
    default:
      return filters;
  }
}

function FilterProvider({ children }) {
  const [filters, dispatch] = useReducer(reducer, {
    sort: "ascending",
    years: [],
  });
  const [options, setOptions] = useState({
    sort: ["ascending", "descending"],
    years: [],
  });
  const { data, setFilteredData } = useContext(SearchResultsContext);

  useEffect(() => {
    const years = data.map((item) => {
      if (!item.date) return "Unrecorded";

      return item.date.split("-")[0];
    });

    let yearSet = [...new Set(years)];
    yearSet.sort((a, b) => a - b);

    setOptions({ ...options, years: yearSet });
  }, [data]);

  function handleToggleSelected(filterType, value) {
    switch (filterType) {
      case "YEARS":
        dispatch({ type: "toggle-years", payload: value });
      default:
        return;
    }
  }

  function handleIsSelected(type, value) {
    switch (type) {
      case "SORT":
        return filters.sort === value;
      case "YEARS":
        console.log("checked selected for value");
        return filters.years.includes(value);
      default:
        return;
    }
  }

  function handleFilterData() {
    let newData = data.filter((data) => {
      if (!data.date) return filters.years.includes("Unrecorded");

      return filters.years.includes(data.date.split("-")[0]);
    });

    newData.sort((a, b) => {
      if (filters.sort === "ascending") {
        return a.date - b.date;
      }

      return b.date - a.date;
    });

    setFilteredData(newData);
  }

  return (
    <FilterContext.Provider
      value={{
        options,
        filters,
        handleToggleSelected,
        handleIsSelected,
        handleFilterData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
