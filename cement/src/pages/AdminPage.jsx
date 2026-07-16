import React from 'react';
import { LayoutPanelLeft, Users, Shield, Database, Settings, ArrowRight, UserPlus, FileCheck, Activity, BarChart3, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const stats = [
    { label: 'Total Branches', value: '12', icon: Database, color: 'bg-blue-500' },
    { label: 'Active Admins', value: '4', icon: Shield, color: 'bg-green-500' },
    { label: 'Storage Used', value: '1.2 TB', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <LayoutPanelLeft className="text-primary" /> Super Admin Control
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Advanced heritage infrastructure management and system protocols.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
            <Settings size={16} /> System Logs
          </button>
          <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Shield size={16} /> Security Audit
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#111D29] p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-primary/30 transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Branch Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#111D29] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Heritage Branches</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search branches..." className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {[
                { name: 'Lagos Main Branch', head: 'David Johnson', members: 124, status: 'Synced', health: 100 },
                { name: 'Seattle Tech Branch', head: 'Michael Johnson', members: 42, status: 'Synced', health: 98 },
                { name: 'Oyo Heritage Farm', head: 'Samuel Johnson', members: 86, status: 'Maintenance', health: 85 },
              ].map((branch, idx) => (
                <div key={idx} className="p-8 flex items-center justify-between group hover:bg-slate-50/40 dark:hover:bg-slate-900/40 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-inner">
                      <Database size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{branch.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Head: {branch.head} • {branch.members} registered members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sync Health</p>
                      <p className="text-sm font-bold text-primary mt-0.5">{branch.health}%</p>
                    </div>
                    <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-primary transition-all">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50/50 dark:bg-slate-900/30 text-center">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline flex items-center justify-center mx-auto gap-2">
                Provision New Branch <UserPlus size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Global Protocols */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent"></div>
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                <Shield size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight">Encryption Keys</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">Rotating global family access keys. Ensure all head administrators have updated their offline physical recovery tokens.</p>
              </div>
              <button className="w-full py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all">
                Rotate Access Keys
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111D29] p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Protocols</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-primary/5 transition-all group">
                <div className="flex items-center gap-3">
                  <FileCheck size={18} className="text-slate-400 group-hover:text-primary" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Database Backup</span>
                </div>
                <ArrowRight size={14} className="text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-primary/5 transition-all group">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-slate-400 group-hover:text-primary" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Invite Admin</span>
                </div>
                <ArrowRight size={14} className="text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
