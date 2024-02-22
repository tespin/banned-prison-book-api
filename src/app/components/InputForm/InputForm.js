import React, { useContext, useState, useEffect, useRef } from "react";
import FlexContainer from "../FlexContainer";

import { SearchInputContext } from "../SearchInputProvider";

function InputForm({ label }) {
  const { filtered, filterData } = useContext(SearchInputContext);
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef();
  const listRef = useRef();

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
  }

  function handleOutsideClick(e) {
    if (e.target !== listRef.current && e.target !== inputRef.current) {
      // console.log("list not ref clicked");
      setIsActive(false);
    }
  }

  return (
    <form>
      <FlexContainer>
        <label htmlFor="search-input" className="shrink-0">
          {label}
        </label>
        <FlexContainer className="relative">
          <input
            id="search-input"
            type="text"
            value={value}
            onClick={handleDisplayDropdown}
            onChange={(e) => {
              handleChange(e);
            }}
            className="relative"
            ref={inputRef}
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
            <ul className="absolute top-full w-full max-h-40 overflow-y-auto z-10">
              {filtered.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="pl-2 py-1 hover:bg-neutral-300"
                    onClick={(e) => handleListClick(e)}
                    ref={listRef}
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
