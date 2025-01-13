import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import { SearchQueryContext } from "../SearchQueryProvider";

export const SelectedBookContext = createContext();

function SelectedBookProvider({ children }) {
  const { filtered, setValue } = useContext(SearchQueryContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedRef = useRef();

  useEffect(() => {
    if (!selectedRef.current) {
      return;
    }

    selectedRef.current.scrollIntoView({
      behavior: "instant",
      block: "nearest",
    });
  }, [activeIndex]);

  function handleKeyDown(e) {
    let newIndex = 0;

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
        if (!filtered || !filtered[activeIndex]) {
          return;
        }

        const newValue = filtered[activeIndex].name;
        setValue(newValue);
        break;
      default:
        return;
    }
    setActiveIndex(newIndex);
  }

  return (
    <SelectedBookContext.Provider
      value={{ activeIndex, setActiveIndex, handleKeyDown, selectedRef }}
    >
      {children}
    </SelectedBookContext.Provider>
  );
}

export default SelectedBookProvider;
