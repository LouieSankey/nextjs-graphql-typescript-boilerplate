export interface Session {
  id?: string
  sessionToken?: string
  accessToken?: string
  userId?: string
  expires?: string
  user?: User
}

export interface User {
  id?: string
  username?: string
  email: string
  emailVerified?: boolean
  image?: string
  name?: string
  tier?: string
  stripeCustomerId?: string
}
//he
