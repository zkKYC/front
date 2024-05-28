import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation/";
import Footer from "./components/footer";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zkKYC",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Flex direction="column" minH="100vh">
            <Navigation />
            <Box flex="1">{children}</Box> <br />
            <Footer />
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
