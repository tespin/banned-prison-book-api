type SearchProps = {
  className: string;
  results: { name: string, abbreviation: string }[]
}

const SearchResults = ({ className, results }: SearchProps) => {
  return (
    <>
      {results.length
        ? <ul className={`${className}`}>
          {results.map((item) => {
            return (<li>{item.name}</li>)
          })}
        </ul>
        : null
      }
    </>
  )
}

export default SearchResults;