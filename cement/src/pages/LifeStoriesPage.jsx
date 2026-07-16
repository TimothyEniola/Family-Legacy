
import React, { useState } from 'react';
import { useFamily } from '../context/FamilyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookOpen, Volume2, Calendar, Award, Trash2, Play, Pause, Save, X, Image as ImageIcon } from 'lucide-react';
export default function LifeStoryPage() {
  const { activeMember } = useFamily();
  
  // Custom mock diaries for demonstration
  const [diaries, setDiaries] = useState([
    { id: 1, title: 'My Childhood Days in Lagos', date: 'June 12, 2024', summary: 'Reflecting on the early years playing at the compound and learning carpenter crafts with father.', content: 'Our compound was always filled with the smell of fresh timber. Father was highly strict about measurements, but mother would sneak us candies when we got tired. Those were simple days filled with lessons that shaped my entire career path.', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=200' },
    { id: 2, title: 'Life as a Teacher & Mentor', date: 'March 3, 2024', summary: 'Teaching history allowed me to pass down the pride of our clan migrations to students.', content: 'Education isn\'t about memorizing dates; it is about recognizing the line of decisions that brought us here. My students were curious, and seeing their eyes light up when discussing ancestry was my ultimate reward.', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=200' },
    { id: 3, title: 'Lessons I\'ve Learned in Travel', date: 'January 20, 2024', summary: 'Travel opens the mind and shows us how small our individual bubbles are.', content: 'Visiting my brother Arthur at various international sea docks taught me that respect for local customs is the master key to human connection.', image: 'https://images.unsplash.com/photo-1505761671935-60b3a742798e?auto=format&fit=crop&q=80&w=200' }
  ]);
  const [voiceLogs, setVoiceLogs] = useState([
    { id: 1, title: 'Grandpa\'s Advice on Marriage', duration: '2:45', date: 'May 10, 2024', playing: false },
    { id: 2, title: 'Stories from the Civil Rights Movement', duration: '5:12', date: 'April 14, 2024', playing: false }
  ]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDate, setNewDate] = useState('');
  const handleTogglePlay = (id) => {
    setVoiceLogs(prev => prev.map(log => {
      if (log.id === id) return { ...log, playing: !log.playing };
      return { ...log, playing: false };
    }));
  };
  const handleAddDiarySubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    const newDiary = {
      id: Date.now(),
      title: newTitle,
      date: newDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      summary: newSummary || newContent.substring(0, 80) + '...',
      content: newContent,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200'
    };
    setDiaries(prev => [newDiary, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewSummary('');
    setNewDate('');
    setIsWriteModalOpen(false);
  };
  const handleDeleteDiary = (id) => {
    setDiaries(prev => prev.filter(d => d.id !== id));
  };
  return (
    <div className="space-y-6">
      
      {/* ORANGE Sunset Banner matches the image mockup */}
      <div className="rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-20 mix-blend-overlay"></div>
        <div className="space-y-2 relative z-10 max-w-xl">
          <BookOpen size={40} className="text-orange-100" />
          <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit tracking-tight">My Life Story</h2>
          <p className="text-xs sm:text-sm text-orange-100/90 leading-relaxed">
            Write down your daily moments, record voice memories, and log life stories. Leave a digital guide for future generations.
          </p>
        </div>
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="relative z-10 px-6 py-3.5 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-lg transition-all self-start md:self-auto"
        >
          Write New Entry
        </button>
      </div>
      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: DIARY ENTRIES */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Story Logs ({diaries.length})</h3>
          </div>
          <div className="space-y-4">
            {diaries.map(diary => (
              <motion.div
                key={diary.id}
                layout
                className="p-5 rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4"
              >
                <img 
                  src={diary.image} 
                  alt={diary.title} 
                  className="w-full sm:w-28 h-28 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{diary.title}</h4>
                      <button 
                        onClick={() => handleDeleteDiary(diary.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-slate-400 font-semibold mt-1">
                      <Calendar size={10} /> <span>{diary.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{diary.summary}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic leading-relaxed">{diary.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* RIGHT COLUMN: VOICE MEMORIES UI */}
        <div className="space-y-6">
          
          <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Voice Memories</h3>
            
            {/* Waveform Design Component */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 mb-5 flex flex-col items-center justify-center">
              <Volume2 size={24} className="text-orange-500 mb-2 animate-bounce" />
              <span className="text-[10px] text-slate-500 font-bold mb-3">Record a Sound Log</span>
              
              {/* Fake Audio Waveform */}
              <div className="flex items-center gap-0.5 h-8 mb-4">
                {[4, 8, 12, 6, 14, 18, 10, 16, 8, 4, 10, 14, 6, 12, 10].map((h, idx) => (
                  <div 
                    key={idx} 
                    style={{ height: `${h}px` }} 
                    className="w-1 rounded-full bg-orange-500/40"
                  />
                ))}
              </div>
              
              <button className="px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-md hover:bg-orange-600 transition-colors">
                Start Recording
              </button>
            </div>
            {/* List of audio logs */}
            <div className="space-y-3">
              {voiceLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTogglePlay(log.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        log.playing ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-orange-500'
                      }`}
                    >
                      {log.playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-0.5" fill="currentColor" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{log.title}</h4>
                      <span className="text-[9px] text-slate-400 font-semibold">{log.date} • {log.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* WRITE STORY MODAL */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWriteModalOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-brand-darkSurface w-full max-w-lg rounded-2xl p-6 relative z-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Write Story Diary</h3>
                <button onClick={() => setIsWriteModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
              </div>
              <form onSubmit={handleAddDiarySubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Story Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                    placeholder="e.g. Grandma's Apple Pie Recipe Story"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Date</label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                      placeholder="e.g. Summer 1982"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Brief Summary</label>
                    <input
                      type="text"
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                      placeholder="Short preview hook text"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Full Story Narrative</label>
                  <textarea
                    required
                    rows={5}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500 resize-none"
                    placeholder="Once upon a time..."
                  />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" className="text-slate-400 hover:text-orange-500 flex items-center gap-1.5 text-xs font-semibold">
                    <ImageIcon size={16} /> Add Photo
                  </button>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <Save size={14} /> Save Entry
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
