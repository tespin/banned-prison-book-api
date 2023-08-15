'use client'

import { useEffect, useReducer } from 'react';
import Flex from '@/components/Flex';
import SearchResults from './SearchResults';
import states from '@/utils/states.json';

type State = {
  query: string,
  results: { name: string, abbreviation: string }[],
  showResults: boolean
}

type Action =
  | { type: 'set-query'; payload: {query: string, showResults: boolean} }
  | { type: 'set-results'; payload: { results: { name: string, abbreviation: string }[] } }

const initState: State = {
  query: '',
  results: [],
  showResults: false
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set-query': {
      const { query, showResults } = action.payload;
      return { ...initState, query: query, showResults: showResults };
    }
    case 'set-results': {
      const { results } = action.payload;
      const newResults = [...state.results, ...results];
      return { ...state, results: newResults}
    }
    default:
      return initState;
  }
};

const SearchBar = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleQuery = ((e) => {
    dispatch({ type: 'set-query', payload: { query: e.target.value, showResults: true } });
  });

  const handleClick = ((e) => {
    if (e.target.nodeName === 'LI') {
      dispatch({ type: 'set-query', payload: { query: e.target.innerText, showResults: false } });
    }
  })
  
  useEffect(() => {
    const getResults = () => {
      if (state.query.length < 1) {
        dispatch({ type: 'set-results', payload: { results: [] } })
      } else {
        const filtered = states.filter((item) => item.name.toLowerCase().includes(state.query.toLowerCase()));
        dispatch({ type: 'set-results', payload: { results: filtered}})
      }

    }

    getResults();
  }, [state.query])

  return (
    <Flex className='xs:justify-between mt-16 text-base'>
      <Flex className='items-center'>
        <label className='text-left  shrink-0' htmlFor='search'>I'm looking for books in ...</label>
        <Flex className='flex-col flex-auto min-w-0 relative ml-2'>
          <input className='px-2 py-1 border rounded-md' value={state.query} onChange={handleQuery} type='text' placeholder='State' id='search' />
          {state.showResults &&
            <SearchResults className='mt-2 py-2 border absolute top-8 rounded-md text-left w-full' onClick={handleClick} results={state.results} />
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SearchBar;