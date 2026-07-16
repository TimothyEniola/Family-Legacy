import React from 'react';
import { Users, Baby, Calendar, Heart, GitFork, ArrowRight, Clock, MessageSquare, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { CURRENT_USER, RECENT_ACTIVITIES } from '../data/mockData';

export default function DashboardPage() {
  const stats = [
    { label: 'Family Members', value: '324', icon: Users, color: 'bg-orange-500', trend: 'View all members' },
    { label: 'New Births', value: '7', icon: Baby, color: 'bg-blue-500', trend: 'In this month' },
    { label: 'Upcoming Events', value: '5', icon: Calendar, color: 'bg-green-500', trend: 'View calendar' },
    { label: 'Memorials', value: '12', icon: Heart, color: 'bg-red-500', trend: 'Remembered' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Welcome back, {CURRENT_USER.name.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Here's what's happening in your family today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#111D29] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
              <p className="text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-2 cursor-pointer hover:underline">
                {stat.trend} <ArrowRight size={10} />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Family Tree Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Family Tree Overview
            </h3>
            <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              View Full Tree
            </button>
          </div>
          <div className="aspect-[16/9] bg-white dark:bg-[#111D29] rounded-3xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group shadow-premium">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {/* Simplified Tree Mockup */}
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-12">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-1">
                  <img src="https://i.pravatar.cc/150?u=robert" className="w-full h-full rounded-full object-cover" alt="Ancestor" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <p className="text-[10px] font-bold">Robert Johnson</p>
                    <p className="text-[8px] text-slate-400">1920 - 1998</p>
                  </div>
                </div>
                <div className="flex gap-24 relative">
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[150%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 p-0.5 relative">
                      <img src={`https://i.pravatar.cc/150?u=child${i}`} className="w-full h-full rounded-full object-cover" alt="Member" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111D29] via-transparent to-transparent opacity-40"></div>
          </div>
        </div>

        {/* Family Activity Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Family Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="bg-white dark:bg-[#111D29] rounded-3xl border border-slate-100 dark:border-slate-800 p-6 space-y-6 shadow-premium">
            {RECENT_ACTIVITIES.map((activity, idx) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className="relative shrink-0">
                  <img src={activity.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10" alt={activity.user} />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-white border-2 border-white dark:border-[#111D29]">
                    <Clock size={8} />
                  </div>
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-xs text-slate-900 dark:text-white">
                    <span className="font-bold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] text-primary font-bold italic">"{activity.detail}"</p>
                  <p className="text-[10px] text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}

            {/* Legacy Card */}
            <div className="mt-8 p-6 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <Quote className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-80">Legacy of the Day</h4>
                <p className="text-sm font-medium leading-relaxed italic">
                  "A family is not an important thing, it's everything."
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/40">
                    <img src="https://i.pravatar.cc/150?u=fox" className="w-full h-full object-cover" alt="Author" />
                  </div>
                  <span className="text-[10px] font-bold">— Michael J. Fox</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
