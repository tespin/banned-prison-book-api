"use client";
import React from "react";

function OptionButton({ className, children, isSelected, id, handleClick }) {
  return (
    <button
      className={`w-auto ring-inset hover:ring-black hover:bg-gray-400/10  ${
        isSelected ? "ring-2 ring-black" : "ring-1 ring-gray-400"
      } px-8 py-2 rounded-xl ${className ? className : ""}`}
      onClick={() => {
        handleClick(id);
      }}
      type="button"
      key={id}
    >
      {children}
    </button>
  );
}

export default OptionButton;
