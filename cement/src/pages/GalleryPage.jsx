import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Video, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';

const normalizeItem = (item) => ({
  ...item,
  url: item.url || item.image || '',
  image: item.image || item.url || '',
  type: item.type || 'photo',
  category: (item.category || 'history').toLowerCase()
});

export default function GalleryPage() {
  const [items, setItems] = useState(() => GALLERY_ITEMS.map(normalizeItem));
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const filteredItems = useMemo(() => items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'photos') return item.type === 'photo';
    if (activeFilter === 'videos') return item.type === 'video';
    return item.category === activeFilter;
  }), [items, activeFilter]);

  const categories = ['all', 'photos', 'videos', 'history', 'reunion', 'weddings'];
  const closeLightbox = () => setLightboxIndex(null);
  const stepLightbox = (direction) => {
    setLightboxIndex((current) => {
      if (current === null || !filteredItems.length) return null;
      return (current + direction + filteredItems.length) % filteredItems.length;
    });
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      event.target.value = '';
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Images must be smaller than 8 MB.');
      event.target.value = '';
      return;
    }
    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      setItems((previous) => [{
        id: `upload-${Date.now()}`,
        title: file.name.replace(/\.[^.]+$/, ''),
        image: reader.result,
        url: reader.result,
        type: 'photo',
        category: 'history',
        date: new Date().getFullYear().toString()
      }, ...previous]);
      setActiveFilter('all');
    };
    reader.onerror = () => setUploadError('This image could not be opened. Please try another file.');
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const activeItem = lightboxIndex === null ? null : filteredItems[lightboxIndex];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Media Gallery</h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Memories and snapshots captured across generations.</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="sr-only" aria-label="Choose an image to upload" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white shadow-lg shadow-primary/15 transition hover:bg-primary-600 sm:self-auto">
            <Plus size={14} /> Upload photo
          </button>
        </div>
      </div>
      {uploadError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-300">{uploadError}</p>}

      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
        {categories.map((category) => (
          <button key={category} type="button" onClick={() => { setActiveFilter(category); setLightboxIndex(null); }} className={`rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeFilter === category ? 'border-primary bg-primary text-white shadow-md shadow-primary/10' : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800 dark:border-slate-800 dark:bg-[#111D29] dark:hover:text-white'}`}>
            {category}
          </button>
        ))}
      </div>

      {filteredItems.length ? (
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.button key={item.id} type="button" layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onClick={() => setLightboxIndex(index)} aria-label={`Open ${item.title}`} className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm dark:border-slate-800 dark:bg-[#111D29] sm:aspect-square">
                <img src={item.url} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                  <div className="mb-1 flex items-center gap-1.5 text-white/80">{item.type === 'photo' ? <Camera size={14} /> : <Video size={14} />}<span className="text-[9px] font-bold uppercase tracking-wider">{item.category}</span></div>
                  <h2 className="truncate text-xs font-bold text-white">{item.title}</h2><span className="mt-0.5 text-[9px] font-semibold text-slate-300">{item.date}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 py-16 text-center dark:border-slate-800">
          <ImageIcon className="mx-auto text-slate-300" size={32} /><p className="mt-3 text-sm font-bold text-slate-600 dark:text-slate-300">No media in this collection yet</p><p className="mt-1 text-xs text-slate-400">Upload a family photo or choose another category.</p>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary"><Upload size={14} /> Upload a photo</button>
        </div>
      )}

      <AnimatePresence>
        {activeItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={closeLightbox}>
            <button type="button" aria-label="Close image viewer" onClick={closeLightbox} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><X size={20} /></button>
            <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); stepLightbox(-1); }} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6"><ChevronLeft size={22} /></button>
            <div className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
              <img src={activeItem.url} alt={activeItem.title} className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl" />
              <div className="mt-4 text-center text-white"><span className="text-[10px] font-bold uppercase tracking-widest text-primary">{activeItem.category} · {activeItem.date}</span><h2 className="mt-1 text-sm font-bold">{activeItem.title}</h2></div>
            </div>
            <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); stepLightbox(1); }} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6"><ChevronRight size={22} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
