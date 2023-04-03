import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'
import { getSession } from 'next-auth/react'
import Stripe from 'stripe'
import { buffer } from 'micro'

//not just for vercel
export const config = {
  api: {
    bodyParser: false
  }
}

//! don't forget, you need to enable port forwarding in dev
//! stripe listen --forward-to localhost:3000/api/webhooks/stripe
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature']!

    const stripe: any = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: '2022-11-15',
      typescript: true
    })

    // console.log('secret: ', process.env.STRIPE_WEBHOOK_SECRET)

    try {
      switch (event.type) {
        //! in production you must specify which events to listen to in your webhook on stripe.com
        case 'customer.subscription.created':
          const buf = await buffer(req)
          const body: string = buf.toString()

          const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
          )
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
            const buf = await buffer(req)
            const body: string = buf.toString()

            const event = stripe.webhooks.constructEvent(
              body,
              sig,
              process.env.STRIPE_WEBHOOK_SECRET
            )
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
      console.log('there was an error: ', error)
    }
  }

  res.json({ received: true })
}
