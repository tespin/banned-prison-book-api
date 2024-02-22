import React, { useState, createContext, useContext } from "react";
import { SearchInputContext } from "../SearchInputProvider";

export const ActiveItemContext = createContext();

function ActiveItemProvider({ children }) {
  const { filtered, setValue } = useContext(SearchInputContext);
  const [activeIndex, setActiveIndex] = useState(-1);

  function handleKeyDown(e) {
    let newIndex;

    switch (e.key) {
      case "ArrowUp":
        if (activeIndex <= 0) {
          newIndex = filtered.length - 1;
        } else {
          newIndex = activeIndex - 1;
        }
        break;
      case "ArrowDown":
        if (activeIndex === -1 || activeIndex >= filtered.length - 1) {
          newIndex = 0;
        } else {
          newIndex = activeIndex + 1;
        }
        break;
      case "Enter":
        const newValue = filtered[activeIndex].name;

        setValue(newValue);
        break;
      default:
        return;
    }
    console.log(newIndex);

    setActiveIndex(newIndex);
    // switch(e.key)
  }

  return (
    <ActiveItemContext.Provider
      value={{ activeIndex, setActiveIndex, handleKeyDown }}
    >
      {children}
    </ActiveItemContext.Provider>
  );
}

export default ActiveItemProvider;
