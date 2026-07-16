// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   User, 
//   Bell, 
//   Shield, 
//   Palette, 
//   Globe, 
//   LogOut, 
//   ChevronRight, 
//   Moon, 
//   Sun,
//   Camera,
//   Mail,
//   Lock,
//   Smartphone,
//   Eye,
//   CreditCard
// } from 'lucide-react';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import { useTheme } from '../context/ThemeContext';

// const SettingItem = ({ icon: Icon, label, description, rightElement, danger }) => (
//   <div className="flex items-center justify-between p-8 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group cursor-pointer">
//     <div className="flex items-center gap-6">
//       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors duration-500 ${danger ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 'bg-slate-50 dark:bg-dark-surface text-slate-400 group-hover:text-primary'}`}>
//         <Icon size={24} />
//       </div>
//       <div>
//         <h4 className={`text-base font-heading font-black tracking-tight ${danger ? 'text-red-500' : 'dark:text-white'}`}>{label}</h4>
//         <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{description}</p>
//       </div>
//     </div>
//     {rightElement || (
//       <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-dark-surface text-slate-300 group-hover:text-primary transition-all">
//         <ChevronRight size={20} />
//       </button>
//     )}
//   </div>
// );

// const SettingsPage = () => {
//   const { isDarkMode, toggleTheme } = useTheme();

//   return (
//     <div className="max-w-4xl mx-auto space-y-16 pb-32">
//       <header className="space-y-4 px-2">
//         <h1 className="text-5xl font-heading font-black dark:text-white tracking-tighter">Core Settings</h1>
//         <p className="text-lg text-slate-500 dark:text-dark-muted font-medium max-w-xl">Configure your heritage experience and security preferences.</p>
//       </header>

//       {/* Account Section */}
//       <section className="space-y-8">
//         <div className="flex items-center gap-4 px-4">
//            <div className="w-1.5 h-6 bg-primary rounded-full" />
//            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Heritage Identity</h3>
//         </div>
//         <Card className="p-0 overflow-hidden divide-y divide-slate-100 dark:divide-dark-border rounded-[3rem] shadow-2xl shadow-black/5 border-slate-100 dark:border-dark-border">
//           <div className="p-10 flex flex-col md:flex-row items-center gap-10">
//             <div className="relative group cursor-pointer">
//               <div className="w-32 h-32 rounded-[3rem] overflow-hidden border-[6px] border-white dark:border-dark-surface shadow-2xl transition-transform duration-500 group-hover:scale-105">
//                 <img src="https://i.pravatar.cc/300?u=david" alt="David" className="w-full h-full object-cover" />
//               </div>
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[3rem]">
//                 <Camera size={32} className="text-white" />
//               </div>
//             </div>
//             <div className="flex-1 text-center md:text-left">
//               <h4 className="text-3xl font-heading font-black dark:text-white tracking-tighter">David Johnson</h4>
//               <p className="text-sm font-black text-primary uppercase tracking-[0.25em] mt-1.5">Founder Branch • 324 Connections</p>
//               <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
//                 <Button variant="primary" className="h-11 px-8 text-[11px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">Edit Heritage Info</Button>
//                 <Button variant="secondary" className="h-11 px-8 text-[11px] uppercase tracking-widest rounded-2xl border-slate-200 dark:border-dark-border">Share Profile</Button>
//               </div>
//             </div>
//           </div>
          
//           <SettingItem 
//             icon={Mail} 
//             label="Legacy Email" 
//             description="Linked to david.j@legacy.com" 
//           />
//           <SettingItem 
//             icon={Lock} 
//             label="Security Protocols" 
//             description="Two-factor authentication active" 
//           />
//           <SettingItem 
//             icon={CreditCard} 
//             label="Premium Subscription" 
//             description="Infinite Cloud Storage Active" 
//           />
//         </Card>
//       </section>

//       {/* Interface Section */}
//       <section className="space-y-8">
//         <div className="flex items-center gap-4 px-4">
//            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
//            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Experience Controls</h3>
//         </div>
//         <Card className="p-0 overflow-hidden divide-y divide-slate-100 dark:divide-dark-border rounded-[3rem] shadow-2xl shadow-black/5 border-slate-100 dark:border-dark-border">
//           <SettingItem 
//             icon={isDarkMode ? Moon : Sun} 
//             label="Dimensional Theme" 
//             description={isDarkMode ? "Cyber-Organic Dark Mode" : "High-Contrast Light Mode"}
//             rightElement={
//               <button 
//                 onClick={toggleTheme}
//                 className={`w-16 h-8 rounded-full transition-all duration-500 relative p-1.5 shadow-inner ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}
//               >
//                 <motion.div 
//                   animate={{ x: isDarkMode ? 32 : 0 }}
//                   className="w-5 h-5 bg-white rounded-full shadow-2xl flex items-center justify-center"
//                 >
//                   {isDarkMode ? <Moon size={10} className="text-primary" /> : <Sun size={10} className="text-orange-400" />}
//                 </motion.div>
//               </button>
//             }
//           />
//           <SettingItem 
//             icon={Bell} 
//             label="Alert Management" 
//             description="Ancestral Birthdays, Events, Memorials" 
//           />
//           <SettingItem 
//             icon={Eye} 
//             label="Privacy Visibility" 
//             description="Public search restricted to family branches" 
//           />
//           <SettingItem 
//             icon={Smartphone} 
//             label="Device Management" 
//             description="3 devices currently synchronized" 
//           />
//         </Card>
//       </section>

