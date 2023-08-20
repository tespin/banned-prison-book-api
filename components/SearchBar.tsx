'use client'

import { useEffect, useReducer } from 'react';
import Flex from '@/components/Flex';
import AutocompleteResults from './AutocompleteResults';
import SearchResults from './SearchResults';
// import books from '@/assets/banned-books.json';
import states from '@/utils/states.json';
import supabase from '@/utils/supabase';
import { getRange, stateToAbbrev } from '@/utils/utils';
import { Tables } from '../types/database.types';

type State = {
  query: string,
  suggestions: { name: string, abbreviation: string }[],
  results: Tables<'books'>[], 
  showSuggestions: boolean,
  showResults: boolean,
  activeIndex: number,
  currentPage: number,
  isLoading: boolean
}

type Action =
  | { type: 'set-query'; payload: {query: string, showSuggestions: boolean, suggestions?: { name: string, abbreviation: string }[]} }
  | { type: 'set-suggestions'; payload: { suggestions: { name: string, abbreviation: string }[] } }
  | { type: 'set-results'; payload: { results: Tables<'books'>[], showResults: boolean } }
  | { type: 'set-active-index'; payload: { newIndex: number } }
  | { type: 'set-is-loading'; payload: { newIsLoading: boolean } }
  | { type: 'set-current-page'; payload: { newCurrentPage: number } }

const initState: State = {
  query: '',
  suggestions: [],
  results: [],
  showSuggestions: false,
  showResults: false,
  activeIndex: -1,
  currentPage: 1,
  isLoading: false
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
      return { ...state, results: results, showResults: showResults}
    }
    case 'set-active-index': {
      const { newIndex } = action.payload;
      return {...state, activeIndex: newIndex}
    }
    case 'set-is-loading': {
      const { newIsLoading } = action.payload;
      return {...state, isLoading: newIsLoading}
    }
    case 'set-current-page': {
      const { newCurrentPage } = action.payload;
      return {...state, currentPage: newCurrentPage}
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

  const handleKeyDown = ((e) => {
    let newIndex;
    
    switch (e.key) {
      case 'ArrowUp':
        if (state.activeIndex <= 0) {
          newIndex = state.suggestions.length - 1;
        } else {
          newIndex = state.activeIndex - 1;
        }
        dispatch({ type: 'set-active-index', payload: { newIndex: newIndex } });
        break;
      case 'ArrowDown':
        if (state.activeIndex === -1 || state.activeIndex >= state.suggestions.length - 1) {
          newIndex = 0;
        } else {
          newIndex = state.activeIndex + 1;
        }
        dispatch({ type: 'set-active-index', payload: { newIndex: newIndex } });
        break;
      case 'Enter':
        const activeSuggestion = state.suggestions[state.activeIndex].name;
        dispatch({ type: 'set-query', payload: { query: activeSuggestion, showSuggestions: false } });
      default:
        return;
    }
  })

  const handleSubmit = (async (e) => {
    e.preventDefault();
    const page = 1;
    const numPerPage = 10;
    const {from, to} = getRange(page, numPerPage);

    const abbrev = stateToAbbrev[state.query.toLowerCase()];
    const { data } = await supabase.from('books').select().eq('state_arc', abbrev).range(from, to);
    // dispatch({ type: 'set-is-loading', payload: { newIsLoading: true } });

    if (data) {
      const newData = data.map((item) => {
        const newItem = { ...item, showMore: false, isSelected: false };
        return newItem;
      })

      dispatch({ type: 'set-results', payload: { results: newData, showResults: true } });
    }
    // dispatch({ type: 'set-is-loading', payload: { newIsLoading: false } });
  })

  const handleShowReason = ((e, index) => {
    let results = [...state.results];
    let result = results[index];
    result.showMore = !result.showMore;

    results[index] = result;
    dispatch({ type: 'set-results', payload: { results: results, showResults: true } });
  })

  const handleLoadMore = ( async () => {
    console.log('load more pressed');
    const newPage = state.currentPage + 1;
    dispatch({ type: 'set-current-page', payload: { newCurrentPage: newPage } });;

    const numPerPage = 10;
    const {from, to} = getRange(state.currentPage, numPerPage);

    const abbrev = stateToAbbrev[state.query.toLowerCase()];
    const { data } = await supabase.from('books').select().eq('state_arc', abbrev).range(0, to);
    // dispatch({ type: 'set-is-loading', payload: { newIsLoading: true } });

    if (data) {
      const newData = data.map((item) => {
        const newItem = { ...item, showMore: false, isSelected: false };
        return newItem;
      })

      dispatch({ type: 'set-results', payload: { results: newData, showResults: true } });
    }
  })
 
  useEffect(() => {
    const getSuggestions = () => { 
      if (state.query.length < 1) {
        dispatch({ type: 'set-suggestions', payload: { suggestions: [] } })
      } else {
        const filtered = states.filter((item) => item.name.toLowerCase().includes(state.query.toLowerCase()));

        dispatch({ type: 'set-suggestions', payload: { suggestions: filtered}})
      }

    }

    getSuggestions();
  }, [state.query])

  return (
    <Flex className='xs:justify-between mt-16 text-base'>
      <Flex className='flex-col'>
        <Flex className='flex-auto min-w-0 relative'>
          <form className='relative flex items-center' autoComplete='off' onSubmit={handleSubmit}>
            <label className='text-left shrink-0' htmlFor='search'>I'm looking for books in ...</label>
            <Flex className='relative ml-2 border-b-2'>
              <input className='px-2 py-1 w-full' value={state.query} onChange={handleQuery} onKeyDown={handleKeyDown} type='text' placeholder='State' id='search' />
              <button className='' type='submit'>
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </button>
              {state.showSuggestions &&
                <AutocompleteResults className='mt-2 py-2 border absolute top-8 rounded-md text-left w-full bg-white' onClick={handleClick} suggestions={state.suggestions} activeIndex={state.activeIndex} />
              }
            </Flex>
          </form>
        </Flex>
        {state.showResults && 
          <SearchResults className='mt-2' results={state.results} handleShowReason={handleShowReason} />
        }
        <Flex>
          <button className='border px-2 py-1' onClick={handleLoadMore}>{state.isLoading ? 'Loading ...' : 'Load more'}</button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SearchBar;