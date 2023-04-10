import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { client } from '../shared/graphql/apollo-client'
import { Toaster } from 'react-hot-toast'
import { Global, css, ThemeProvider, Theme } from '@emotion/react'
import { Colors } from '../shared/ui/constants'
import { useState } from 'react'
import { dayTheme } from '../shared/ui/theme/dayTheme'
import { nightTheme } from '../shared/ui/theme/nightTheme'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const [theme, setTheme] = useState('day')

  function toggleTheme() {
    setTheme(theme === 'day' ? 'night' : 'day')
  }

  const globalStyles = css`
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      background-color: ${Colors.black};
    }
  `

  return (
    <>
      {/* <button onClick={toggleTheme}>Toggle theme</button> */}
      <ThemeProvider theme={theme === 'day' ? dayTheme : nightTheme}>
        <SessionProvider session={session}>
          <ApolloProvider client={client}>
            <Global styles={globalStyles} />
            <Component {...pageProps} />
            <Toaster />
          </ApolloProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
