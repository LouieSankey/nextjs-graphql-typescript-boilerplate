import LandingTopNav from '../components/Nav/LandingTopNav'
import UpgradeOptions from '../shared/screens/pricing'
import stripe from '../util/stripe'
import { GetServerSidePropsContext } from 'next'
import { useMutation } from '@apollo/client'
import Operations from '../shared/graphql/operations/index'
import { loadStripe } from '@stripe/stripe-js'
import { StripeProduct } from '../shared/util/types'
import { getSession, useSession } from 'next-auth/react'
import { Session } from '../util/sharedTypes/types'

interface StripePrice {
  id: string
  active: boolean
  billing_scheme: string
  created: number
  currency: string
  livemode: boolean
  metadata: { [key: string]: string }
  nickname: string | null
  product: string
  recurring: {
    aggregate_usage: string | null
    interval: string
    interval_count: number
    usage_type: string
  }
  tiers: any[] | null
  tiers_mode: string | null
  transform_quantity: any | null
  type: string
  unit_amount: number | null
  unit_amount_decimal: string | null
}

interface Props {
  isLoggedIn: boolean
}

const Upgrade = ({
  products,
  isLoggedIn
}: {
  products: StripeProduct[]
  isLoggedIn: boolean
}) => {
  // console.log('frontend ', session)
  const session = useSession()
  const [createCheckoutSession] = useMutation(
    Operations.Mutations.createCheckoutSession
  )

  // if (!session) {
  //   return <div>Loading...</div>
  // }

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
  const { data: products } = await stripe.products.list({ active: true })

  const session = await getSession(ctx)
  console.log('backend ', session)

  return {
    props: {
      products,
      isLoggedIn: !!session
    }
  }
}

export default Upgrade
