import React from 'react';
import { GitFork } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl overflow-hidden">
        <div className="p-12 sm:p-16 space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-black uppercase tracking-[0.3em]">
            <GitFork size={16} /> About Family Legacy
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">A modern archive for family heritage</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">Family Legacy helps families preserve stories, photos, documents, and traditions in one private digital home. Whether you are honoring ancestors or planning future generations, our platform makes it easy to keep your history intact.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Secure Records',
                description: 'Encrypted storage for family documents, wills, and milestones with private access controls.'
              },
              {
                title: 'Living Memories',
                description: 'Create timelines, biographies, and memorial tributes that stay with your family forever.'
              },
              {
                title: 'Trusted Collaboration',
                description: 'Invite relatives to contribute photos, stories, and updates while maintaining family privacy.'
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-[#0F172A]/70 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[1.75rem] bg-primary/5 dark:bg-primary/10 p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Why families choose us</h3>
              <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
                <li className="font-medium">• Intuitive timeline creation for every generation.</li>
                <li className="font-medium">• Seamless sharing with your closest relatives.</li>
                <li className="font-medium">• Responsive support for legacy preservation.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 dark:border-slate-800 p-8 bg-white dark:bg-[#111827]">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our mission</h3>
              <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">We build secure and beautiful family archives so your stories, photos, and values can survive the generations. From cherished memories to vital documents, our mission is to keep your family connected through time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
