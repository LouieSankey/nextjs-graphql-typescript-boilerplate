import signInProvider from '@/src/providers/signInProvider'
import signUpProvider from '@/src/providers/signUpProvider'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
    // TODO: implement refresh token - you maybe be able to share code between web and mobile - https://next-auth.js.org/tutorials/refresh-token-rotation
    jwt: async ({ token, user }) => {
      //this makes it so you can update the session manually after stripe checkout
      const updatedUser = await prisma.user.findUnique({
        where: {
          email: token.email!
        }
      })
      if (updatedUser) {
        updatedUser.password = null
        token.user = updatedUser
      } else if (user) {
        token.user = user
      }
      return token
    },
    //whatever value we return here will be the value of the next-auth session
    async session({ session, token }) {
      if (typeof session.user !== 'object' || typeof token.user !== 'object') {
        throw new Error('Invalid session or token user')
      }
      //token is used for credentials provider, and will contain the session payload when
      //the user and session parameters are null.

      return {
        ...session,
        user: { ...session.user, ...token.user! } // combine the session and db user
      }
    }
  }
})
