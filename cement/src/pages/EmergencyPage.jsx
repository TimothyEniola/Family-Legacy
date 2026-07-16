import React from 'react';
import { Siren, Phone, ShieldAlert, Heart, MapPin, Plus, ArrowRight, UserPlus, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmergencyPage() {
  const contacts = [
    { id: 1, name: 'David Johnson', relation: 'Family Head', phone: '+234 801 234 5678', location: 'Lagos', status: 'Available' },
    { id: 2, name: 'Linda Johnson', relation: 'Grandmother', phone: '+234 802 987 6543', location: 'Lagos', status: 'At Home' },
    { id: 3, name: 'Michael Johnson', relation: 'Brother', phone: '+1 415 555 0123', location: 'Seattle, USA', status: 'Available' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-red-500 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-red-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-transparent to-transparent opacity-50"></div>
        <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center shrink-0 relative z-10">
          <Siren size={48} className="animate-pulse" />
        </div>
        <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight leading-tight">Family Emergency Response</h1>
          <p className="text-lg text-white/80 font-medium max-w-2xl">Access critical family contacts, medical history summaries, and legal protocols in case of urgent situations.</p>
        </div>
        <button className="px-10 py-5 bg-white text-red-600 font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 whitespace-nowrap">
          Broadcast Alert
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Urgent Contacts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Phone className="text-red-500" size={20} /> Trusted Contacts
            </h3>
            <button className="text-xs font-bold text-primary hover:underline">Manage Contacts</button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {contacts.map((contact, idx) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#111D29] p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-red-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-inner">
                    <img src={`https://i.pravatar.cc/150?u=${contact.name.split(' ')[0]}`} className="w-full h-full object-cover" alt={contact.name} />
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {contact.status}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{contact.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">{contact.relation}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-800/50">
                    <p className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                      <Phone size={14} className="text-red-500" /> {contact.phone}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin size={14} className="text-slate-400" /> {contact.location}
                    </p>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  Call Securely
                </button>
              </motion.div>
            ))}
            
            <button className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 gap-4 hover:border-primary transition-all text-slate-400 hover:text-primary min-h-[300px]">
              <UserPlus size={40} />
              <div className="text-center">
                <p className="font-bold">Add Responder</p>
                <p className="text-[10px] mt-1 opacity-70">Designate another family member as an emergency responder.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Protocols & Medical */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#111D29] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="text-red-500" size={20} /> Safety Protocols
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20">
                <p className="text-xs font-bold text-orange-800 dark:text-orange-300 flex items-center gap-2">
                  <AlertTriangle size={14} /> Medical Info Ready
                </p>
                <p className="text-[10px] text-orange-600 dark:text-orange-400/80 mt-1 leading-relaxed">David and Linda's health summaries are updated as of June 2026.</p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between group transition-all">
                  Evacuation Plan <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between group transition-all">
                  Legal Documents Access <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between group transition-all">
                  Meeting Point: Lagos <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent"></div>
            <Heart size={32} className="text-red-500 relative z-10" />
            <h4 className="text-lg font-bold tracking-tight relative z-10 mt-4">Legacy Insurance</h4>
            <p className="text-xs text-slate-400 leading-relaxed relative z-10 mt-2">Our heritage vault provides special emergency access keys to your lawyers in case of catastrophic events.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline flex items-center gap-1 relative z-10 mt-6 transition-all">
              Manage Legal Access <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
