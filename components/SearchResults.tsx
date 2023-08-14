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
    // {
    //   results.length &&
    //     (<ul className={`${className}`}>
    //       {results.map((item) => {
    //           return (<li>{item.name}</li>)
    //         })
    //       }
    //       </ul>)
    // }
    // <ul className={`${className}`}>
    //   {results.length
    //     ? results.map((item) => {
    //       return (<li>{item.name}</li>)
    //     })
    //     : <li>No results found</li>
    //   }
    // </ul>
  )
}

export default SearchResults;