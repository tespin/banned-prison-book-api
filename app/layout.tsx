import Flex from '@/components/Flex';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Flex className='xs:flex-col w-full xs:items-center'>
          <Header />
          <Flex className='xs:flex-col xs:max-w-sm text-2xl text-center'>
            {children}
            <SearchBar/>
          </Flex>
        </Flex>
      </body>
    </html>
  )
}