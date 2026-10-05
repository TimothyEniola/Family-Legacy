import { HelpCircle } from 'lucide-react';
import { LANDING_FAQS } from '../data/mockData';

export default function FaqPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0F172A]/80">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="rounded-[2rem] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-12 shadow-xl">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-black uppercase tracking-[0.3em]">
            <HelpCircle size={16} /> Frequently Asked Questions
          </div>
          <div className="mt-8 space-y-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Everything you need to know about Family Legacy.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">Learn how to create your family archive, invite relatives, secure your documents and manage your online heritage in one place.</p>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div className="space-y-8">
            {LANDING_FAQS.map((faq, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{faq.question}</h2>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A]/70 p-8 shadow-sm">
            <div className="rounded-[1.75rem] bg-primary/10 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">What's this project for?</h3>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Family Legacy is built to preserve your family stories, keep genealogy records private, and make it easy for relatives to contribute photos and memories.</p>
            </div>

            <div className="rounded-[1.75rem] bg-white dark:bg-[#111827] p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">How to get started</h3>
              <ol className="mt-4 space-y-3 text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed list-decimal list-inside">
                <li>Create your free family account.</li>
                <li>Build your first family tree and upload photos.</li>
                <li>Invite relatives to add stories, events, and documents.</li>
                <li>Use the archive tools to organize and protect your legacy.</li>
              </ol>
            </div>

            <div className="rounded-[1.75rem] bg-primary p-6 text-white">
              <h3 className="text-xl font-bold">Need help?</h3>
              <p className="mt-4 text-sm leading-relaxed">Use the FAQ to answer common questions, and reach out through the footer links if you need more support.</p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
