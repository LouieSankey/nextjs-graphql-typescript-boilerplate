import { Session, User } from '../../../globalTypes/types'

export interface IAuthProps {
  session: Session | null
  // reloadSession: () => void
}

//used in the useMutation hook for creating a user
export interface CreateUsernameData {
  createUsername: {
    success: boolean
    error: string
  }
}
export interface CreateUsernameVariables {
  username: string
}

export interface SignUpInput {
  password: String | null
  email: String
  stripeCustomerId?: String
  emailVerified?: String
}

export interface SignInInput {
  password: String
  email: String
}

export interface SignUpResponse {
  signUp: User
}

export interface SignInResponse {
  signIn: User
}

export interface GetUserResponse {
  getUser: User
}

export interface GetUserInput {
  email: string
}

export interface CreateStripeCustomerIdInput {
  customerId: string | undefined
}

export interface CreateStripeCustomerIdResponse {
  createStripeCustomerId: {
    success: boolean
    error: string
  }
}

export interface StripeProduct {
  id: string
  default_price: string
  object: 'product'
  active: boolean
  name: string
  description?: string
  images?: string[]
  metadata: Record<string, any>
  statement_descriptor?: string
  unit_label?: string
  updated: number
  created: number
}

//types for setting up responsive css using props
export interface ScreenSize {
  screenSize: 'mobile' | 'tablet' | 'desktop'
}

export interface ScreenOptions {
  mobile: string
  tablet: string
  desktop: string
}
