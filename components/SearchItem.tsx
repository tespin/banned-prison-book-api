import Flex from './Flex';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

type SearchItemProps = {
  item: {
    author: string | null
    date: string | null
    id: string
    publication: string | null
    reason: string | null
    state_arc: string | null
    showMore: boolean | null
  },
  index: number,
  handleShowReason: (event: React.MouseEvent, index: number) => void
}

const SearchItem = ({ item, index, handleShowReason }: SearchItemProps) => {
  // const [showMore, setShowMore] = useState(false);

  return (
    <li className={`mb-4 focus:bg-neutral-300 border-b-2 pb-4 text-left cursor-default`
}>
              <Flex className='justify-between'>
                <p className='flex-initial'>{item.date?.split('-')[0] || 'No date'}</p>
                <Flex className='flex-col flex-auto ml-4'>
                  <h2>{item.publication}</h2>
                  <p className='text-sm text-neutral-500'>{item.author || 'No author'}</p>
                </Flex>
                <button className='px-2 py-1' onClick={(e) => handleShowReason(e, index)}>
                  <CaretDownIcon/>
                </button>
              </Flex>
              {item.showMore
                && <p className='mt-4'>{item.reason || 'No reason provided by the relevant state.'}</p>
              }
            </li>
  )
}

export default SearchItem;