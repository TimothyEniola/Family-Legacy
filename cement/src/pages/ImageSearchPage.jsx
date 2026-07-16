import React, { useState } from 'react';
import { Search, Upload, Image as ImageIcon, X, Loader2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageSearchPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Mock data for search results
  const MOCK_RESULTS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400', date: 'June 2024', location: 'Lagos, Nigeria', event: 'Family Reunion' },
    { id: 2, url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=400', date: 'Dec 2023', location: 'Ibadan, Nigeria', event: 'Grandma birthday' },
    { id: 3, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', date: 'Jan 2024', location: 'London, UK', event: 'Holiday Visit' },
    { id: 4, url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', date: 'Aug 2023', location: 'Accra, Ghana', event: 'Wedding' },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setSearchResults([]);
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = () => {
    if (!selectedImage) return;
    setIsSearching(true);
    // Simulate AI Search
    setTimeout(() => {
      setSearchResults(MOCK_RESULTS);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Image Search</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
          Upload a photo of a family member to find all archives containing their face across our entire digital legacy.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Upload Zone */}
        <div className="space-y-6">
          <div 
            className={`relative h-[400px] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 text-center overflow-hidden
              ${dragActive ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111D29]'}
              ${selectedImage ? 'border-primary/50' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <AnimatePresence mode="wait">
              {!selectedImage ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                    <Upload size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">Drag & Drop face photo</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">or click to browse from your device</p>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full relative"
                >
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            disabled={!selectedImage || isSearching}
            onClick={handleSearch}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all
              ${!selectedImage || isSearching 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-primary text-white shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95'}
            `}
          >
            {isSearching ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Analyzing Facial Features...</span>
              </>
            ) : (
              <>
                <Camera size={20} />
                <span>Search Legacy Archive</span>
              </>
            )}
          </button>
          
          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
            <span className="font-bold block mb-1">AI Notice:</span>
            Face recognition is a simulated UI feature. Future integration will use deep learning to scan your entire family gallery.
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {searchResults.length > 0 ? `Results Found (${searchResults.length})` : 'Search Results'}
            </h3>
            {searchResults.length > 0 && (
              <button className="text-sm font-bold text-primary hover:underline">View All Matches</button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {searchResults.length > 0 ? (
                searchResults.map((result, idx) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm"
                  >
                    <img src={result.url} alt="Result" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] font-bold text-primary">{result.event}</p>
                      <p className="text-xs font-bold leading-tight">{result.location}</p>
                      <p className="text-[9px] opacity-70 mt-0.5">{result.date}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 h-[400px] border-2 border-slate-100 dark:border-slate-800/50 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                    <ImageIcon size={28} />
                  </div>
                  <p className="text-sm font-medium">Results will appear here after search</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
