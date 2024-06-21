import React, { useEffect, useState } from "react";
import OptionButton from "../OptionButton";

function ButtonGroup({ buttons, data, handleFilter }) {
  const [activeButtons, setActiveButtons] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function handleClick(button) {
    let newButtons = [];
    // let newData = data.filter((data) => {
    //   const year = data.date.split("-")[0];
    //   return year === button;
    // });

    // // console.log(newData.length);
    if (activeButtons.includes(button)) {
      newButtons = activeButtons.filter(
        (activeButton) => activeButton != button
      );
    } else {
      newButtons = [...activeButtons, button];
    }
    console.log(newButtons);
    setActiveButtons(newButtons);
  }

  useEffect(() => {
    let newData = data.filter((data) => {
      const year = data.date.split("-")[0];
      return activeButtons.includes(year);
    });
    handleFilter(newData);

    console.log(newData.length);
  }, [activeButtons]);

  function isActive(button) {
    return activeButtons.includes(button);
  }

  return buttons.map((button, idx) => {
    return (
      <OptionButton
        option={button}
        active={() => isActive(button)}
        handleClick={handleClick}
      />
    );
  });
}

export default ButtonGroup;
