import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { client } from '../shared/graphql/apollo-client'
import { Toaster } from 'react-hot-toast'
import { Global, css } from '@emotion/react'
import { Colors } from '../shared/ui/constants'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const globalStyles = css`
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      background-color: ${Colors.black};
    }
  `
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
        <Toaster />
      </ApolloProvider>
    </SessionProvider>
  )
}
