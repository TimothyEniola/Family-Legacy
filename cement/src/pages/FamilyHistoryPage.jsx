
import React from 'react';
import { Compass, Calendar, MapPin, Archive, FileText, ArrowRight, Quote } from 'lucide-react';
export default function HistoryPage() {
  const migrations = [
    { year: '1944', title: 'Immigration to Lagos, Nigeria', desc: 'Robert Johnson left Edinburgh, Scotland during the height of WWII and settled in Lagos, establishing the carpentry firm.', from: 'Edinburgh, Scotland', to: 'Lagos, Nigeria' },
    { year: '1968', title: 'Accra Connection', desc: 'Linda Mensah relocated from Accra, Ghana to Lagos to study advanced pediatric nursing, marrying William in 1970.', from: 'Accra, Ghana', to: 'Lagos, Nigeria' },
    { year: '2000', title: 'Pacific Northwest Relocation', desc: 'David Johnson relocated from Lagos to Seattle, USA, taking a position as a Software Architect and bringing the technology branch to North America.', from: 'Lagos, Nigeria', to: 'Seattle, USA' }
  ];
  const historicalDocs = [
    { name: '1948 Wooden Crafts Ledger', desc: 'Handwritten business records from Grandpas workshop.', size: '4.5 MB' },
    { name: '1952 Ebute Metta Compound Deed', desc: 'Original property acquisition deed with tribal signatures.', size: '12 MB' },
    { name: '1970 Marriage Certificate', desc: 'Official record of William and Linda Johnsons union.', size: '2.1 MB' }
  ];
  return (
    <div className="space-y-8">
      
      {/* HEADER HERO */}
      <div>
        <h2 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white">Our Family Chronicle</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">Exploring the migration path, archives, and stories of the Johnson family.</p>
      </div>
      {/* 1. MIGRATION TIMELINE MAP */}
      <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Migration History Map</h3>
          <p className="text-[10px] text-slate-500">Major relocations across three generations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {migrations.map((mig, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 relative space-y-3">
              <span className="text-2xl font-extrabold text-orange-500/20 absolute right-4 top-2 font-outfit">{mig.year}</span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <Compass size={16} />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{mig.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{mig.desc}</p>
              
              <div className="flex items-center gap-1.5 pt-2 text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                <span>{mig.from.split(',')[0]}</span>
                <ArrowRight size={10} />
                <span>{mig.to.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 2. STORYTELLING & ELDER QUOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ELDER STORY CARD */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">The Ebute Metta Settlement (1952)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            "When my father Robert first inspected the plot at Ebute Metta, it was nothing but swamplands and dense foliage. The local chiefs were skeptical of a carpenter from Scotland settling there, but Robert proved his commitment by building school tables for the local community for free. That gesture forged a bond of trust that secured the land deed which remains in our family to this day."
          </p>
          <span className="text-[10px] text-orange-500 font-bold block">— Logged by William Johnson (Grandfather)</span>
        </div>
        {/* BRONZE QUOTE PANEL */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 p-5 flex flex-col justify-between">
          <Quote size={30} className="text-orange-500/20" />
          <p className="text-xs italic text-slate-600 dark:text-orange-200/90 leading-relaxed mb-4">
            "History is not just a ledger of dates; it is the heartbeat of our ancestors echoing in our actions."
          </p>
          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold">— Elder Wisdom</span>
        </div>
      </div>
      {/* 3. ARCHIVED HISTORICAL DOCUMENTS */}
      <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Archive size={18} className="text-orange-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Archived Records & Vault</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {historicalDocs.map((doc, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col justify-between gap-3">
              <div className="flex gap-3">
                <FileText size={20} className="text-slate-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{doc.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5">
                <span className="text-[9px] text-slate-400 font-semibold">{doc.size}</span>
                <button className="text-[10px] font-bold text-orange-500 hover:underline">Download Scan</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
