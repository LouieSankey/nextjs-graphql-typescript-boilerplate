import { client } from '@/src/graphql/apollo-client'
import UserOperations from '@/src/graphql/operations/user'
import { SignUpResponse, SignUpInput } from '@/src/util/types'
import CredentialsProvider from 'next-auth/providers/credentials'

const signUp = CredentialsProvider({
  id: 'sign-up-provider',
  credentials: {
    email: { label: 'Username', type: 'text', placeholder: 'email' },
    password: { label: 'Password', type: 'password' }
  },
  //authorize will be called whether this is signUp or signIn
  async authorize(credentials, req) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Invalid Credentials')
    }

    const signUp = UserOperations.Mutations.signUp
    const response = await client.mutate<SignUpResponse, SignUpInput>({
      mutation: signUp,
      variables: {
        email: credentials.email,
        password: credentials.password
      }
    })

    const { data } = response
    const user = data?.signUp

    if (user) {
      return user
    }
    return null
  }
})

export default signUp
