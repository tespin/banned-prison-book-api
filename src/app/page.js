import React from "react";
import FlexContainer from "./components/UI/FlexContainer";
import SearchContainer from "./components/Search/SearchContainer";
import BannedBooksProvider from "./components/Providers/BannedBooksProvider";
import SearchResultsProvider from "./components/Providers/SearchResultsProvider";
import SearchResults from "./components/Search/SearchResults/ResultsCard";

async function Home() {
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
            <BannedBooksProvider>
              <SearchContainer placeholder={`I'm looking for books in ...`} />
            </BannedBooksProvider>
          </FlexContainer>
          <SearchResults className="mt-8" />
        </SearchResultsProvider>
      </FlexContainer>
    </main>
  );
}
export default Home;
