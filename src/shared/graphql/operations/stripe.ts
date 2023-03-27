import { gql } from '@apollo/client'

const StripeOperations = {
  Mutations: {
    createStripeCustomerId: gql`
      mutation createStripeCustomerId($customerId: String!) {
        createStripeCustomerId(customerId: $customerId) {
          success
          error
        }
      }
    `,
    createCheckoutSession: gql`
      mutation CreateCheckoutSession(
        $priceId: String!
        $quantity: Int!
        $userId: String!
      ) {
        createCheckoutSession(
          priceId: $priceId
          quantity: $quantity
          userId: $userId
        ) {
          id
        }
      }
    `
  }
}

export default StripeOperations
