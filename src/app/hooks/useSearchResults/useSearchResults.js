import { useContext } from "react";
import { SearchResultsContext } from "../Providers/SearchResultsProvider";

export function useSearchResults() {
  const context = useContext(SearchResultsContext);

  if (context === undefined) {
    throw new Error(
      "useSearchResults must be used within a SearchResultsProvider"
    );
  }

  return useContext;
}
