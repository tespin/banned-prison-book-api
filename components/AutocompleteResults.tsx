type AutocompleteProps = {
  className: string;
  suggestions: { name: string, abbreviation: string }[],
  onClick: React.MouseEventHandler;
}

const AutocompleteResults = ({ className, suggestions, onClick }: AutocompleteProps) => {
  return (
    <>
      <ul className={`${className}`} onClick={onClick}>
          {suggestions.map((item) => {
            return (<li className='px-2 py-1 hover:bg-neutral-300 focus:bg-neutral-300 cursor-default'>{item.name}</li>)
          })}
        </ul>
    </>
  )
}

export default AutocompleteResults;