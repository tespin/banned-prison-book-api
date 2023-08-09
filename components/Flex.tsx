type FlexProps = {
  children: React.ReactNode;
  className?: string; 
}

const Flex = ({ children, className }: FlexProps) => {
  return (
    <div className={`flex ${className ? className : ''}`}>
      {children}
    </div>
  )
}

export default Flex;