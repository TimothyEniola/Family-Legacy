import React from 'react';
import { Calendar, MapPin, Clock, Users, Plus, ArrowRight, Gift, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'Annual Family Reunion',
      date: 'July 20, 2026',
      time: '10:00 AM',
      location: 'Johnson Compound, Lagos',
      attendees: 42,
      category: 'Reunion',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
      color: 'border-orange-500'
    },
    {
      id: 2,
      title: 'Grandma’s 80th Celebration',
      date: 'August 12, 2026',
      time: '4:00 PM',
      location: 'Grand Ballroom, Victoria Island',
      attendees: 120,
      category: 'Birthday',
      image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=600',
      color: 'border-blue-500'
    },
    {
      id: 3,
      title: 'Summer Heritage Picnic',
      date: 'June 25, 2026',
      time: '12:00 PM',
      location: 'Freedom Park, Lagos',
      attendees: 28,
      category: 'Picnic',
      image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=600',
      color: 'border-green-500'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Calendar className="text-primary" /> Family Events
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Keep track of upcoming gatherings and celebrations.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto">
          <Plus size={16} /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white dark:bg-[#111D29] rounded-[2.5rem] border-2 ${event.color} border-opacity-10 dark:border-opacity-20 overflow-hidden shadow-premium group hover:shadow-2xl transition-all flex flex-col`}
          >
            <div className="h-48 relative overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 dark:bg-[#111D29]/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-lg">
                {event.category}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-xs font-bold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <Clock size={16} className="text-primary" />
                    <span className="text-xs font-bold">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-xs font-bold truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=evt${event.id}${i}`} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111D29]" alt="Attendee" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">+{event.attendees - 3} joining</span>
                </div>
                <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
          <div className="relative z-10 space-y-4 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Gift size={24} className="text-primary" />
            </div>
            <h4 className="text-2xl font-bold tracking-tight">Birthdays & Anniversaries</h4>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">Never miss a special day in the family. Sync your calendar to get automated reminders for ancestral birthdays.</p>
            <button className="px-6 py-3 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all mt-4">
              Sync Calendar
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111D29] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden group shadow-premium">
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/5 flex items-center justify-center">
              <Utensils size={24} className="text-primary" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Catering & Traditions</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">Planning a feast? Check our family recipe vault to ensure the traditional menu is preserved for the next event.</p>
            <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-sm hover:scale-105 transition-all mt-4">
              View Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
