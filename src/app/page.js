import React from "react";
import FlexContainer from "./components/UI/FlexContainer";
import Search from "./components/Search";
import StateDataProvider from "./components/Providers/StateDataProvider";
import SearchResultsProvider from "./components/Providers/SearchResultsProvider";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";

async function Home() {
  // const file = await fs.readFile(
  //   process.cwd() + "/src/app/assets/books.json",
  //   "utf8"
  // );
  // const data = JSON.parse(file);

  return (
    <main>
      <FlexContainer className="xs:flex-col xs:max-w-sm">
        <div className="text-center">
          <h1 className="text-4xl">
            Find books that have been banned in state prison systems.
          </h1>
          <p className="opacity-50 my-10">
            Search for books below. Or, explore the API.
          </p>
        </div>
        <SearchResultsProvider>
          <FlexContainer className="gap-x-2">
            <StateDataProvider>
              <Search placeholder={`I'm looking for books in ...`} />
            </StateDataProvider>
            {/* <Filter></Filter> */}
          </FlexContainer>
          <SearchResults className="mt-8" />
        </SearchResultsProvider>
      </FlexContainer>
    </main>
  );
}
export default Home;
