import Stripe from 'stripe' //hello world 5000
const stripe: any = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY!, {
  apiVersion: '2022-11-15',
  typescript: true
})
export default stripe
