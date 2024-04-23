import React from "react";
import FlexContainer from "../FlexContainer";

function Card({ data }) {
  const { publication, author, reason, date } = data;

  return (
    <FlexContainer className="flex-col w-full border border-green-900 px-3 py-2">
      <FlexContainer className="w-full justify-between">
        <p className="text-gray-600">
          {author ? author : "No author recorded"}
        </p>
        <p className="text-gray-600 justify-end">
          {date ? date : "No date provided"}
        </p>
      </FlexContainer>
      <h3 className="font-medium text-xl mt-4">
        {publication ? publication : "Title"}
      </h3>
      <p className=" text-gray-800 mt-4">
        {reason ? reason : "No reason provided"}
      </p>
    </FlexContainer>
  );
}

export default Card;
