import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { client } from '../graphql/apollo-client'
import { Toaster } from 'react-hot-toast'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }

  const theme = extendTheme(
    { config },
    {
      colors: {
        brand: {
          100: '#3d84f7'
        }
      },
      styles: {
        global: () => ({
          body: {
            bg: 'whiteAlpha.200'
          }
        })
      }
    }
  )

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}
