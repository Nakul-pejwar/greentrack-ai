import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase' // Use our server client builder

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json()
    
    // Verify currently authenticated user requesting checkout
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Attempt to pull user from public.users to see if they already have a stripe_customer_id
    const { data: profile } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      // Create a customer natively in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabaseUUID: user.id
        }
      })
      customerId = customer.id
      
      // Save it back to our DB
      const { error } = await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
        
      if (error) throw new Error("Could not update User with Stripe ID")
    }

    // Build the checkout session linking the customer mapped securely
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pricing?canceled=true`,
      metadata: {
         supabaseUUID: user.id
      }
    })

    return NextResponse.json({ url: session.url })

  } catch (error: any) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
