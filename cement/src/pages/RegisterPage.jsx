import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GitFork, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-6 selection:bg-primary selection:text-white">
      
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl grid lg:grid-cols-2 bg-white dark:bg-[#111D29] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 relative z-10"
      >
        
        {/* Left Side - Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create Legacy</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Start your family's digital journey today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">First Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input type="text" required placeholder="John" className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Last Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input type="text" required placeholder="Doe" className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input type="email" required placeholder="name@family.com" className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input type="password" required placeholder="••••••••" className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                I agree to the <Link to="/terms" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</Link>. I understand my family data is private and encrypted.
              </p>
            </div>

            <button type="submit" className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
              Create My Account <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white dark:bg-[#111D29] px-4 text-slate-400">Or sign up with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <FcGoogle size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <FaGithub size={18} /> GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in here</Link>
          </p>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:block relative p-12 bg-slate-900 overflow-hidden order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900 to-primary/20 opacity-90"></div>
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <GitFork size={22} className="rotate-180" />
              </div>
              <h1 className="text-xl font-black tracking-tight">Family Legacy</h1>
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-xl font-bold">Privacy First Approach</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Your family archives are end-to-end encrypted. Only invited members can view your legacy. We never sell your personal history.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-2xl font-black text-primary tracking-tighter">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Secure Storage</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-2xl font-black text-primary tracking-tighter">Unlimited</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Photos & Videos</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Trusted by 50,000+ family trees globally.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
