import Flex from './Flex';
import { useState } from 'react';
import { Tables } from '../types/database.types';
import { CaretDownIcon } from '@radix-ui/react-icons';
import SearchItem from './SearchItem';

type ResultsProps = {
  className: string;
  results: Tables<'books'>[];
  handleShowReason: (event: React.MouseEvent, index: number) => void
}

const SearchResults = ({ className, results, handleShowReason }: ResultsProps) => {

  return (
    <>
      {results.length > 0
        ? <ul className={`${className}`}>
          {results.map((item, index) => {
            return <SearchItem item={item} index={index} handleShowReason={handleShowReason} />
          })}
        </ul>
        : null
      }
    </>
  )
}

export default SearchResults;