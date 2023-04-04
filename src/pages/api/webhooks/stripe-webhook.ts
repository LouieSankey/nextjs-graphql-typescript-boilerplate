import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'
import { getSession } from 'next-auth/react'
import Stripe from 'stripe'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false
  }
}

const stripe: any = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2022-11-15',
  typescript: true
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

//! don't forget, you need to enable port forwarding in dev
//! stripe listen --forward-to localhost:3000/api/webhooks/stripe
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature']!
    const buf = await buffer(req)
    const body: string = buf.toString()

    let event: any
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
      switch (event.type) {
        //! in production you must specify which events to listen to in your webhook on stripe.com
        case 'customer..subscription.updated':
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
          break
        default: {
          return
        }
      }
    } catch (err) {
      console.error('Webhook error:', err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
    }
  }

  res.json({ received: true })
}
