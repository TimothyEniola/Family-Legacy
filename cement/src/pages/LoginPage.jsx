import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GitFork, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-6 selection:bg-primary selection:text-white">
      
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid lg:grid-cols-2 bg-white dark:bg-[#111D29] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 relative z-10"
      >
        
        {/* Left Side - Visual */}
        <div className="hidden lg:block relative p-12 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-500 to-[#C2410C] opacity-90"></div>
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <GitFork size={22} className="rotate-180" />
              </div>
              <h1 className="text-xl font-black tracking-tight">Family Legacy</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-black leading-tight tracking-tighter">
                Connect your past to your future.
              </h2>
              <p className="text-white/80 font-medium leading-relaxed">
                "The family is one of nature's masterpieces. Join thousands of families preserving their heritage."
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=user${i}`} className="w-10 h-10 rounded-full border-2 border-primary shadow-lg" alt="User" />
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">+12k Families joined</p>
              </div>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              &copy; 2026 Family Legacy Inc.
            </p>
          </div>
          
          {/* Abstract circles */}
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Back</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Log in to your private family archive.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@family.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                <Link to="/forgot-password" size={14} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-bold text-slate-900 dark:text-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Log In to Archive <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white dark:bg-[#111D29] px-4 text-slate-400">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <FcGoogle size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <FaGithub size={18} /> GitHub
            </button>
          </div>

          <p className="mt-10 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
            New to Family Legacy? <Link to="/register" className="text-primary font-bold hover:underline">Create a free family account</Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
