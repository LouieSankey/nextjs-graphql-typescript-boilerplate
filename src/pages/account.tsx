import { useEffect } from 'react'
// import initStripe from 'stripe'
import AccountTopNav from '../components/AccountTopNav'
import UpgradeOptionsWrapper from '../components/upgrade/UpgradeOptionsWrapper'
import stripe from '../util/stripe'

export interface StripePrice {
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

const Account = ({ prices }: { prices: StripePrice[] }) => {
  useEffect(() => {
    console.log(prices)
  }, [])

  return (
    <>
      {/* <pre>{JSON.stringify(prices, null, 2)}</pre> */}
      <AccountTopNav></AccountTopNav>
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

export default Account
