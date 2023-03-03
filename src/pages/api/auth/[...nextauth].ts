import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import signInProvider from '@/src/providers/signInProvider'
import signUpProvider from '@/src/providers/signUpProvider'
import stripe from '@/src/util/stripe'
import UserOperations from '@/src/graphql/operations/user'
import { client } from '@/src/graphql/apollo-client'
import {
  CreateStripeCustomerIdInput,
  CreateStripeCustomerIdResponse
} from '@/src/util/types'
import { signIn } from 'next-auth/react'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    signInProvider,
    signUpProvider,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    //whatever value we return here will be the value of the next-auth session
    async session({ session, token, user }) {
      //if a user signs up with another provider besides credentials we need to add the stripe
      //customer id here
      // if (session && !session?.user.stripeCustomerId) {
      //   console.log('has session')
      //   const newCustomer = await stripe.customers.create({
      //     email: session.user.email
      //   })
      //   const createStripeCustomerId =
      //     UserOperations.Mutations.createStripeCustomerId
      //   const signUpResponse = await client.mutate<
      //     CreateStripeCustomerIdResponse,
      //     CreateStripeCustomerIdInput
      //   >({
      //     mutation: createStripeCustomerId,
      //     variables: {
      //       customerId: newCustomer.id
      //     }
      //   })
      //   console.log(signUpResponse)
      // }

      //token is used for credentials provider, and will contain the session payload when
      //the user and session parameters are null.
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! } // combine the session and db user
      }
    }
  }
})
