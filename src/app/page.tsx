import Link from "next/link";
import { Leaf, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-500" />
            <span className="font-bold text-xl tracking-tight text-white">GreenTrack AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
              Login
            </Link>
            <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-emerald-900/20">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black">
        <div className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm font-medium text-emerald-400 backdrop-blur-3xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Now supporting CSRD & CDP frameworks for Indian Enterprises
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
          Automate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Carbon Footprint</span> with AI.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          Track Scope 1-3 emissions, monitor energy use, and get AI-driven reduction recommendations. Built for modern enterprises.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/dashboard" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-transform hover:scale-105">
            View Live Demo
          </Link>
          <Link href="#pricing" className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            See Pricing
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="py-20 border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Everything you need to reach Net Zero</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
              <Zap className="h-10 w-10 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-time ERP Integration</h3>
              <p className="text-gray-400">Connect your existing ERP and upload CSVs. We automatically parse energy kWh and travel data.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
              <BarChart3 className="h-10 w-10 text-cyan-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-gray-400">Our machine learning models predict emission trends and suggest ROI-positive reduction strategies.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors">
              <ShieldCheck className="h-10 w-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Automated Compliance</h3>
              <p className="text-gray-400">Generate audit-ready PDF reports adhering to local and global formatting standards in one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tailored for Indian Enterprises */}
      <section id="pricing" className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Transparent Pricing for Teams</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Start for free to establish your baseline, scale up when you need AI optimization.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 bg-gray-900 rounded-3xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-400 mb-6">For small businesses evaluating emissions.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">₹0</span>
                <span className="text-gray-500">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center"><CheckIcon /> Manual CSV uploads</li>
                <li className="flex items-center"><CheckIcon /> Scope 1 & 2 tracking</li>
                <li className="flex items-center"><CheckIcon /> Basic dashboard access</li>
              </ul>
              <Link href="/dashboard" className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors">
                Start for free
              </Link>
            </div>
            
            {/* Pro Tier */}
            <div className="p-8 bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-emerald-500 relative shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">Recommended</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">For manufacturing & large scale operations.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">₹24,999</span>
                <span className="text-gray-500">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center"><CheckIcon /> Full Scope 1-3 AI tracking</li>
                <li className="flex items-center"><CheckIcon /> ERP Integrations (SAP, Oracle)</li>
                <li className="flex items-center"><CheckIcon /> AI-driven reduction plans</li>
                <li className="flex items-center"><CheckIcon /> Automated CSRD compliance</li>
              </ul>
              <Link href="/dashboard" className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-5 w-5 text-emerald-500" />
            <span className="text-gray-400 font-medium">GreenTrack AI © 2026</span>
          </div>
          <div className="text-sm text-gray-500 space-x-4">
            <a href="#" className="hover:text-white">GDPR Notice</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}
