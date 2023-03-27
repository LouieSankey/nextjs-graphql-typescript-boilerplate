import { DefaultUser } from 'next-auth'

export interface Session {
  id?: string
  sessionToken?: string
  accessToken?: string
  userId?: string
  expires?: string
  user?: User
}

export interface User extends DefaultUser {
  id: string
  username?: string
  email: string
  emailVerified?: boolean
  image?: string
  name?: string
  tier?: string
  stripeCustomerId?: string
  error?: string
}
