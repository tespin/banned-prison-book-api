import React from "react";
import Card from "../Card";

function ResultsContainer({ results, className }) {
  return (
    <ul className={`${className ? className : ""}`}>
      {results.map((item) => {
        // console.log(result);
        return <Card data={item} />;
      })}
    </ul>
  );
  // console.log(results);

  // return results.map((result) => {
  //   return <Card data={result} />;
  // });
}

export default ResultsContainer;
