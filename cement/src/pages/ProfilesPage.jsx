import { useFamily } from '../context/FamilyContext';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, MapPin, ArrowRight, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilesPage() {
  const { members } = useFamily();
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="text-primary" /> Family Directory
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and explore profiles of all members across generations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search directory..." 
              className="pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-100 dark:border-slate-800 focus:border-primary outline-none text-sm transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => navigate(`/profile/${member.id}`)}
            className="bg-white dark:bg-[#111D29] p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-primary/30 transition-all cursor-pointer text-center flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-[2rem] overflow-hidden shadow-xl ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white dark:border-[#111D29] shadow-lg
                ${member.status === 'Alive' ? 'bg-green-500' : 'bg-slate-400'}
              `}></div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate max-w-[180px]">
                {member.name}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{member.role}</p>
              <div className="flex items-center justify-center gap-4 pt-3 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1"><MapPin size={12} /> {member.birthPlace.split(',')[0]}</span>
                <span className="flex items-center gap-1"><Heart size={12} /> {member.birthDate.split('-')[0]}</span>
              </div>
            </div>
            <div className="mt-6 w-full pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">View Biography</span>
              <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
