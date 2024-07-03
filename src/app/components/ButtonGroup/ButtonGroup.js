import React, { useEffect } from "react";
import OptionButton from "../OptionButton";

function ButtonGroup({
  buttons,
  data,
  handleFilter,
  handleActiveFilters,
  activeFilters,
}) {
  function handleClick(value) {
    handleActiveFilters(value);
  }

  useEffect(() => {
    if (activeFilters.length === 0) {
      handleFilter(data);
      return;
    }

    let newData = data.filter((data) => {
      const year = data.date.split("-")[0];
      return activeFilters.includes(year);
    });
    handleFilter(newData);
  }, [activeFilters]);

  function isActive(value) {
    return activeFilters.includes(value);
  }

  return buttons.map((button) => {
    return (
      <OptionButton
        option={button}
        active={() => isActive(button)}
        handleClick={handleClick}
        key={button}
      />
    );
  });
}

export default ButtonGroup;
