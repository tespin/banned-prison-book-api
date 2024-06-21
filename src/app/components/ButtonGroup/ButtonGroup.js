import React, { useState } from "react";
import OptionButton from "../OptionButton";

function ButtonGroup({ buttons }) {
  const [activeButtons, setActiveButtons] = useState([]);

  function handleClick(button) {
    console.log("clicked");
    let newButtons = [];

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
