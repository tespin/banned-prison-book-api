import Flex from '@/components/Flex';
import Header from '@/components/Header';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Flex className='flex-col'>
          <Header />
          {children}
        </Flex>
      </body>
    </html>
  )
}