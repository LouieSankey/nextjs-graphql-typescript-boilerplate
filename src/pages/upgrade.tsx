import LandingTopNav from '../components/LandingTopNav'
import UpgradeOptionsWrapper from '../components/upgrade/UpgradeOptionsWrapper'
import { useEffect } from 'react'
import stripe from '../util/stripe'

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

const Upgrade = async ({ prices }: { prices: StripePrice[] }) => {
  useEffect(() => {
    console.log(prices)
  }, [])

  return (
    <>
      <pre>{JSON.stringify(prices, null, 2)}</pre>
      <LandingTopNav></LandingTopNav>
      <UpgradeOptionsWrapper prices={prices}></UpgradeOptionsWrapper>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data: prices } = await stripe.prices.list()

  return {
    props: {
      prices
    }
  }
}

export default Upgrade
