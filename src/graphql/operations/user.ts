//all of our graphql
import { gql } from '@apollo/client'

const UserOperations = {
  Queries: {},
  Mutations: {
    signUp: gql`
      mutation signUp($email: String!, $password: String!) {
        signUp(email: $email, password: $password) {
          email
          emailVerified
        }
      }
    `,
    signIn: gql`
      mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          email
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
