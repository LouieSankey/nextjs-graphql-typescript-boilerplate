import { GetServerSidePropsContext, NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import AccountTopNav from '../components/Nav/AccountTopNav'
import UpgradeOptionsWrapper from '../shared/auth/UpgradeOptions'
import stripe from '../util/stripe'

export interface StripeProduct {
  id: string
  default_price: ''
  object: 'product'
  active: boolean
  name: string
  description?: string
  images?: string[]
  metadata: Record<string, any>
  statement_descriptor?: string
  unit_label?: string
  updated: number
  created: number
}

const Account = ({ products }: { products: StripeProduct[] }) => {
  useEffect(() => {
    console.log('products', products)
  }, [])

  return (
    <>
      <AccountTopNav></AccountTopNav>
      <UpgradeOptionsWrapper products={products}></UpgradeOptionsWrapper>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/splash',
        permanent: false
      }
    }
  }

  const { data: products } = await stripe.products.list()

  return {
    props: {
      products
    }
  }
}

export default Account
