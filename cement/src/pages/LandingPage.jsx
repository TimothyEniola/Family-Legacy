import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitFork, BookOpen, Users, Heart, ArrowRight, Shield, Award, Sparkles } from 'lucide-react';
import { LANDING_FAQS } from '../data/mockData';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  return (
    <div className="bg-white text-slate-900 dark:bg-[#0F172A] dark:text-slate-100 min-h-screen selection:bg-primary selection:text-white transition-colors duration-300 pt-6">
      <section className="relative pt-20 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
  
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles size={14} /> Next-Generation Heritage Platform
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900 dark:text-white">
            Preserve Your <br />
            <span className="text-primary italic">Family Story</span> <br />
            For Generations.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            The ultimate digital vault for your family tree, biographies, traditions, and memories. Secure, private, and beautifully archived.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-primary text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
            >
              Start Free Archive <ArrowRight size={20} />
            </button>
            <div className="flex items-center gap-3 px-6 py-4 rounded-[2rem] bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?u=a${i}`}
                    className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-800"
                    alt="User"
                  />
                ))}
              </div>
              <span className="text-xs">+50k Families</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <div className="relative p-2 rounded-[3rem] bg-gradient-to-br from-primary/30 to-blue-500/30 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200"
              alt="Dashboard Preview"
              className="relative rounded-[2.5rem] w-full shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </motion.div>
      </section>

      <section id="features" className="py-32 bg-slate-50 dark:bg-[#0F172A]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Built for your lineage</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Everything you need to archive and celebrate your roots in one secure place.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Interactive Tree', desc: 'Map out generations with beautiful dynamic connects and photo nodes.', icon: GitFork, color: 'bg-orange-500' },
              { title: 'AI Image Search', desc: 'Find family members across thousands of photos using facial recognition.', icon: Users, color: 'bg-blue-500' },
              { title: 'Secure Vault', desc: 'End-to-end encrypted storage for property records and documents.', icon: Shield, color: 'bg-green-500' },
              { title: 'Life Timelines', desc: 'Beautifully rendered biographies and milestone journals for every member.', icon: BookOpen, color: 'bg-purple-500' },
              { title: 'Memorial Walls', desc: 'Honor ancestors with virtual candles and tribute archives.', icon: Heart, color: 'bg-rose-500' },
              { title: 'Community Hub', desc: 'Private channels for family chat, announcements, and events.', icon: Award, color: 'bg-amber-500' }
            ].map((feat, idx) => (
              <div key={idx} className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111D29] border border-slate-100 dark:border-slate-800 shadow-premium group hover:border-primary/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${feat.color} text-white flex items-center justify-center mb-6 shadow-xl shadow-${feat.color.split('-')[1]}/20 group-hover:scale-110 transition-transform`}>
                  <feat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-black uppercase tracking-[0.3em]">
              <Sparkles size={14} /> FAQ & Support
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Questions answered for every family.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">Get a quick overview of how to start, invite relatives, protect your data, and preserve your family legacy.</p>
            <button
              onClick={() => navigate('/faq')}
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              Read full FAQ
            </button>
          </div>
          <div className="grid gap-4">
            {LANDING_FAQS.slice(0, 3).map((faq, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{faq.question}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto rounded-[3.5rem] bg-primary p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10 flex-1 space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight">Your family story deserves to be told.</h2>
            <p className="text-lg text-white/80 font-medium max-w-xl">Start your digital legacy today. Free for up to 10 family members. No credit card required.</p>
          </div>
          <div className="relative z-10">
            <button
              onClick={() => navigate('/register')}
              className="px-12 py-6 rounded-[2rem] bg-white text-primary font-black uppercase tracking-widest text-lg shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
