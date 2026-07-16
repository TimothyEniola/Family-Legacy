import React from 'react';
import { FileText, Search, Plus, Filter, Download, MoreVertical, Shield, FileArchive, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocumentsPage() {
  const categories = ['All Documents', 'Property Deeds', 'Birth Certificates', 'Historical Letters', 'Marriage Records'];
  const documents = [
    { id: 1, name: '1952 Ebute Metta Deed', category: 'Property Deeds', size: '12 MB', date: 'June 15, 1952', type: 'PDF' },
    { id: 2, name: 'William & Linda Marriage', category: 'Marriage Records', size: '2.4 MB', date: 'Sept 21, 1970', type: 'JPG' },
    { id: 3, name: 'Ancestral Letter - Robert', category: 'Historical Letters', size: '850 KB', date: 'Jan 10, 1944', type: 'PDF' },
    { id: 4, name: 'Family Tree Volume 1', category: 'Other', size: '45 MB', date: 'Dec 20, 2023', type: 'EBOOK' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="text-primary" /> Heritage Vault
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Securely stored family documents, deeds, and historical records.</p>
        </div>
        <div className="flex items-center gap-3 self-start lg:self-auto">
          <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
            <Plus size={16} /> Upload Document
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#111D29] p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Search Vault</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Find record..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-primary outline-none text-xs transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Categories</h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat, idx) => (
                  <button key={cat} className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all
                    ${idx === 0 ? 'bg-orange-500/10 text-orange-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary'}
                  `}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
            <Shield size={32} className="text-primary relative z-10" />
            <h4 className="text-lg font-bold tracking-tight relative z-10">End-to-End Encryption</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed relative z-10">All documents are encrypted before storage. Only family heads can grant viewing permissions to other branches.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1 relative z-10">
              Manage Access <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Main List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-[#111D29] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Records</h3>
              <button className="p-2 text-slate-400 hover:text-primary transition-all"><Filter size={18} /></button>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {documents.map((doc) => (
                <div key={doc.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-inner">
                      <FileArchive size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-1">
                        <span className="text-primary">{doc.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span>{doc.size}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                      <Download size={18} />
                    </button>
                    <button className="p-2.5 text-slate-300 hover:text-slate-500">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
