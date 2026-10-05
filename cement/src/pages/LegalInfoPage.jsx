import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, ShieldCheck, FileText } from 'lucide-react';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    icon: ShieldCheck,
    intro: 'Your family history is personal. Family Legacy is designed to keep shared archives visible only to the people and families you choose.',
    points: ['You decide what profile details and memories are shared.', 'Private records should be stored only with the permission of their owners.', 'This demonstration stores posts and candle counts in this browser; it does not send data to a production server.']
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    intro: 'Use Family Legacy respectfully to preserve family stories, strengthen connections, and care for sensitive historical records.',
    points: ['Only share content you have permission to publish.', 'Respect the privacy and dignity of other family members.', 'This frontend demo uses sample data and does not provide real authentication, backups, or remote synchronization.']
  },
  contact: {
    title: 'Contact Family Legacy',
    icon: Mail,
    intro: 'Have a question or need help with your family archive? Use the sample support details below as a starting point.',
    points: ['Email: support@familylegacy.example', 'Include the page name and a short description of the issue.', 'For sensitive matters, do not include private family documents in an email.']
  }
};

export default function LegalInfoPage() {
  const { pathname } = useLocation();
  const key = pathname.split('/').pop();
  const content = legalContent[key] || legalContent.privacy;
  const Icon = content.icon;

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-20">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-primary dark:text-slate-300"><ArrowLeft size={14} /> Back to home</Link>
      <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-premium dark:border-slate-800 dark:bg-[#111D29] sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={24} /></div>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{content.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{content.intro}</p>
        <ul className="mt-8 space-y-4">
          {content.points.map((point) => <li key={point} className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300">{point}</li>)}
        </ul>
      </article>
    </main>
  );
}
