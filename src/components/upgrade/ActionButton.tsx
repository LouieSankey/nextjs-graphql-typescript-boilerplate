import UserOperations from '@/src/graphql/operations/user'
import { StripeProduct } from '@/src/pages/account'
import { useMutation } from '@apollo/client'
import { Button, ButtonProps } from '@chakra-ui/react'
import { loadStripe, StripeError } from '@stripe/stripe-js'
// import stripe from '../../util/stripe'

interface ActionButtonProps extends ButtonProps {
  product: StripeProduct
}

export const ActionButton = ({ product, ...props }: ActionButtonProps) => {
  const [createCheckoutSession] = useMutation(
    UserOperations.Mutations.createCheckoutSession
  )
  const checkout = async () => {
    console.log(product)

    const { data } = await createCheckoutSession({
      variables: { priceId: product.default_price, quantity: 1 }
    })

    const sessionId = data.createCheckoutSession.id

    console.log('session id ', sessionId)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    // <Link href='/checkout'>
    <Button
      colorScheme='brandPallet'
      size='lg'
      w='full'
      fontWeight='extrabold'
      py={{ md: '8' }}
      onClick={() => checkout()}
      {...props}
    />
    // </Link>
  )
}
