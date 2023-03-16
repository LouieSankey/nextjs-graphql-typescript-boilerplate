import LandingTopNav from '../components/Nav/LandingTopNav'
import UpgradeOptionsWrapper from '../shared/screens/upgrade-options'
import { useEffect } from 'react'
import stripe from '../util/stripe'
import { StripeProduct } from './account'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

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
  return (
    <>
      <LandingTopNav isLoggedIn={isLoggedIn}></LandingTopNav>
      <UpgradeOptionsWrapper products={products}></UpgradeOptionsWrapper>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data: products } = await stripe.products.list()

  const session = await getSession(ctx)

  return {
    props: {
      products,
      isLoggedIn: !!session
    }
  }
}

export default Upgrade
