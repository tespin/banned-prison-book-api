import React, { useContext, useState, useEffect, useRef } from "react";
import FlexContainer from "../FlexContainer";
import Filter from "../Filter";
import * as Dialog from "@radix-ui/react-dialog";
import { SearchInputContext } from "../SearchInputProvider";
import { ActiveItemContext } from "../ActiveItemProvider";
import { SearchResultsContext } from "../SearchResultsProvider";

function InputForm({ placeholder, handleSubmit }) {
  const { filtered, filterData, value, setValue } =
    useContext(SearchInputContext);
  const { totalCount } = useContext(SearchResultsContext);
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
    setIsActive(true);
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

  function handleFocus(e) {
    setIsActive(true);
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, value);
      }}
      className="flex grow"
      role="search"
    >
      <FlexContainer className="relative w-full gap-x-2 ">
        <FlexContainer className="border w-full focus-within:ring focus-within:ring-neutral-300 border-neutral-300 hover:border-neutral-400 focus-within:border-black hover:focus-within:border-black rounded-md justify-between pointer-events-auto">
          <input
            id="search-input"
            type="search"
            value={value}
            onChange={(e) => {
              handleChange(e);
            }}
            onFocus={(e) => {
              handleFocus(e);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            className="relative w-full rounded-md focus:outline-none px-2 py-2 "
            ref={inputRef}
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={isActive}
            aria-label="search text"
            aria-controls="autocomplete"
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
            <ul
              className="absolute mt-2 top-full left-0 w-full max-h-40 shadow-md rounded-md overflow-y-auto bg-white"
              id="autocomplete"
            >
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
        {totalCount > 0 && <Filter />}
        {/* <Dialog.Root>
          <Dialog.Trigger>open dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title />
              <p>test</p>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root> */}
      </FlexContainer>
    </form>
  );
}

export default InputForm;
