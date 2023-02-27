import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import signInProvider from '@/src/providers/signInProvider'
import signUpProvider from '@/src/providers/signUpProvider'

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
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! } // combine the session and db user
      }
    }
  }
})
