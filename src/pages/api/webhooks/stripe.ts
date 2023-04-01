import { NextApiRequest, NextApiResponse } from 'next'
import getRawBody from 'raw-body'
import { prisma } from '../../../utils/prisma'
import { getSession } from 'next-auth/react'
import stripe from '@/src/utils/stripe'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false
  }
}
//! don't forget, you need to enable port forwarding in dev
//! stripe listen --forward-to localhost:3000/api/webhooks/stripe
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    //! need to match the correct rawBody here, its working differently in localhost
    //! and vercel
    // const rawBody = await getRawBody(req)
    const requestBuffer = await buffer(req)

    try {
      const sig = req.headers['stripe-signature']
      const event = stripe.webhooks.constructEvent(
        requestBuffer.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )

      switch (event.type) {
        //! in production you must specify
        //! which events to listen to in your webhook on stripe.com
        case 'customer.subscription.created':
          {
            const product = await stripe.products.retrieve(
              event.data.object.plan.product
            )

            const id = event.data.object.metadata.userId

            const tier = product.name
            await prisma.user.update({
              where: {
                id
              },
              data: {
                tier
              }
            })
          }
          break
        case 'customer.subscription.updated':
          {
            const id = event.data.object.metadata.userId
            console.log('user id: ', id)
            //! not importing from util/stripe
            const product = await stripe.products.retrieve(
              event.data.object.plan.product
            )
            const tier = product.name
            await prisma.user.update({
              where: {
                id
              },
              data: {
                tier
              }
            })
          }
          break

        case 'payment_intent.failed':
          console.log('payment failed')
          break
        default: {
          const newSession = await getSession()
          console.log(newSession)
          console.log(`Unhandled event type: ${event.type}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  res.json({ received: true })
}
