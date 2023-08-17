'use client'

import { useEffect, useReducer } from 'react';
import Flex from '@/components/Flex';
import AutocompleteResults from './AutocompleteResults';
import SearchResults from './SearchResults';
// import books from '@/assets/banned-books.json';
import states from '@/utils/states.json';
import supabase from '@/utils/supabase';
import { stateToAbbrev } from '@/utils/utils';
import { Tables } from '../types/database.types';

type State = {
  query: string,
  suggestions: { name: string, abbreviation: string }[],
  results: Tables<'books'>[], 
  showSuggestions: boolean,
  showResults: boolean
}

type Action =
  | { type: 'set-query'; payload: {query: string, showSuggestions: boolean, suggestions?: { name: string, abbreviation: string }[]} }
  | { type: 'set-suggestions'; payload: { suggestions: { name: string, abbreviation: string }[] } }
  | {
    type: 'set-results'; payload: {
      results: {
        author: string | null
        date: string | null
        id: string
        publication: string | null
        reason: string | null
        state_arc: string | null
      }[] | null, showResults: boolean }
    }

const initState: State = {
  query: '',
  suggestions: [],
  results: [],
  showSuggestions: false,
  showResults: false
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set-query': {
      const { query, showSuggestions} = action.payload;
      return { ...state, query: query, showSuggestions: showSuggestions, suggestions: [] };
    }
    case 'set-suggestions': {
      const { suggestions } = action.payload;
      const newSuggestions = [...suggestions];
      return { ...state, suggestions: newSuggestions}
    }
    case 'set-results': {
      const { results, showResults } = action.payload;
      if (results) {
        const newResults = [...results]
        return { ...state, results: newResults, showResults: showResults}
      };
      return { ...state, results: [], showResults: false}
    }
    default:
      return initState;
  }
};

const SearchBar = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleQuery = ((e) => {
    dispatch({ type: 'set-query', payload: { query: e.target.value, showSuggestions: e.target.value.length > 0 } });
  });

  const handleClick = ((e) => {
    if (e.target.nodeName === 'LI') {
      dispatch({ type: 'set-query', payload: { query: e.target.innerText, showSuggestions: false } });
    }
  })

  const handleSubmit = (async (e) => {
    e.preventDefault();
    const abbrev = stateToAbbrev[state.query.toLowerCase()];
    const { data } = await supabase.from('books').select().eq('state_arc', abbrev);
    dispatch({ type: 'set-results', payload: { results: data, showResults: true } });
    console.log(data);
  })
  
  useEffect(() => {
    const getResults = () => {
      if (state.query.length < 1) {
        dispatch({ type: 'set-suggestions', payload: { suggestions: [] } })
      } else {
        const filtered = states.filter((item) => item.name.toLowerCase().includes(state.query.toLowerCase()));
        dispatch({ type: 'set-suggestions', payload: { suggestions: filtered}})
      }

    }

    getResults();
  }, [state.query])

  return (
    <Flex className='xs:justify-between mt-16 text-base'>
      <Flex className='flex-col'>
        <Flex className='flex-auto min-w-0 relative ml-2'>
          <form className='relative flex' autoComplete='off' onSubmit={handleSubmit}>
            <label className='text-left  shrink-0' htmlFor='search'>I'm looking for books in ...</label>
            <Flex className='relative'>
              <input className='px-2 py-1 border rounded-md' value={state.query} onChange={handleQuery} type='text' placeholder='State' id='search' />
              <button className='border px-2 py-1' type='submit'>Submit</button>
              {state.showSuggestions &&
                <AutocompleteResults className='mt-2 py-2 border absolute top-8 rounded-md text-left w-full bg-white' onClick={handleClick} suggestions={state.suggestions} />
              }
            </Flex>
          </form>
        </Flex>
        {state.showResults && 
          <SearchResults className='' results={state.results} />
        }
      </Flex>
    </Flex>
  )
}

export default SearchBar;