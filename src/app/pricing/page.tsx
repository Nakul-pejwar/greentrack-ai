"use client";

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tiers = [
  {
    name: 'Freemium',
    price: '$0',
    description: 'Basic CSV tracking for single users.',
    features: ['1 User Seat', 'CSV Uploads', 'Basic Charts', 'Standard Support'],
    priceId: null, // Free
    buttonText: 'Current Plan',
  },
  {
    name: 'Pro',
    price: '$99',
    description: 'Perfect for established teams. Full API integration.',
    features: ['5 User Seats', 'Real-time Dashboards', 'AI Predictions', 'CSRD Reports', 'Priority Support'],
    priceId: 'price_pro_123', // Replace with real Stripe Price ID
    buttonText: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$499',
    description: 'Unlimited capacity with custom telemetry tools.',
    features: ['Unlimited Seats', 'Custom API Webhooks', 'SEBI BRSR Compliance', 'White-labeling', 'Dedicated Success Manager'],
    priceId: 'price_ent_456', // Replace with real Stripe Price ID
    buttonText: 'Contact Sales',
  }
];

export default function PricingPage() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) {
       return router.push('/dashboard');
    }
    setLoadingPriceId(priceId);
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Are you logged in?");
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Pricing for every stage of your ESG journey
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-xl text-gray-400">
            Start free, then unlock AI compliance, advanced telemetry feeds, and real-time ERP reporting as you scale.
          </p>
        </div>

        <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`relative p-8 bg-gray-900 border ${tier.popular ? 'border-emerald-500 shadow-2xl shadow-emerald-900/20' : 'border-gray-800'} rounded-2xl flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute top-0 py-1.5 px-4 bg-emerald-500 rounded-full text-xs font-semibold text-white uppercase tracking-wide transform -translate-y-1/2">
                  Most Popular
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">/mo</span>
                </p>
                <p className="mt-6 text-gray-400">{tier.description}</p>
                
                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCheckout(tier.priceId)}
                disabled={loadingPriceId === tier.priceId}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium transition-colors ${
                  tier.popular
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {loadingPriceId === tier.priceId ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
