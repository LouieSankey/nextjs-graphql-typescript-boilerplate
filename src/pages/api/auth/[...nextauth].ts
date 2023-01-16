import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, //maybe better to fist check these with if(!process.env.G...)
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string //then throw new error, but we don't have handling yet
    })
  ],
  secret: process.env.JWT_SECRET
})
