import { ApolloProvider } from '@apollo/client'
import { Box, NativeBaseProvider, useColorMode } from 'native-base'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import AppContext from '../shared/context/appContext'
import { client } from '../../apollo-client'
import { theme } from '../shared/theme/customTheme'
import { useEffect } from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  function someFunction() {
    console.log('from context')
  }

  return (
    <AppContext.Provider value={{ someFunction }}>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <NativeBaseProvider theme={theme} isSSR>
            <AppWrapper Component={Component} pageProps={pageProps} />
          </NativeBaseProvider>
        </ApolloProvider>
      </SessionProvider>
    </AppContext.Provider>
  )
}

function AppWrapper({ Component, pageProps }: any) {
  const { colorMode } = useColorMode()
  useEffect(() => {
    console.log(colorMode)
  }, [colorMode])
  return (
    <Box h='100%' bg={colorMode === 'dark' ? 'darkPrimary' : 'lightPrimary'}>
      <Component {...pageProps} />
    </Box>
  )
}
