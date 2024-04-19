import React from "react";
import FlexContainer from "./components/FlexContainer";
import Search from "./components/Search";
import StateDataProvider from "./components/StateDataProvider";
import ResultsContainer from "./components/ResultsContainer";
import { promises as fs } from "fs";

async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/assets/books.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <main>
      <FlexContainer className="xs:flex-col xs:max-w-sm">
        <div className="text-center">
          <h1 className="mt-16 text-4xl">
            Banned Prison Books is a tool for finding books that have been
            banned in state prison systems.
          </h1>
          <p className="opacity-50 my-10">
            Search for books below. Or, explore the API.
          </p>
        </div>
        <StateDataProvider>
          <Search label={`I'm looking for books in ...`} />
        </StateDataProvider>
        <ResultsContainer className="mt-60" results={data} />
      </FlexContainer>
    </main>
  );
}
export default Home;
