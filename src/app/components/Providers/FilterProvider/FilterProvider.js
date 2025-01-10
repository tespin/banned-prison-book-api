"use client";
import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useMemo,
} from "react";
import { SearchResultsContext } from "../SearchResultsProvider";

export const FilterContext = createContext();

const initialState = {
  sort: "asc",
  years: [],
};

// reducer for handling updates to filter state
function reducer(state, action) {
  switch (action.type) {
    case "toggle-sort": // switches sort direction
      return { ...state, sort: action.payload };
    case "toggle-years": // adds/removes years from filter
      const newYears = state.years.includes(action.payload)
        ? state.years.filter((year) => year !== action.payload)
        : [...state.years, action.payload];
      return { ...state, years: newYears };
    case "reset": // return to initial state
      return initialState;
    default:
      return state;
  }
}

function FilterProvider({ children }) {
  const [filterState, dispatch] = useReducer(reducer, initialState);
  const { data, setFilteredData, status } = useContext(SearchResultsContext);

  // util function for extracting year from date string
  // returns "Unrecorded" if no date is provided
  const getYear = (date) => {
    return date ? date.split("-")[0] : "Unrecorded";
  };

  // extract unique, sorted array of years from data
  const extractYears = (data) => {
    return data
      .map((item) => getYear(item.date))
      .filter((year, index, self) => self.indexOf(year) === index) // remove duplicates
      .sort((a, b) => a - b);
  };

  // memoize years to prevent unnecessary recalculations
  const extractedYears = useMemo(() => extractYears(data), [data]);

  // reset filter state when data is loading
  useEffect(() => {
    if (status === "loading") {
      dispatch({ type: "reset" });
    }
  }, [status]);

  // handle toggling of filter options
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

  // check if a filter option is selected
  function handleIsSelected(type, value) {
    switch (type) {
      case "SORT":
        return filterState.sort === value;
      case "YEARS":
        return filterState.years.includes(value);
      default:
        return;
    }
  }

  // filter data by selected years, returns all data if no years are selected
  const filterByYear = (data, selectedYears) => {
    if (selectedYears.length === 0) return data;
    return data.filter((item) => {
      const year = getYear(item.date);
      return selectedYears.includes(year);
    });
  };

  // generic value comparison for strings or numbers
  const compareValues = (a, b, direction) => {
    if (direction === "asc") return a < b ? -1 : a > b ? 1 : 0;
    return a > b ? -1 : a < b ? 1 : 0;
  };

  // compare years with special handling for "Unrecorded" values
  const compareYears = (yearA, yearB, direction) => {
    if (yearA === "Unrecorded" && yearB === "Unrecorded") return 0; // if both years are unrecorded, they are equal
    if (yearA === "Unrecorded") return direction === "asc" ? -1 : 1; // if ascending, unrecorded years come first
    if (yearB === "Unrecorded") return direction === "asc" ? 1 : -1; // if descending, unrecorded years come last

    return compareValues(Number(yearA), Number(yearB), direction); // convert years to numbers and compare
  };

  // compare titles alphabetically
  const compareTitles = (a, b, direction) => {
    // localeCompare is a string comparison method that handles special characters and case sensitivity
    return direction === "asc"
      ? a.publication.localeCompare(b.publication)
      : b.publication.localeCompare(a.publication);
  };

  // main sorting function that combines year and title sorting
  const sortData = (data, direction) => {
    return [...data].sort((a, b) => {
      // avoid mutating original data
      const yearA = getYear(a.date);
      const yearB = getYear(b.date);

      const yearComparison = compareYears(yearA, yearB, direction);

      // if the years are equal, compare alphabetically
      // otherwise sort by years respecting the sort direction
      return yearComparison === 0
        ? compareTitles(a, b, direction)
        : yearComparison;
    });
  };

  function handleFilterData() {
    const filtered = filterByYear(data, filterState.years);
    const sorted = sortData(filtered, filterState.sort);
    setFilteredData(sorted);
  }

  const contextValue = useMemo(
    () => ({
      options: {
        sort: ["asc", "desc"],
        years: extractedYears,
      },
      filterState,
      handleToggleSelected,
      handleIsSelected,
      handleFilterData,
    }),
    [filterState, extractedYears]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
