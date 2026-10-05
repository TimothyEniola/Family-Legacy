import { ScrollText, MapPin, Plus, ArrowRight, BookOpen, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TimelinePage() {
  const milestones = [
    { 
      year: '1944', 
      title: 'The Great Migration', 
      desc: 'Robert Johnson departs from Edinburgh and arrives in Lagos, establishing the carpentry shop.',
      category: 'Foundation',
      icon: MapPin,
      color: 'bg-orange-500'
    },
    { 
      year: '1970', 
      title: 'Union of Branches', 
      desc: 'William Johnson and Linda Mensah are married, merging the Johnson and Mensah lineage.',
      category: 'Marriage',
      icon: Heart,
      color: 'bg-blue-500'
    },
    { 
      year: '1985', 
      title: 'The Golden Scholarship', 
      desc: 'David Johnson receives the national scholarship for architectural excellence, bringing pride to the family.',
      category: 'Achievement',
      icon: Sparkles,
      color: 'bg-purple-500'
    },
    { 
      year: '2000', 
      title: 'Digital Branch Begins', 
      desc: 'The family established its first digital records, moving away from handwritten ledgers.',
      category: 'Technology',
      icon: ScrollText,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <ScrollText className="text-primary" /> Chronological Heritage
          </h1>
          <p className="text-slate-500 dark:text-slate-400">A timeline of pivotal moments that shaped our family history.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 self-start md:self-auto">
          <Plus size={16} /> Log Milestone
        </button>
      </div>

      <div className="relative max-w-5xl mx-auto pl-10 md:pl-0">
        {/* Central Line */}
        <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800 md:hidden"></div>

        <div className="space-y-16">
          {milestones.map((mil, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={mil.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Year Bubble */}
                <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-2xl bg-white dark:bg-[#0F172A] border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center z-10 shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <div className={`bg-white dark:bg-[#111D29] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-primary/30 transition-all
                    ${isEven ? 'md:text-right' : 'md:text-left'}
                  `}>
                    <div className={`flex items-center gap-3 mb-4 
                      ${isEven ? 'md:justify-end' : 'md:justify-start'}
                    `}>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{mil.category}</span>
                      <span className="text-4xl font-black text-slate-100 dark:text-slate-800 tracking-tighter group-hover:text-primary/10 transition-colors">{mil.year}</span>
                    </div>
                    <div className={`flex flex-col gap-4 
                      ${isEven ? 'md:items-end' : 'md:items-start'}
                    `}>
                      <div className={`w-14 h-14 rounded-2xl ${mil.color} flex items-center justify-center text-white shadow-lg`}>
                        <mil.icon size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{mil.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {mil.desc}
                      </p>
                      <button className="text-xs font-bold text-primary flex items-center gap-2 hover:underline">
                        Read details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-primary p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 flex-1 space-y-4">
          <BookOpen size={48} className="text-white/80" />
          <h2 className="text-3xl font-black tracking-tight leading-tight">Legacy Archive Access</h2>
          <p className="text-lg text-white/80 font-medium max-w-xl">Every date in this timeline represents a decision that brought us to where we are today. Explore the full family ledger for deep-dive historical records.</p>
        </div>
        <button className="px-10 py-5 bg-white text-primary font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 whitespace-nowrap">
          Open Digital Ledger
        </button>
      </div>
    </div>
  );
}
