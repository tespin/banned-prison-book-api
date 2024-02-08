import React from "react";

function FlexContainer({ children, className }) {
  return (
    <div className={`flex ${className ? className : undefined}`}>
      {children}
    </div>
  );
}

export default FlexContainer;
