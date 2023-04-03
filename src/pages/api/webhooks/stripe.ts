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
  console.log('1')
  if (req.method === 'POST') {
    console.log('2')

    const sig = req.headers['stripe-signature']!

    const buf = await buffer(req)
    const body: string = buf.toString()

    console.log('request body', body)

    try {
      const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

      switch (event.type) {
        //! in production you must specify which events to listen to in your webhook on stripe.com
        case 'customer.updated':
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
        // case 'customer.subscription.updated':
        //   {
        //     const id = event.data.object.metadata.userId
        //     console.log('user id: ', id)
        //     //! not importing from util/stripe
        //     const product = await stripe.products.retrieve(
        //       event.data.object.plan.product
        //     )
        //     const tier = product.name
        //     await prisma.user.update({
        //       where: {
        //         id
        //       },
        //       data: {
        //         tier
        //       }
        //     })
        //   }
        //   break

        case 'payment_intent.failed':
          // console.log('payment failed')
          break
        default: {
          const newSession = await getSession()
          console.log(newSession)
          // console.log(`Unhandled event type: ${event.type}`)
        }
      }
    } catch (err) {
      res
        .status(400)
        .send(
          `Webhook Error 1: ${err.message} \n Request: ${req} \n Result: ${res} \n Signature: ${sig}`
        )
      return
    }
  }

  res.json({ received: true })
}

// async function buffer(readable) {
//   const chunks = []
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
//   }
//   return Buffer.concat(chunks)
// }
