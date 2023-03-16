import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import AccountTopNav from '../components/Nav/AccountTopNav'
import Upgrade from '../shared/screens/upgrade'
import { StripeProduct } from '../shared/util/types'
import stripe from '../util/stripe'

const Account = ({ products }: { products: StripeProduct[] }) => {
  return (
    <>
      <AccountTopNav></AccountTopNav>
      <Upgrade products={products}></Upgrade>
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
