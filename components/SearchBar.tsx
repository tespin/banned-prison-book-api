'use client'

import { useState } from 'react';
import Flex from '@/components/Flex';

const SearchBar = () => {
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  return (
    <Flex className='xs:justify-between xs:items-center mt-16 text-base'>
      <label className='basis-2/3' htmlFor='search'>I'm looking for books in ...</label>
      <input className='px-2 py-1 border min-w-0' onChange={inputHandler} type='text' placeholder='State' id='search' />
    </Flex>
  )
}

export default SearchBar;