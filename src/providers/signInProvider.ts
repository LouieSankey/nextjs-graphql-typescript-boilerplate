import { client } from '@/src/graphql/apollo-client'
import UserOperations from '@/src/graphql/operations/user'
import { SignInResponse, SignInInput } from '@/src/util/types'
import CredentialsProvider from 'next-auth/providers/credentials'

const signInProvider = CredentialsProvider({
  id: 'sign-in-provider',
  credentials: {
    email: { label: 'Username', type: 'text', placeholder: 'email' },
    password: { label: 'Password', type: 'password' }
  },

  //authorize will be called whether this is signUp or signIn
  async authorize(credentials, req) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Invalid Credentials')
    }

    const signIn = UserOperations.Mutations.signIn
    const response = await client.mutate<SignInResponse, SignInInput>({
      mutation: signIn,
      variables: {
        email: credentials.email,
        password: credentials.password
      }
    })
    console.log(response)

    const { data } = response

    const user = data?.signIn

    if (user) {
      return user
    }
    return null
  }
})

export default signInProvider
