import { Landmark, Plus, Sparkles, Music, Gift, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TraditionsPage() {
  const traditions = [
    { 
      id: 1, 
      name: 'Naming Ceremony', 
      origin: 'Yoruba / Ancestral', 
      period: 'Post-Birth (Day 8)', 
      desc: 'A sacred ritual where the family elders gather to bestow meaningful names upon the newborn, symbolizing their path in life.',
      icon: Heart,
      color: 'bg-orange-500'
    },
    { 
      id: 2, 
      name: 'New Year Sunrise Circle', 
      origin: 'Johnson Family Original', 
      period: 'January 1st', 
      desc: 'Gathering at the oldest living patriarch\'s home at dawn to share hopes for the upcoming year and honor those who passed.',
      icon: Sparkles,
      color: 'bg-blue-500'
    },
    { 
      id: 3, 
      name: 'The Golden Feast', 
      origin: 'Ancestral Harvest', 
      period: 'Late September', 
      desc: 'A culinary celebration of the harvest where every branch brings a signature dish to a communal long table.',
      icon: Gift,
      color: 'bg-green-500'
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Landmark className="text-primary" /> Cultural Traditions
          </h1>
          <p className="text-slate-500 dark:text-slate-400">The rituals and customs that bind our family across time and borders.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
          <Plus size={16} /> Document Custom
        </button>
      </div>

      <div className="grid gap-6">
        {traditions.map((trad, idx) => (
          <motion.div
            key={trad.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#111D29] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col md:flex-row gap-8 items-start group hover:border-primary/30 transition-all"
          >
            <div className={`w-20 h-20 rounded-3xl ${trad.color} flex items-center justify-center text-white shadow-xl shrink-0 group-hover:scale-110 transition-transform`}>
              <trad.icon size={40} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{trad.origin}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trad.period}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{trad.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-3xl">
                  {trad.desc}
                </p>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <button className="text-xs font-bold text-primary flex items-center gap-2 hover:underline">
                  View full documentation <ArrowRight size={14} />
                </button>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=trad${trad.id}${i}`} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#111D29]" alt="Family Member" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-6 group hover:border-primary/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white dark:bg-[#111D29] flex items-center justify-center shadow-sm">
            <Music size={28} className="text-slate-400" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Folk Songs & Oral Lore</h4>
            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto mt-2">Record the songs and stories shared around the fire. Digital audio preservation for our unique dialect and lore.</p>
          </div>
          <button className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-sm hover:scale-105 transition-all">
            Record Audio Log
          </button>
        </div>

        <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/25">
            <Plus size={32} />
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Missing a Tradition?</h4>
            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto mt-2">Our family heritage is diverse. Help us capture rituals from your specific branch of the lineage.</p>
          </div>
          <button className="px-10 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all relative z-10">
            Submit Heritage Form
          </button>
        </div>
      </div>
    </div>
  );
}
