//all of our graphql
import { gql } from '@apollo/client'

const UserOperations = {
  Queries: {},
  Mutations: {
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
