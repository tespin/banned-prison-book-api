import React from "react";
import FlexContainer from "../FlexContainer";

function Card({ data }) {
  console.log(data);
  const { publication, author, reason, date } = data;

  return (
    <FlexContainer className="w-full border border-green-900">
      <FlexContainer className="flex-col w-full justify-between">
        <FlexContainer className="flex-col">
          <h3>{publication ? publication : "Title"}</h3>
          <p>{author ? author : "No author recorded"}</p>
        </FlexContainer>
        <p>{reason ? reason : "No reason provided"}</p>
      </FlexContainer>
      <p>{date ? date : "No date provided"}</p>
    </FlexContainer>
  );
}

export default Card;
