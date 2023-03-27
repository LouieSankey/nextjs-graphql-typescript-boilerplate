import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { client } from '../shared/graphql/apollo-client'
import { Toaster } from 'react-hot-toast'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }

  const brandPallet = {
    50: '#d8fdff',
    100: '#acf1ff',
    200: '#7ee7fc',
    300: '#4edcf9',
    400: '#22d2f6',
    500: '#09b8dd',
    600: '#008fad',
    700: '#00667d',
    800: '#003e4d',
    900: '#00161f'
  }

  const theme = extendTheme({
    colors: {
      brandPallet,
      brand: {
        primary: brandPallet['600'],
        secondary: brandPallet['400']
      }
    },
    styles: {
      global: {
        body: {
          bg: 'gray.800',
          color: 'white'
        }

        // add other global styles here
      }
    },
    components: {
      Button: {}
    }
  })

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster />
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
