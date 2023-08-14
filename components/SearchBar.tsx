'use client'

import { useEffect, useReducer } from 'react';
import Flex from '@/components/Flex';
import SearchResults from './SearchResults';
import states from '@/utils/states.json';

type State = {
  query: string,
  results: { name: string, abbreviation: string}[]
}

type Action =
  | { type: 'set-query'; payload: string }
  | { type: 'set-results'; payload: { results: { name: string, abbreviation: string}[] } };

const initState: State = {
  query: '',
  results: []
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set-query': {
      return { ...initState, query: action.payload };
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
    dispatch({ type: 'set-query', payload: e.target.value });
  });
  
  useEffect(() => {
    const getResults = () => {
      if (state.query.length < 1) {
        dispatch({ type: 'set-results', payload: { results: []}})
      } else {
        const filtered = states.filter((item) => item.name.toLowerCase().includes(state.query.toLowerCase()));
        dispatch({ type: 'set-results', payload: { results: filtered}})
      }

    }

    getResults();
  }, [state.query])

  return (
    <Flex className='xs:justify-between xs:items-center mt-16 text-base'>
      <label className='basis-2/3' htmlFor='search'>I'm looking for books in ...</label>
      <input className='px-2 py-1 border min-w-0' value={state.query} onChange={handleQuery} type='text' placeholder='State' id='search' />
      <SearchResults results={state.results} />
    </Flex>
  )
}

export default SearchBar;