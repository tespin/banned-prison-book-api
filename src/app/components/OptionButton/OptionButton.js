"use client";
import React from "react";

function OptionButton({ className, option, active, handleClick }) {
  const isActive = active(option);

  return (
    <button
      className={`w-auto ring-inset hover:ring-black hover:bg-gray-400/10  ${
        isActive ? "ring-2 ring-black" : "ring-1 ring-gray-400"
      } px-8 py-2 rounded-xl ${className ? className : ""}`}
      onClick={() => {
        handleClick(option);
      }}
      type="button"
      key={option}
    >
      {option}
    </button>
  );
}

export default OptionButton;
