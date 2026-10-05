import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFamily } from '../context/FamilyContext';
import { motion } from 'framer-motion';
import { Search, MapPin, UploadCloud, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { members, setActiveMemberId } = useFamily();
  
  const searchVal = searchParams.get('q') || '';
  const [filterBirthPlace, setFilterBirthPlace] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('text'); // text, face, match, missing
  const updateSearch = (value) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value.trim()) next.set('q', value);
      else next.delete('q');
      return next;
    }, { replace: true });
  };

  // Text search filter logic
  const searchResults = members.filter(m => {
    const matchesName = m.name.toLowerCase().includes(searchVal.toLowerCase()) || m.role.toLowerCase().includes(searchVal.toLowerCase());
    const matchesPlace = filterBirthPlace ? m.birthPlace.toLowerCase().includes(filterBirthPlace.toLowerCase()) : true;
    return matchesName && matchesPlace;
  });

  const handleMemberClick = (id) => {
    setActiveMemberId(id);
    navigate(`/profile/${id}`);
  };

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white">Family Registry Search</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs">Query the family registries, missing profiles, and match historical records.</p>
      </div>

      {/* SEARCH TYPE TABS */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        {[
          { id: 'text', label: 'Registry Search' },
          { id: 'face', label: 'Face AI Search' },
          { id: 'match', label: 'Match Records' },
          { id: 'missing', label: 'Missing Persons' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSearchTab(tab.id)}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all relative ${
              activeSearchTab === tab.id 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
            {activeSearchTab === tab.id && (
              <motion.div 
                layoutId="searchTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* SEARCH TABS ROUTING */}
      <div>
        {activeSearchTab === 'text' && (
          <div className="space-y-6">
            
            {/* SEARCH FILTERS BOX */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => updateSearch(e.target.value)}
                  placeholder="Search by name, role (e.g. David, Child, Grandfather)..."
                  className="w-full bg-transparent border-none outline-none text-xs text-slate-950 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                <MapPin size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={filterBirthPlace}
                  onChange={(e) => setFilterBirthPlace(e.target.value)}
                  placeholder="Filter by birthplace (e.g. Lagos, Seattle)..."
                  className="w-full bg-transparent border-none outline-none text-xs text-slate-950 dark:text-white"
                />
              </div>
            </div>

            {/* SEARCH RESULTS LIST */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registry Results ({searchResults.length})</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {searchResults.length > 0 ? (
                  searchResults.map(member => {
                    const statusColor = 
                      member.status === 'Alive' ? 'text-green-500' :
                      member.status === 'Deceased' ? 'text-slate-400' : 'text-red-500';
                    return (
                      <div 
                        key={member.id}
                        onClick={() => handleMemberClick(member.id)}
                        className="p-4 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-200 dark:border-slate-800 hover:border-orange-500 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
                      >
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-orange-500/10" />
                        <div className="overflow-hidden flex-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{member.name}</h4>
                          <span className="text-[9px] text-slate-400 font-semibold block">{member.role}</span>
                          <span className={`text-[8px] font-bold block mt-1 ${statusColor}`}>{member.status}</span>
                        </div>
                        <ArrowRight size={14} className="text-slate-300 dark:text-slate-600" />
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full p-8 text-center text-slate-400 text-xs italic bg-white dark:bg-[#111D29] border border-slate-200 dark:border-slate-800 rounded-2xl">
                    No family members found matching that criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSearchTab === 'face' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mx-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
              <UploadCloud size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upload Historical Portrait Scan</h3>
              <p className="text-[10px] text-slate-500 max-w-sm mx-auto">
                Our Face AI matching scanner can analyze old family snapshots and find potential member profile matches in our digital archives.
              </p>
            </div>
            
            {/* Fake Upload area */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 bg-slate-50/50 dark:bg-slate-900/30 cursor-pointer hover:border-orange-500/40 transition-colors">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Drag and drop file here, or <span className="text-orange-500">browse file</span></p>
              <span className="text-[9px] text-slate-400 block mt-1">Supports JPEG, PNG up to 10MB</span>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-md hover:bg-orange-600 transition-colors">
              Scan & Find Match
            </button>
          </div>
        )}

        {activeSearchTab === 'match' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto animate-spin-slow">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ancestral Census Matcher</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              We query external public databases, ship log manifests, and historical census entries to automatically find documentation matching family profiles.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
              ⚡ Autolink feature is ready. 3 matching marriage record candidates found.
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-md">
              Run Records Lookup
            </button>
          </div>
        )}

        {activeSearchTab === 'missing' && (
          <div className="space-y-6">
            
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle size={18} className="shrink-0" />
              <span>
                <strong>Missing Person Registry:</strong> Active profiles matching status "Missing" are flagged globally for community feedback updates.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {members.filter(m => m.status === 'Missing').map(member => (
                <div key={member.id} className="p-5 rounded-2xl bg-white dark:bg-[#111D29] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex gap-4">
                    <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover shrink-0 ring-4 ring-red-500/20" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{member.name}</h4>
                      <p className="text-[10px] text-red-500 font-bold mt-0.5">⚠️ Missing Since 2021</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Last Seen: Coast of East Africa</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {member.bio}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] text-slate-400 font-semibold">Contact: family.admin@legacy.com</span>
                    <button className="px-3.5 py-1.5 rounded-lg bg-orange-500 text-white text-[10px] font-bold">Submit Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
