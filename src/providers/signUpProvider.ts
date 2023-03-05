import { client } from '@/src/graphql/apollo-client'
import UserOperations from '@/src/graphql/operations/user'
import { SignUpInput, SignUpResponse } from '@/src/util/types'
import CredentialsProvider from 'next-auth/providers/credentials'
import stripe from '../util/stripe'

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
    //whenever a new user signs up create a new stripe customer
    const newCustomer = await stripe.customers.create({
      email: credentials.email
    })

    //add the email, password, and stipeCustomerId to the database
    const signUp = UserOperations.Mutations.signUp
    const signUpResponse = await client.mutate<SignUpResponse, SignUpInput>({
      mutation: signUp,
      variables: {
        email: credentials.email,
        password: credentials.password,
        stripeCustomerId: newCustomer.id
      }
    })

    const { data } = signUpResponse
    const user = data?.signUp

    if (user) {
      return user
    }
    return null
  }
})

export default signUp
