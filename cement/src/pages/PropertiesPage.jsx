import { Shield, MapPin, Building, Key, Plus, ArrowRight, Home, LandPlot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertiesPage() {
  const assets = [
    { id: 1, name: 'Ebute Metta Compound', type: 'Residential', location: 'Lagos, Nigeria', status: 'Family Owned', value: 'Prime', icon: Home },
    { id: 2, name: 'Ibadan Farm Lands', type: 'Agricultural', location: 'Oyo State', status: 'Leased', value: 'High', icon: LandPlot },
    { id: 3, name: 'Lekki Commercial Plot', type: 'Development', location: 'Lekki Phase 1', status: 'Pending Approval', value: 'Ultra', icon: Building },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Shield className="text-primary" /> Property Records
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and track family-owned real estate and land assets.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
          <Plus size={16} /> Register Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assets.map((asset, idx) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#111D29] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-primary/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-inner">
                  <asset.icon size={28} />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest 
                  ${asset.status === 'Family Owned' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}
                `}>
                  {asset.status}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{asset.name}</h3>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <MapPin size={14} className="text-primary" /> {asset.location}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Key size={14} className="text-primary" /> {asset.type} Asset
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Valuation Tier</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{asset.value} Growth</p>
              </div>
              <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-primary transition-all">
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent"></div>
        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center shrink-0 relative z-10">
          <Shield size={40} className="text-primary" />
        </div>
        <div className="flex-1 space-y-2 relative z-10 text-center md:text-left">
          <h4 className="text-2xl font-bold tracking-tight">Legal Ownership Vault</h4>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">All property deeds and certificates of occupancy are stored in our secure, end-to-end encrypted vault. Only verified family administrators can access digital copies for legal purposes.</p>
        </div>
        <button className="px-8 py-4 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all shrink-0 relative z-10">
          Verify Ownership
        </button>
      </div>
    </div>
  );
}
