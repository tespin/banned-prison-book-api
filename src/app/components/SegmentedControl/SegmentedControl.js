import React from "react";

function SegmentedControl({ segments }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {options.map((segment, i) => {
        return (
          <div
            key={segment}
            className={`${i === activeIndex ? "isActive" : ""}`}
          >
            <input
              type="radio"
              value={segment}
              onChange={""}
              active={i === activeIndex}
            />
          </div>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
