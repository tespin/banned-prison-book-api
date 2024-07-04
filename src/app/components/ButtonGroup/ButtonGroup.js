import React, { useEffect, useContext } from "react";
import { FilterContext } from "../Providers/FilterProvider";
import OptionButton from "../OptionButton";

function ButtonGroup({
  type,
  values,
  data,
  handleFilter,
  handleActiveFilters,
  activeFilters,
}) {
  const { filters, handleIsSelected } = useContext(FilterContext);

  function handleClick(value) {
    handleActiveFilters(value);
  }

  useEffect(() => {
    if (filters.length === 0) {
      handleFilter(data);
      return;
    }

    let newData = data.filter((data) => {
      if (!data.date) return filters.years.includes("Unrecorded");

      const year = data.date.split("-")[0];
      return filters.years.includes(year);
    });
    handleFilter(newData);
  }, [filters]);

  function isActive(value) {
    return activeFilters.includes(value);
  }

  return values.map((value) => {
    return (
      <OptionButton
        isSelected={() => {
          handleIsSelected(type, value);
        }}
        handleClick={handleClick}
        id={value}
      >
        {value}
      </OptionButton>
    );
  });
}

export default ButtonGroup;
