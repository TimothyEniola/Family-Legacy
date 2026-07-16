import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, Heart, Calendar, Users, MapPin, 
  ArrowLeft, Plus, Image as ImageIcon, Video, FileText, 
  Clock, MoreVertical, Edit3, Share2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Life Story');

  // Mock member data based on the design
  const member = {
    name: 'William Johnson',
    role: 'Father',
    birthDate: '1945',
    deathDate: null,
    status: 'Alive',
    location: 'Lagos, Nigeria',
    occupation: 'Retired Teacher',
    spouse: 'Linda Johnson',
    marriedYear: '1970',
    childrenCount: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    timeline: [
      { year: '1945', title: 'Born', description: 'Born on March 12, 1945 in Ibadan, Nigeria.', image: 'https://images.unsplash.com/photo-1510771463140-7a736d86d69e?auto=format&fit=crop&q=80&w=200' },
      { year: '1965', title: 'Completed High School', description: 'Graduated from Government College Ibadan.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200' },
      { year: '1970', title: 'Married Linda Johnson', description: 'Started a new life with my best friend.', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=200' },
      { year: '1972', title: 'First Child', description: 'Michael Johnson was born.', image: 'https://images.unsplash.com/photo-1502086223501-7ea244b05fe6?auto=format&fit=crop&q=80&w=200' },
    ]
  };

  const tabs = ['About', 'Life Story', 'Timeline', 'Photos', 'Videos', 'Documents'];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#111D29] border border-slate-100 dark:border-slate-800 shadow-premium">
      
      {/* Cover Image */}
      <div className="h-64 md:h-80 relative overflow-hidden group">
        <img src={member.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all active:scale-95"><Edit3 size={18} /></button>
          <button className="p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all active:scale-95"><Share2 size={18} /></button>
        </div>
      </div>

      {/* Profile Info Header */}
      <div className="px-6 md:px-12 pb-12 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 -mt-20 relative z-10">
          <div className="relative">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3rem] border-[8px] border-white dark:border-[#111D29] overflow-hidden shadow-2xl ring-8 ring-primary/5">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 -right-2 px-4 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-full border-4 border-white dark:border-[#111D29] flex items-center gap-1.5 shadow-xl">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              {member.status}
            </div>
          </div>

          <div className="flex-1 space-y-2 text-center lg:text-left pb-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              {member.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-[11px] font-black text-slate-400 dark:text-dark-muted uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <Heart size={14} className="text-primary" /> {member.role}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-primary" /> {member.birthDate} - {member.deathDate || 'Present'}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> {member.location}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {[
            { label: 'Occupation', value: member.occupation, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Spouse', value: member.spouse, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
            { label: 'Married', value: member.marriedYear, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Children', value: member.childrenCount, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 flex flex-col gap-3 group hover:border-primary/30 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-12 border-b border-slate-100 dark:border-slate-800 flex items-center gap-10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-primary' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="profile-tab-line"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_-4px_10px_rgba(249,115,22,0.4)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {activeTab === 'Life Story' ? (
              <motion.div 
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Life Timeline</h3>
                  <button className="px-6 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <Plus size={16} /> Add Event
                  </button>
                </div>

                {/* Timeline List */}
                <div className="relative pl-12 space-y-16 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                  {member.timeline.map((event, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[37px] top-1.5 w-10 h-10 rounded-2xl bg-white dark:bg-[#111D29] border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center z-10 shadow-lg group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      </div>
                      <div className="grid lg:grid-cols-5 gap-8 items-start">
                        <div className="lg:col-span-1">
                          <span className="text-4xl font-black text-primary/30 dark:text-primary/20 tracking-tighter group-hover:text-primary transition-colors">{event.year}</span>
                        </div>
                        <div className="lg:col-span-3 space-y-3">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{event.title}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {event.description}
                          </p>
                        </div>
                        <div className="lg:col-span-1">
                          <div className="rounded-3xl overflow-hidden aspect-video shadow-xl border border-slate-100 dark:border-slate-800/50 group-hover:ring-8 ring-primary/5 transition-all">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-300">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Archiving in Progress</h4>
                  <p className="text-sm text-slate-500 font-medium">This section is currently being updated by the family historian.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
