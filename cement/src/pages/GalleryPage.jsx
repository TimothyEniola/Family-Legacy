
import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight, Camera, Video, Folder, Plus } from 'lucide-react';
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  // Filters logic
  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'photos') return item.type === 'photo';
    if (activeFilter === 'videos') return item.type === 'video';
    return item.category.toLowerCase() === activeFilter;
  });
  const categories = ['all', 'photos', 'videos', 'history', 'reunion', 'weddings'];
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };
  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };
  const handlePrev = () => {
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white">Media Gallery</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Memories and snapshots captured across generations.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/15 flex items-center gap-1.5 self-start sm:self-auto">
          <Plus size={14} /> Upload Media
        </button>
      </div>
      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${
              activeFilter === cat 
                ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10' 
                : 'bg-white dark:bg-brand-darkSurface border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* MEDIA GRID (MASONRY-LIKE GRID) */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleOpenLightbox(index)}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkSurface shadow-sm relative group cursor-pointer aspect-video sm:aspect-square"
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
                  <div className="flex items-center gap-1.5 text-white/80 mb-1">
                    {item.type === 'photo' ? <Camera size={14} /> : <Video size={14} />}
                    <span className="text-[9px] font-bold uppercase tracking-wider">{item.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight truncate">{item.title}</h4>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{item.date}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      {/* FULLSCREEN LIGHTBOX POPUP */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
            <button 
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
            >
              <X size={20} />
            </button>
            {/* Left Nav Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            {/* Main Lightbox Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl w-full flex flex-col items-center justify-center relative p-2"
            >
              <img 
                src={filteredItems[lightboxIndex]?.url} 
                alt={filteredItems[lightboxIndex]?.title} 
                className="max-h-[70vh] rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center text-slate-100 space-y-1.5 px-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">{filteredItems[lightboxIndex]?.category} • {filteredItems[lightboxIndex]?.date}</span>
                <h3 className="text-sm font-bold leading-tight">{filteredItems[lightboxIndex]?.title}</h3>
              </div>
            </motion.div>
            {/* Right Nav Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
