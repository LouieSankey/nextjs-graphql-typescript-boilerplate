import { client } from '@/src/graphql/apollo-client'
import UserOperations from '@/src/graphql/operations/user'
import { SignUpResponse, SignUpInput } from '@/src/util/types'
import CredentialsProvider from 'next-auth/providers/credentials'

export default CredentialsProvider({
  name: '',
  credentials: {
    email: { label: 'Username', type: 'text', placeholder: 'email' },
    password: { label: 'Password', type: 'password' }
  },
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
    console.log('🚀 ~ file: credentials.ts ~ line 27 ~ authorize ~ user', user)

    if (user) {
      return user
    }
    return null
  }
})
