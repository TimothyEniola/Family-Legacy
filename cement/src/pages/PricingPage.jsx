import React from 'react';
import { DollarSign } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="rounded-[2rem] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-12 shadow-xl">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-black uppercase tracking-[0.3em]">
            <DollarSign size={16} /> Pricing Plans
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Flexible pricing for every family.</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">Start free with essential family archive tools, then upgrade when you're ready for unlimited members, advanced privacy settings, and AI-powered search.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              name: 'Starter',
              price: 'Free',
              description: 'Perfect for small families beginning their legacy journey.',
              features: ['Up to 10 members', 'Basic timeline tools', 'Photo and document uploads']
            },
            {
              name: 'Family+',
              price: '$12 / month',
              description: 'Best for extended families who want more storage and collaboration.',
              features: ['Unlimited family members', 'Advanced search', 'Shared collaboration']
            },
            {
              name: 'Legacy',
              price: '$24 / month',
              description: 'Everything you need to preserve multi-generation heritage securely.',
              features: ['Priority support', 'Encrypted vault', 'Custom memorial pages']
            }
          ].map((plan) => (
            <div key={plan.name} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 shadow-sm hover:shadow-xl transition-shadow">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{plan.name}</span>
              <p className="mt-6 text-5xl font-black text-slate-900 dark:text-white">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{plan.description}</p>
              <ul className="mt-8 space-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <button className="mt-10 w-full rounded-3xl bg-primary px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-primary/90 transition-colors">Choose plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
