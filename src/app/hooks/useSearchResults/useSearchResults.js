import { useContext } from "react";
import { SearchResultsContext } from "@/app/components/Providers/SearchResultsProvider";

export default function useSearchResults() {
  const context = useContext(SearchResultsContext);

  if (context === undefined) {
    throw new Error(
      "useSearchResults must be used within a SearchResultsProvider"
    );
  }

  return context;
}
