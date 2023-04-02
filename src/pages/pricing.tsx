import LandingTopNav from '../components/Nav/LandingTopNav'
import UpgradeOptions from '../shared/screens/pricing'
import { GetServerSidePropsContext } from 'next'
import { useMutation } from '@apollo/client'
import Operations from '../shared/graphql/operations/index'
import { loadStripe } from '@stripe/stripe-js'
import { StripeProduct } from '../shared/sharedUtils/types'
import { getSession, useSession } from 'next-auth/react'
import Stripe from 'stripe'

const Upgrade = ({
  products,
  isLoggedIn
}: {
  products: StripeProduct[]
  isLoggedIn: boolean
}) => {
  const session = useSession()
  const [createCheckoutSession] = useMutation(
    Operations.Mutations.createCheckoutSession
  )

  //I marked this explicitly with Promise<void> return type to help me remember
  //that the props interface will have to be: purchaseProduct(price: string): Promise<void>
  const purchaseProduct = async (priceId: string): Promise<void> => {
    const { data } = await createCheckoutSession({
      variables: {
        priceId: priceId,
        quantity: 1,
        userId: session.data?.user.id
      }
    })
    const sessionId = data.createCheckoutSession.id
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <>
      <LandingTopNav isLoggedIn={isLoggedIn}></LandingTopNav>
      <UpgradeOptions
        products={products}
        purchaseProduct={purchaseProduct}
      ></UpgradeOptions>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const stripe: any = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: '2022-11-15',
    typescript: true
  })

  const { data: products } = await stripe.products.list({ active: true })
  const session = await getSession(ctx)

  return {
    props: {
      products,
      isLoggedIn: !!session
    }
  }
}

export default Upgrade
