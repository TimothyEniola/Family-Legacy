import React from 'react';
import { Bell, Megaphone, Calendar, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: 'Family Reunion 2026',
      date: 'June 15, 2026',
      category: 'Event',
      content: 'We are thrilled to announce that the biennial Johnson family reunion will be held in Lagos this year. Mark your calendars for July 20-25!',
      priority: 'High',
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      id: 2,
      title: 'New Digital Archive Security',
      date: 'June 10, 2026',
      category: 'Security',
      content: 'Our family heritage vault has been upgraded with end-to-end encryption. Your private records are now more secure than ever.',
      priority: 'Medium',
      icon: ShieldCheck,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Legacy Book Published',
      date: 'June 05, 2026',
      category: 'Milestone',
      content: 'The first volume of the "Johnson Family Chronicle" is now available for digital viewing in the documents section.',
      priority: 'Normal',
      icon: Sparkles,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Bell className="text-primary" /> Family Announcements
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Stay updated with the latest news from your family branches.</p>
      </div>

      <div className="grid gap-6">
        {announcements.map((ann, idx) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#111D29] p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col md:flex-row gap-6 items-start group hover:border-primary/30 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${ann.color} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
              <ann.icon size={28} />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{ann.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span className="text-[10px] font-bold text-slate-400">{ann.date}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest 
                  ${ann.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}
                `}>
                  {ann.priority} Priority
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{ann.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {ann.content}
              </p>
              <button className="text-xs font-bold text-primary flex items-center gap-2 hover:underline">
                Read full announcement <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white dark:bg-[#111D29] flex items-center justify-center shadow-sm">
          <Megaphone size={24} className="text-slate-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-800 dark:text-white">Have news to share?</h4>
          <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto mt-1">Submit an announcement to be reviewed by the family archivist.</p>
        </div>
        <button className="px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
          Broadcast News
        </button>
      </div>
    </div>
  );
}
