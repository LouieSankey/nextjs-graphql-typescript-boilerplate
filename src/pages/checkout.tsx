import { Text } from '@chakra-ui/react'
import StripeCheckout from 'react-stripe-checkout'

const Checkout: React.FC = () => {
  return (
    <>
      <Text>Checkout</Text>
      <StripeCheckout
        token={(token) => console.log('token')}
        stripeKey='pk_test_51MgVumHhzKsAadKDQTacCIpM6iWEzD5X7Ulkf1UkHSvmAqAbWeVT7Y8trT6sx1mXGfjB2D2RsxIDAnJNZbpQykE9002of2Q13u'
        amount={100}
        email={'someemail@gmail.com'}
      />
    </>
  )
}

export default Checkout
