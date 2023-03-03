//all of our graphql
import { gql } from '@apollo/client'

const UserOperations = {
  Queries: {
    getUser: gql`
      query getUser($email: String!) {
        getUser(email: $email) {
          email
        }
      }
    `
  },
  Mutations: {
    signUp: gql`
      mutation signUp(
        $email: String!
        $password: String!
        $stripeCustomerId: String
      ) {
        signUp(
          email: $email
          password: $password
          stripeCustomerId: $stripeCustomerId
        ) {
          email
          emailVerified
          stripeCustomerId
        }
      }
    `,
    signIn: gql`
      mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          email
          error
        }
      }
    `,
    createStripeCustomerId: gql`
      mutation createStripeCustomerId($customerId: String!) {
        createStripeCustomerId(customerId: $customerId) {
          success
          error
        }
      }
    `,

    createUsername: gql`
      mutation createUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `
  },
  Subscripts: {}
}

export default UserOperations
