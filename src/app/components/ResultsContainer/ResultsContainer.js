import React from "react";
import Card from "../Card";

function ResultsContainer({ results }) {
  return (
    <ul>
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
