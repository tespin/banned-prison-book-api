type AutocompleteProps = {
  className: string;
  suggestions: { name: string, abbreviation: string }[],
  activeIndex: number
  onClick: React.MouseEventHandler;
}

const AutocompleteResults = ({ className, suggestions, activeIndex, onClick }: AutocompleteProps) => {
  return (
    <>
      <ul className={`${className}`} onClick={onClick}>
        {suggestions.map((item, index) => {
            const isActive = index === activeIndex;
            return (<li className={`px-2 py-1 ${isActive ? 'bg-neutral-300' : ''} hover:bg-neutral-300 focus:bg-neutral-300 cursor-default`}>{item.name}</li>)
          })}
        </ul>
    </>
  )
}

export default AutocompleteResults;