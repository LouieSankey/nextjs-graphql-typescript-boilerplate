import { ApolloProvider } from '@apollo/client'
import { NativeBaseProvider } from 'native-base'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import AppContext from '../shared/context/appContext'
import { client } from '../shared/graphql/apollo-client'

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
          <NativeBaseProvider isSSR>
            <Component {...pageProps} />
          </NativeBaseProvider>
        </ApolloProvider>
      </SessionProvider>
    </AppContext.Provider>
  )
}
