import React, { useState, useEffect, useRef, useContext } from "react";
import FlexContainer from "../UI/FlexContainer";
import { FilterContext } from "../Providers/FilterProvider";

function SegmentedControl({ name, segments }) {
  const { handleToggleSelected, handleIsSelected } = useContext(FilterContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightW, setHighlightW] = useState(0);
  const [highlightPos, setHighlightPos] = useState(0);

  // useEffect(() => {
  //   const activeSegmentRef = segments[activeIndex].ref;
  //   const { offsetWidth, offsetLeft } = activeSegmentRef.current;
  //   setHighlightW(offsetWidth);
  //   setHighlightPos(offsetLeft);
  // }),
  //   [activeIndex, handleToggleSelected, segments];

  function onInputChange(value, index) {
    setActiveIndex(index);
    // callback(value, index);
    handleToggleSelected("SORT", value);
  }

  function isSelected(value) {
    return handleIsSelected("SORT", value);
  }

  return (
    <FlexContainer>
      <FlexContainer
        className={`justify-evenly ring-1 ring-black rounded-lg m-auto relative`}
      >
        {segments.map((segment, i) => {
          return (
            <div
              key={segment.value}
              className={` ${i === 0 ? "rounded-tl-lg rounded-bl-lg" : ""} ${
                i === segments.length - 1 ? "rounded-tr-lg rounded-br-lg" : ""
              } flex cursor-pointer relative ${
                isSelected(segment.value) ? `bg-black text-white` : ""
              }`}
              ref={segment.ref}
            >
              <input
                type="radio"
                value={segment.value}
                id={segment.label}
                name={name}
                onChange={() => onInputChange(segment.value, i)}
                className="opacity-0 absolute cursor-pointer"
              />
              <label
                className="cursor-pointer px-16 py-6"
                htmlFor={segment.label}
              >
                {segment.label}
              </label>
            </div>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
}

export default SegmentedControl;
