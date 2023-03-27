import stripe from '../../../util/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import getRawBody from 'raw-body'
import { prisma } from '../../../util/prisma'
import { getSession } from 'next-auth/react'

export const config = {
  api: {
    bodyParser: false
  }
}
//! don't forget, you need to enable port forwarding in dev
//! stripe listen --forward-to localhost:4000/webhook
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const rawBody = await getRawBody(req)

    try {
      const sig = req.headers['stripe-signature']
      const event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )

      switch (event.type) {
        case 'customer.subscription.created':
          {
            const product = await stripe.products.retrieve(
              event.data.object.plan.product
            )

            const id = event.data.object.metadata.userId
            console.log('user id: ', id)

            const tier = product.name
            console.log('created user tier ', tier)
            const user = await prisma.user.update({
              where: {
                id
              },
              data: {
                tier
              }
            })
          }
          const newSession = getSession()
          console.log('where is it ?', newSession)
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
            console.log('updated tier to ', tier)
            const user = await prisma.user.update({
              where: {
                id
              },
              data: {
                tier
              }
            })

            const newSession = getSession()
            console.log('where is it ?', newSession)
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
