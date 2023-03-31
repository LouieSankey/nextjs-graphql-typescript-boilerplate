import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createServer } from 'http'

let API_URL: string
if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.NEXT_PUBLIC_DEV_API
} else {
  API_URL = process.env.NEXT_PUBLIC_PROD_API
}

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'include'
})
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
