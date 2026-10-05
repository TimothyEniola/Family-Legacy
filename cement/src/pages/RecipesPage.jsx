import { Utensils, Search, Plus, Filter, Heart, Clock, Users, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipesPage() {
  const recipes = [
    { 
      id: 1, 
      name: 'Grandma’s Special Jollof', 
      chef: 'Mary Johnson', 
      time: '45 mins', 
      servings: '6-8', 
      likes: 124,
      image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=600',
      difficulty: 'Medium'
    },
    { 
      id: 2, 
      name: 'Ancestral Egusi Soup', 
      chef: 'Linda Johnson', 
      time: '60 mins', 
      servings: '4', 
      likes: 89,
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=600',
      difficulty: 'Hard'
    },
    { 
      id: 3, 
      name: 'Heritage Pounded Yam', 
      chef: 'Robert Johnson', 
      time: '30 mins', 
      servings: '10', 
      likes: 56,
      image: 'https://images.unsplash.com/photo-1618331812910-001dd3f47016?auto=format&fit=crop&q=80&w=600',
      difficulty: 'Easy'
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Utensils className="text-primary" /> Family Recipe Vault
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Preserving the unique tastes and secret ingredients of our ancestors.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
          <Plus size={16} /> Add Recipe
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-[#111D29] p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-premium">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search family dishes..." className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
        </div>
        <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-primary transition-all">
          <Filter size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, idx) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#111D29] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-premium group hover:shadow-2xl transition-all flex flex-col"
          >
            <div className="h-56 relative overflow-hidden">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 dark:bg-[#111D29]/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-lg">
                {recipe.difficulty}
              </div>
              <button className="absolute bottom-4 left-4 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-primary transition-all shadow-lg">
                <Heart size={18} />
              </button>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                  {recipe.name}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {recipe.time}</span>
                  <span className="flex items-center gap-2"><Users size={14} className="text-primary" /> {recipe.servings} Servings</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                    <img src={`https://i.pravatar.cc/100?u=${recipe.chef.split(' ')[0]}`} className="w-full h-full object-cover" alt={recipe.chef} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Family Chef</p>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white mt-1">{recipe.chef}</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 p-8 md:p-12 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent"></div>
        <div className="relative z-10 flex-1 space-y-6 text-center md:text-left">
          <BookOpen size={48} className="text-primary mx-auto md:mx-0" />
          <h2 className="text-3xl font-black tracking-tight leading-tight">The Culinary Heritage Book</h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">Every family has a unique flavor. We are compiling our ancestral recipes into a digital heirloom book. Contribute your branch's secret recipes to ensure they are tasted for generations to come.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">Download PDF Book</button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest rounded-2xl border border-white/20 hover:bg-white/20 transition-all">View Statistics</button>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-1/3">
          <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] shadow-2xl border-4 border-white/10" alt="Cooking" />
        </div>
      </div>
    </div>
  );
}
