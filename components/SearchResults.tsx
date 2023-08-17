import { Tables } from '../types/database.types';

type ResultsProps = {
  className: string;
  results: Tables<'books'>[];
}

const SearchResults = ({ className, results }: ResultsProps) => {
  return (
    <>
      {results.length > 0
        ? <ul className={`${className}`}>
          {results.map((item) => {
            return (<li className='mb-4 hover:bg-neutral-300 focus:bg-neutral-300 text-left cursor-default'>
              <h2>{item.publication}</h2>
              <p>{item.author}</p>
              <p>{item.date}</p>
            </li>)
          })}
        </ul>
        : null
      }
    </>
  )
}

export default SearchResults;