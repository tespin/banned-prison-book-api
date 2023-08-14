import { getFiltered } from '@/utils/utils';
import states from '@/utils/states.json';

type SearchProps = {
  results: { name: string, abbreviation: string }[]
}

const SearchResults = ({ results }: SearchProps) => {
  return (
    <ul>
      {results.length
        ? results.map((item) => {
          return (<li>{item.name}</li>)
        })
        : <li>No results found</li>
      }
    </ul>
  )
}

export default SearchResults;