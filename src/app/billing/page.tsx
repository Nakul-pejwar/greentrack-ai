import { createClient } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('stripe_customer_id, subscription_tier')
    .eq('id', user.id)
    .single()

  const customerId = profile?.stripe_customer_id

  if (!customerId || profile.subscription_tier === 'freemium') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Active Subscription</h1>
          <p className="text-gray-400 mb-6">You are currently on the freemium tier. Upgrade to access premium features and automated billing.</p>
          <a href="/pricing" className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            View Pricing Tiers
          </a>
        </div>
      </div>
    )
  }

  // Generate stripe billing portal link
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard`,
  })

  // Automatically redirect immediately if requested, or present a button.
  // We'll present a button for safety.
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Manage Billing</h1>
        <p className="text-gray-400 mb-6">
          You are currently on the <span className="font-bold text-emerald-400 uppercase">{profile.subscription_tier}</span> tier.
        </p>
        <a href={session.url} className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Open Stripe Portal
        </a>
      </div>
    </div>
  )
}
