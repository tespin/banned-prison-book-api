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

const initialState = {
  sort: "asc",
  years: [],
};

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
    case "reset":
      return initialState;
    default:
      return filters;
  }
}

function FilterProvider({ children }) {
  const [filters, dispatch] = useReducer(reducer, initialState);
  const [options, setOptions] = useState({
    sort: ["asc", "desc"],
    years: [],
  });
  const { data, setFilteredData, status } = useContext(SearchResultsContext);

  const getYear = (date) => {
    return date ? date.split("-")[0] : "Unrecorded";
  };

  const extractYears = (data) => {
    return data
      .map((item) => getYear(item.date))
      .filter((year, index, self) => self.indexOf(year) === index)
      .sort((a, b) => a - b);
  };

  useEffect(() => {
    const yearSet = extractYears(data);

    setOptions((prev) => ({ ...prev, years: yearSet }));
  }, [data]);

  useEffect(() => {
    if (status === "loading") {
      dispatch({ type: "reset" });
    }
  }, [status]);

  function handleToggleSelected(filterType, value) {
    switch (filterType) {
      case "SORT":
        dispatch({ type: "toggle-sort", payload: value });
        break;
      case "YEARS":
        dispatch({ type: "toggle-years", payload: value });
        break;
      default:
        return;
    }
  }

  function handleIsSelected(type, value) {
    switch (type) {
      case "SORT":
        return filters.sort === value;
      case "YEARS":
        return filters.years.includes(value);
      default:
        return;
    }
  }

  const compareTitles = (a, b, direction) => {
    return direction === "asc"
      ? a.publication.localeCompare(b.publication)
      : b.publication.localeCompare(a.publication);
  };

  const filterByYear = (data, selectedYears) => {
    if (selectedYears.length === 0) return data;
    return data.filter((item) => {
      const year = getYear(item.date);
      return selectedYears.includes(year);
    });
  };

  const sortData = (data, direction) => {
    // return data.sort((a, b) => {});
    return data.sort((a, b) => {
      const yearA = getYear(a.date);
      const yearB = getYear(b.date);

      if (yearA === "Unrecorded" && yearB === "Unrecorded") {
        return compareTitles(a, b, direction);
      }

      if (yearA === "Unrecorded") return direction === "asc" ? -1 : 1;
      if (yearB === "Unrecorded") return direction === "asc" ? 1 : -1;

      const comparedYears = direction === "asc" ? yearA - yearB : yearB - yearA;

      return comparedYears === 0
        ? compareTitles(a, b, direction)
        : comparedYears;
    });
  };

  function handleFilterData() {
    const filtered = filterByYear(data, filters.years);
    const sorted = sortData(filtered, filters.sort);
    setFilteredData(sorted);
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
