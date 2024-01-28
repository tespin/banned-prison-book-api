import FlexContainer from "./components/FlexContainer";
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FlexContainer className='xs:flex-col xs:items-center w-full'>
          {children}
        </FlexContainer>
      </body>
    </html>
  );
}
