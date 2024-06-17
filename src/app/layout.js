import FlexContainer from "./components/FlexContainer";
import "./globals.css";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <FlexContainer className="justify-center">
          <FlexContainer className="xs:flex-col xs:max-w-sm">
            <header className="flex my-6 w-full justify-between items-center">
              <FlexContainer className="gap-x-1">
                <Image
                  src="/bpb-logo.png"
                  alt="Banned Prison Books logo"
                  width={24}
                  height={24}
                />
                <p className="text-lg">Banned Prison Books</p>
              </FlexContainer>
              <p className="text-lg">API</p>
            </header>
            {children}
          </FlexContainer>
        </FlexContainer>
      </body>
    </html>
  );
}
