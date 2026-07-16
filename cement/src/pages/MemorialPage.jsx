import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flame, MessageSquare, Award, Calendar, Clock, Plus, Filter, Search } from 'lucide-react';

export default function MemorialPage() {
  const { members, tributes, addTribute } = useFamily();
  const deceased = members.filter(m => m.status === 'Deceased');
  const [selectedDeceasedId, setSelectedDeceasedId] = useState(deceased[0]?.id || null);
  const [tributeText, setTributeText] = useState('');
  const [candles, setCandles] = useState({
    "robert-johnson": 42,
    "mary-johnson": 38,
  });

  const activeDeceased = deceased.find(d => d.id === selectedDeceasedId) || deceased[0];
  const activeTributes = tributes[selectedDeceasedId] || [];

  const handleLightCandle = () => {
    if (!selectedDeceasedId) return;
    setCandles(prev => ({
      ...prev,
      [selectedDeceasedId]: (prev[selectedDeceasedId] || 0) + 1
    }));
  };

  const handleSubmitTribute = (e) => {
    e.preventDefault();
    if (!tributeText.trim()) return;
    addTribute(selectedDeceasedId, tributeText.trim());
    setTributeText('');
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Heart className="text-primary" /> Memorial Archives
          </h1>
          <p className="text-slate-500 dark:text-slate-400">A respectful space to honor and remember those who came before us.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 self-start md:self-auto">
          <Plus size={16} /> Create Memorial
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Sidebar: Remembered Profiles */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111D29] p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Search Ancestors</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Find by name..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-primary outline-none text-xs transition-all" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Remembered Profiles</h3>
                <Filter size={12} className="text-slate-300" />
              </div>
              <div className="flex flex-col gap-2">
                {deceased.map(profile => {
                  const isSelected = profile.id === selectedDeceasedId;
                  return (
                    <button 
                      key={profile.id}
                      onClick={() => setSelectedDeceasedId(profile.id)}
                      className={`p-4 rounded-2xl border transition-all flex items-center gap-4 text-left group
                        ${isSelected 
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                          : 'bg-slate-50 dark:bg-slate-900/40 border-transparent hover:border-primary/30 text-slate-900 dark:text-slate-100'}
                      `}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-white/20">
                        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold truncate tracking-tight">{profile.name}</h4>
                        <span className={`text-[9px] font-black uppercase tracking-widest block mt-0.5 
                          ${isSelected ? 'text-white/70' : 'text-slate-400'}
                        `}>
                          {profile.birthDate.split('-')[0]} - {profile.deathDate?.split('-')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent"></div>
            <Award size={48} className="text-primary mx-auto relative z-10" />
            <div className="space-y-2 relative z-10">
              <h4 className="text-xl font-bold tracking-tight">Preserve Their Legacy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Ensure your ancestors' stories, values, and wisdom are never forgotten. Every tribute adds a piece to our family's eternal history.</p>
            </div>
            <button className="w-full py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all relative z-10">
              Donate to Heritage Fund
            </button>
          </div>
        </div>

        {/* Main Content: Memorial Details */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {activeDeceased ? (
              <motion.div
                key={activeDeceased.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Profile Hero Card */}
                <div className="rounded-[3rem] bg-slate-900 text-slate-100 border border-slate-800 p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mb-32"></div>
                  
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl ring-8 ring-primary/5">
                        <img src={activeDeceased.avatar} alt={activeDeceased.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl">
                        <Heart size={20} fill="currentColor" />
                      </div>
                    </div>
                    <div className="space-y-4 text-center md:text-left flex-1">
                      <div>
                        <h3 className="text-3xl font-black tracking-tight text-white">{activeDeceased.name}</h3>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">
                          {activeDeceased.role} • {activeDeceased.birthDate} - {activeDeceased.deathDate}
                        </p>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        {activeDeceased.bio || "A beloved soul whose life remains a guiding light for our entire family branch. Rest in eternal peace."}
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> Born in {activeDeceased.birthPlace.split(',')[0]}</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {candles[activeDeceased.id] || 0} Candles Lit</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shadow-inner">
                        <Flame size={28} className="animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Virtual Memorial</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Keep their memory burning bright</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLightCandle}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Flame size={18} /> Light a Candle
                    </button>
                  </div>
                </div>

                {/* Tributes Section */}
                <div className="grid md:grid-cols-5 gap-8">
                  {/* Form */}
                  <div className="md:col-span-2 bg-white dark:bg-[#111D29] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-premium space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Leave a Tribute</h4>
                      <p className="text-xs text-slate-500 font-medium">Share a memory or a message of respect.</p>
                    </div>
                    <form onSubmit={handleSubmitTribute} className="space-y-4">
                      <textarea
                        required
                        rows={5}
                        value={tributeText}
                        onChange={(e) => setTributeText(e.target.value)}
                        placeholder="In loving memory..."
                        className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 bg-transparent text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                      >
                        <MessageSquare size={16} /> Send Message
                      </button>
                    </form>
                  </div>

                  {/* Guestbook List */}
                  <div className="md:col-span-3 bg-white dark:bg-[#111D29] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Family Guestbook ({activeTributes.length})</h4>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=tr${i}`} className="w-6 h-6 rounded-full border-2 border-white dark:border-[#111D29]" alt="Family" />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[400px] custom-scrollbar">
                      {activeTributes.length > 0 ? (
                        activeTributes.map((tr, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-slate-900 dark:text-white">{tr.author}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{tr.date}</span>
                              </div>
                              <div className="w-6 h-6 rounded-lg bg-orange-50 dark:bg-orange-500/5 flex items-center justify-center text-primary">
                                <Heart size={10} fill="currentColor" />
                              </div>
                            </div>
                            <div className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic shadow-sm">
                              "{tr.text}"
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center py-12 gap-4 text-slate-400">
                          <MessageSquare size={32} className="opacity-20" />
                          <p className="text-xs font-medium italic">No tributes yet. Be the first to honor their memory.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-slate-400 italic bg-white dark:bg-[#111D29] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                Select an ancestor to view their memorial archive.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
