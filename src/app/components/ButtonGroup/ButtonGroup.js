import React, { useEffect, useContext } from "react";
import { FilterContext } from "../Providers/FilterProvider";
import OptionButton from "../OptionButton";

function ButtonGroup({ data, type, handleFilter }) {
  const { filters, options, handleToggleSelected, handleIsSelected } =
    useContext(FilterContext);

  // function handleClick(value) {
  //   handleActiveFilters(value);
  // }

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
    // console.log(type);
  }, [filters]);

  function isSelected(value) {
    return handleIsSelected("YEARS", value);
  }

  return options.years.map((option) => {
    return (
      <OptionButton
        selected={isSelected}
        handleClick={handleToggleSelected}
        value={option}
        key={option}
        optionType={type}
      >
        {option}
      </OptionButton>
    );
  });
}

export default ButtonGroup;
