type SearchProps = {
  className: string;
  results: { name: string, abbreviation: string }[],
  onClick: React.MouseEventHandler;
}

const SearchResults = ({ className, results, onClick }: SearchProps) => {
  return (
    <>
      {results.length > 0
        ? <ul className={`${className}`} onClick={onClick}>
          {results.map((item) => {
            return (<li className='px-2 py-1 hover:bg-neutral-300 focus:bg-neutral-300'>{item.name}</li>)
          })}
        </ul>
        : null
      }
    </>
  )
}

export default SearchResults;