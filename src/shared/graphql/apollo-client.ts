import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = new HttpLink({
  uri: 'https://boilerplate-backend.herokuapp.com/graphql',
  credentials: 'include'
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
