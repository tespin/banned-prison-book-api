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

  const extractYears = (data) => {
    return data
      .map((item) => (item.date ? item.date.split("-")[0] : "Unrecorded"))
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

  function handleFilterData() {
    let newData = data.filter((data) => {
      if (filters.years.length === 0) return data;
      if (!data.date) return filters.years.includes("Unrecorded");

      return filters.years.includes(data.date.split("-")[0]);
    });

    newData.sort((a, b) => {
      if (filters.sort === "asc") {
        if (!a.date) return -1;
        if (!b.date) return 1;
        if (!a.date && !b.date) {
          return a.publication.localeCompare(b.publication);
        }

        return a.date.split("-")[0] - b.date.split("-")[0];
      } else {
        if (!a.date) return 1;
        if (!b.date) return -1;
        if (!a.date && !b.date) {
          return b.publication.localeCompare(a.publication);
        }
        return b.date.split("-")[0] - a.date.split("-")[0];
      }
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
