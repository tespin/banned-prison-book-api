"use client";
import React, { act, useState } from "react";

function OptionButton({ option, active, handleClick }) {
  const isActive = active(option);

  return (
    <button
      className={`w-auto ring-inset hover:ring-black hover:bg-gray-400/10  ${
        isActive ? "ring-2 ring-black" : "ring-1 ring-gray-400"
      } px-8 py-2 rounded-xl `}
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
