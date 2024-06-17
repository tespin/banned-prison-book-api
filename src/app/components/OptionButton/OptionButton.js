"use client";
import React, { useState } from "react";

function OptionButton({ option }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    setIsSelected(!isSelected);
  }

  return (
    <button
      className={`ring-inset hover:ring-black hover:bg-gray-400/10  ${
        isSelected ? "ring-2 ring-black" : "ring-1 ring-gray-400"
      } px-8 py-2 rounded-xl `}
      onClick={handleClick}
      type="button"
    >
      {option}
    </button>
  );
}

export default OptionButton;
