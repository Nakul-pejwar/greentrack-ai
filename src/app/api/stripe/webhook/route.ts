import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headerList = await headers()
  const signature = headerList.get('stripe-signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Admin Supabase client to bypass RLS for background updates
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Or standard anon if you've allowed webhook inserts
  )

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const session = event.data.object as any
      
      // Example simplistic extraction
      const customerId = session.customer as string
      let status = session.status // "active", "canceled"

      if (event.type === 'checkout.session.completed') {
         // Subscriptions are created on checkout completed
         const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
         status = subscription.status
      }

      // We resolve the tier logic inside our DB or heavily assume "active" = Pro level on quick MVP
      const tierStatus = status === 'active' ? 'pro' : 'freemium'

      await supabaseAdmin
        .from('users')
        .update({ subscription_tier: tierStatus })
        .eq('stripe_customer_id', customerId)
        
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse('Webhook processed', { status: 200 })
}
