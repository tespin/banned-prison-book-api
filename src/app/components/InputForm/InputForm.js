import React, { useContext, useState, useEffect, useRef } from "react";
import FlexContainer from "../FlexContainer";
import { SearchInputContext } from "../SearchInputProvider";
import { ActiveItemContext } from "../ActiveItemProvider";

function InputForm({ label }) {
  const { filtered, filterData, value, setValue } =
    useContext(SearchInputContext);
  const { handleKeyDown, activeIndex, setActiveIndex, selectedRef } =
    useContext(ActiveItemContext);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  function handleDisplayDropdown() {
    setIsActive(!isActive);
  }

  function handleChange(e) {
    setValue(e.target.value);
    filterData(e.target.value);
  }

  function handleListClick(e) {
    setValue(e.target.innerHTML);
    setIsActive(false);
  }

  function handleOutsideClick(e) {
    if (e.target !== inputRef.current) {
      setIsActive(false);
    }
  }

  return (
    <form>
      <FlexContainer className="relative focus-within:ring focus-within:ring-neutral-300 rounded-md pointer-events-none">
        <FlexContainer className="border border-neutral-300 w-full hover:border-neutral-400 focus-within:border-black hover:focus-within:border-black rounded-md justify-between pointer-events-auto">
          <input
            id="search-input"
            type="search"
            value={value}
            onClick={handleDisplayDropdown}
            onChange={(e) => {
              handleChange(e);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            className="relative rounded-md focus:outline-none w-full px-2 py-2 "
            ref={inputRef}
            placeholder={label}
            autoComplete="off"
          />
          <button className="pr-2" type="submit">
            <svg
              width="18"
              height="18"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {isActive && (
            <ul className="absolute mt-2 top-full left-0 w-full max-h-40 shadow-md rounded-md overflow-y-auto ">
              {filtered.map((item, index) => {
                let isSelected = index === activeIndex;

                return (
                  <li
                    ref={isSelected ? selectedRef : null}
                    key={item.id}
                    className={`px-2 py-2 ${
                      isSelected ? "bg-neutral-300" : ""
                    } `}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                    }}
                    onClick={(e) => handleListClick(e)}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          )}
        </FlexContainer>
      </FlexContainer>
    </form>
  );
}

export default InputForm;
