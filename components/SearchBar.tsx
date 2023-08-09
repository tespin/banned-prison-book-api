import Flex from '@/components/Flex';

const SearchBar = () => {
  return (
    <Flex className='xs:justify-between text-base'>
      {/* <p className='basis-2/3'>I'm looking for books ... </p> */}
      <label className='basis-2/3' htmlFor='search'>I'm looking for books in ...</label>
      <input className='border grow min-w-0' type='text' placeholder='State' id='search' />
    </Flex>
  )
}

export default SearchBar;