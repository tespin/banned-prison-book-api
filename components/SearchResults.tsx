type SearchProps = {
  className: string;
  results: { name: string, abbreviation: string }[]
}

const SearchResults = ({ className, results }: SearchProps) => {
  return (
    <ul className={`${className}`}>
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