//       {/* Danger Zone */}
//       <section className="space-y-8">
//         <div className="flex items-center gap-4 px-4">
//            <div className="w-1.5 h-6 bg-red-500 rounded-full" />
//            <h3 className="text-[12px] font-black text-red-500/50 uppercase tracking-[0.3em]">Critical Actions</h3>
//         </div>
//         <Card className="p-0 overflow-hidden divide-y divide-slate-100 dark:divide-dark-border rounded-[3rem] shadow-2xl shadow-red-500/5 border-red-500/10">
//           <SettingItem 
//             icon={LogOut} 
//             label="Global Sign Out" 
//             description="Terminate all active sessions" 
//           />
//           <SettingItem 
//             icon={Shield} 
//             label="Archive & Delete Branch" 
//             description="Permanently erase your entire digital legacy" 
//             danger
//           />
//         </Card>
//       </section>

//       <div className="text-center pt-20">
//          <div className="w-12 h-12 bg-slate-50 dark:bg-dark-surface rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6">
//             <Globe size={24} />
//          </div>
//          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Family Legacy Inc. • v2.4.0-gold</p>
//          <div className="flex justify-center gap-8 mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
//             <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
//             <a href="#" className="hover:text-primary transition-colors">Service Ethics</a>
//             <a href="#" className="hover:text-primary transition-colors">Security Audit</a>
//          </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CURRENT_USER } from '../data/mockData';
import { Bell, Lock, Eye, Sun, Moon, LogOut, ShieldAlert, KeyRound, Globe, Save } from 'lucide-react';
export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  
  // Custom states for switches
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifBirthdays, setNotifBirthdays] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [username, setUsername] = useState(CURRENT_USER.name);
  const [userEmail, setUserEmail] = useState(CURRENT_USER.email);
  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Settings successfully updated!');
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">Configure your profile details, notifications, and security preferences.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: NAVIGATION LIST */}
        <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{username}</h4>
              <p className="text-[10px] text-orange-500 font-semibold">{CURRENT_USER.role}</p>
            </div>
          </div>
          <div className="space-y-1.5 text-xs font-bold">
            <button className="w-full text-left px-3 py-2 rounded-xl bg-orange-500/10 text-orange-500">Profile Settings</button>
            <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">Preferences</button>
            <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300">Security & Privacy</button>
          </div>
        </div>
        {/* RIGHT COLUMN: SETTINGS PANEL */}
        <div className="md:col-span-2 space-y-6">
          
          {/* PROFILE CONFIG FORM */}
          <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Edit Profile</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </form>
          </div>
          {/* APPEARANCE & THEME PANEL */}
          <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Appearance Settings</h3>
            
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Dark mode</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Toggle default application dark background</p>
                </div>
              </div>
              
              {/* Fake toggle switch styled as checkbox */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:height after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
          {/* PREFERENCES PANEL */}
          <div className="rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Preferences</h3>
            
            <div className="space-y-3">
              {/* Email Notifications */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Digests</h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Receive weekly summaries of family activities.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifEmail} 
                  onChange={() => setNotifEmail(!notifEmail)}
                  className="w-4 h-4 rounded text-orange-500 accent-orange-500 outline-none"
                />
              </div>
              {/* Birthday Reminders */}
              <div className="flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80 pt-3">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Birthday & Memorial Reminders</h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Get push notifications for birthdays and memorials.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifBirthdays} 
                  onChange={() => setNotifBirthdays(!notifBirthdays)}
                  className="w-4 h-4 rounded text-orange-500 accent-orange-500 outline-none"
                />
              </div>
              {/* Private Registry */}
              <div className="flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80 pt-3">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Private profile registry</h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Hide my bio details from external family branches.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={profilePrivate} 
                  onChange={() => setProfilePrivate(!profilePrivate)}
                  className="w-4 h-4 rounded text-orange-500 accent-orange-500 outline-none"
                />
              </div>
            </div>
          </div>
          {/* SIGN OUT */}
          <div className="flex justify-end">
            <button className="px-5 py-2.5 rounded-xl border border-red-500/25 text-red-500 hover:bg-red-500/5 text-xs font-bold flex items-center gap-1.5 transition-colors">
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
