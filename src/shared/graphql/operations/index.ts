import stripeOperations from './stripe'
import userOperations from './user'
import merge from 'lodash.merge'

const operations = merge({}, stripeOperations, userOperations)

export default operations
