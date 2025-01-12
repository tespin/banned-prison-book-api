import React, { useEffect, useContext } from "react";
import { FilterContext } from "../Providers/FilterProvider";
import OptionButton from "../OptionButton";

function ButtonGroup({ data, type, handleFilter }) {
  const { filterState, options, handleToggleSelected, handleIsSelected } =
    useContext(FilterContext);

  useEffect(() => {
    if (filterState.length === 0) {
      handleFilter(data);
      return;
    }

    let newData = data.filter((data) => {
      if (!data.date) return filterState.years.includes("Unrecorded");

      const year = data.date.split("-")[0];
      return filterState.years.includes(year);
    });
    handleFilter(newData);
  }, [filterState]);

  function isSelected(value) {
    return handleIsSelected(type, value);
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
