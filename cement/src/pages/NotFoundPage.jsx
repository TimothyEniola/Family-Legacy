import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-16 dark:bg-[#0F172A]">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-premium dark:border-slate-800 dark:bg-[#111D29] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><SearchX size={30} /></div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-primary">404 · Page not found</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">This page isn’t in the archive</h1>
        <p className="mt-3 break-all text-sm text-slate-500 dark:text-slate-400">We couldn’t find <span className="font-semibold">{location.pathname}</span>. Check the link or return to your family dashboard.</p>
        <Link to="/dashboard" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-primary-600"><ArrowLeft size={15} /> Go to dashboard</Link>
      </section>
    </main>
  );
}
