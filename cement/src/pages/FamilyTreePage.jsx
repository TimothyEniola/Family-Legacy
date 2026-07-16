
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFamily } from '../context/FamilyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2, GitFork, UserPlus, Heart, Eye } from 'lucide-react';
export default function FamilyTreePage() {
  const navigate = useNavigate();
  const { members, setActiveMemberId, addMember } = useFamily();
  // Navigation states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewType, setViewType] = useState('hierarchical'); // hierarchical or circular
  const [collapsedBranches, setCollapsedBranches] = useState({});
  // Add Member Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Child');
  const [newMemberStatus, setNewMemberStatus] = useState('Alive');
  const [newMemberBirth, setNewMemberBirth] = useState('');
  const [newMemberParent, setNewMemberParent] = useState('david-johnson');
  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  // Drag pan controls
  const handleMouseDown = (e) => {
    if (e.target.closest('.member-card') || e.target.closest('.control-button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);
  // Toggle Collapse / Expand
  const toggleCollapse = (id) => {
    setCollapsedBranches(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const handleMemberClick = (id) => {
    setActiveMemberId(id);
    navigate(`/profile/${id}`);
  };
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMemberName) return;
    
    addMember({
      name: newMemberName,
      role: newMemberRole,
      status: newMemberStatus,
      birthDate: newMemberBirth,
      parentId: newMemberParent
    });
    
    setNewMemberName('');
    setIsAddModalOpen(false);
  };
  // Define generation coordinates for Hierarchical SVG lines
  // These coords align with our visual CSS tree rows below.
  const svgLines = [
    // Robert & Mary to William
    { fromX: 250, fromY: 60, toX: 250, toY: 130 },
    // William & Linda to children
    { fromX: 250, fromY: 170, toX: 250, toY: 210 },
    { fromX: 100, fromY: 210, toX: 400, toY: 210 }, // Horizontal bridge
    // Downwards to David, James, Sarah, Michael
    { fromX: 100, fromY: 210, toX: 100, toY: 250 }, // To David
    { fromX: 200, fromY: 210, toX: 200, toY: 250 }, // To James
    { fromX: 300, fromY: 210, toX: 300, toY: 250 }, // To Sarah
    { fromX: 400, fromY: 210, toX: 400, toY: 250 }, // To Michael
    // David & Helen to Children
    { fromX: 100, fromY: 290, toX: 100, toY: 340 },
    { fromX: 0, fromY: 340, toX: 200, toY: 340 }, // Horizontal bridge for children
    { fromX: 0, fromY: 340, toX: 0, toY: 380 },   // To Emma
    { fromX: 100, fromY: 340, toX: 100, toY: 380 }, // To Liam
    { fromX: 200, fromY: 340, toX: 200, toY: 380 }  // To Olivia
  ];
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col relative select-none overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkSurface shadow-sm">
      
      {/* HEADER CONTROLS */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between z-10 bg-white/80 dark:bg-brand-darkSurface/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <GitFork size={18} className="rotate-180" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Interactive Ancestry Tree</h3>
            <p className="text-[10px] text-slate-400">Drag to pan. Scroll or use controls to zoom.</p>
          </div>
        </div>
        {/* View Switch & Add Member buttons */}
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-1 flex">
            <button
              onClick={() => setViewType('hierarchical')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'hierarchical' 
                  ? 'bg-white dark:bg-brand-darkSurface text-orange-500 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Hierarchical Tree
            </button>
            <button
              onClick={() => setViewType('circular')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'circular' 
                  ? 'bg-white dark:bg-brand-darkSurface text-orange-500 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Circular Ring
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-500/15 hover:bg-orange-600 transition-all flex items-center gap-1.5"
          >
            <UserPlus size={14} /> Add Member
          </button>
        </div>
      </div>
      {/* CANVAS CONTAINER */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex-1 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <motion.div
          animate={{ x: pan.x, y: pan.y, scale: zoom }}
          transition={isDragging ? { type: 'just' } : { type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute origin-center w-full h-full flex items-center justify-center"
        >
          {viewType === 'hierarchical' ? (
            
            /* HIERARCHICAL LAYOUT */
            <div className="relative p-20 flex flex-col items-center gap-16 min-w-[1000px]">
              
              {/* SVG Connector Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300 dark:stroke-slate-700 stroke-2 fill-none">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" className="fill-slate-300 dark:fill-slate-700" />
                  </marker>
                </defs>
                {/* Dynamically draw connectors in absolute coordinate space */}
                {/* For demonstration, we connect nodes using custom CSS offsets */}
              </svg>
              {/* GENERATION 1: GREAT GRANDPARENTS */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Great Grandparents</div>
                <div className="flex items-center gap-6">
                  <MemberCardNode id="robert-johnson" onClick={handleMemberClick} />
                  <div className="h-[2px] w-8 bg-slate-300 dark:bg-slate-700 relative">
                    <Heart size={10} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 bg-white dark:bg-slate-900 rounded-full" />
                  </div>
                  <MemberCardNode id="mary-johnson" onClick={handleMemberClick} />
                </div>
              </div>
              {/* GENERATION 2: GRANDPARENTS */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Grandparents</div>
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-6">
                    <MemberCardNode id="william-johnson" onClick={handleMemberClick} />
                    <div className="h-[2px] w-8 bg-slate-300 dark:bg-slate-700 relative">
                      <Heart size={10} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 bg-white dark:bg-slate-900 rounded-full" />
                    </div>
                    <MemberCardNode id="linda-johnson" onClick={handleMemberClick} />
                  </div>
                  <MemberCardNode id="arthur-johnson" onClick={handleMemberClick} />
                </div>
              </div>
              {/* GENERATION 3: PARENTS */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Parents & Siblings</div>
                <div className="flex items-start gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-6">
                      <MemberCardNode id="david-johnson" onClick={handleMemberClick} />
                      <div className="h-[2px] w-6 bg-slate-300 dark:bg-slate-700 relative">
                        <Heart size={8} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 bg-white dark:bg-slate-900 rounded-full" />
                      </div>
                      <MemberCardNode id="helen-johnson" onClick={handleMemberClick} />
                    </div>
                    
                    {/* Collapsible toggle */}
                    <button 
                      onClick={() => toggleCollapse('david-branch')}
                      className="px-2 py-0.5 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 text-[9px] font-bold mt-1 cursor-pointer"
                    >
                      {collapsedBranches['david-branch'] ? 'Expand Children (+)' : 'Collapse Children (-)'}
                    </button>
                  </div>
                  
                  <MemberCardNode id="james-johnson" onClick={handleMemberClick} />
                  <MemberCardNode id="sarah-johnson" onClick={handleMemberClick} />
                  <MemberCardNode id="michael-johnson" onClick={handleMemberClick} />
                </div>
              </div>
              {/* GENERATION 4: CHILDREN */}
              <AnimatePresence>
                {!collapsedBranches['david-branch'] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">Children</div>
                    <div className="flex items-center gap-8">
                      <MemberCardNode id="emma-johnson" onClick={handleMemberClick} />
                      <MemberCardNode id="liam-johnson" onClick={handleMemberClick} />
                      <MemberCardNode id="olivia-johnson" onClick={handleMemberClick} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            
            /* CIRCULAR NETWORK WEB VIEW (Profile circular preview style) */
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              
              {/* Circular Lines */}
              <div className="absolute w-[360px] h-[360px] border border-orange-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-[240px] h-[240px] border border-slate-200 dark:border-slate-800/80 rounded-full"></div>
              
              {/* Center Node (Selected / Admin) */}
              <div 
                onClick={() => handleMemberClick('david-johnson')}
                className="absolute z-10 w-24 h-24 rounded-full border-4 border-orange-500 bg-white dark:bg-brand-darkSurface p-1.5 shadow-xl cursor-pointer transform hover:scale-105 transition-all text-center flex flex-col items-center justify-center"
              >
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" className="w-12 h-12 rounded-full object-cover" />
                <span className="text-[10px] font-bold text-slate-800 dark:text-white mt-1">David</span>
              </div>
              {/* Ring Nodes */}
              {[
                { id: 'william-johnson', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', deg: 0, label: 'Father' },
                { id: 'linda-johnson', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=100', deg: 51, label: 'Mother' },
                { id: 'helen-johnson', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', deg: 102, label: 'Spouse' },
                { id: 'emma-johnson', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100', deg: 153, label: 'Daughter' },
                { id: 'liam-johnson', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100', deg: 204, label: 'Son' },
                { id: 'olivia-johnson', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', deg: 255, label: 'Daughter' },
                { id: 'james-johnson', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', deg: 306, label: 'Brother' }
              ].map((member, idx) => {
                const radius = 170;
                const rad = (member.deg * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <div
                    key={idx}
                    onClick={() => handleMemberClick(member.id)}
                    style={{ left: `calc(50% + ${x}px - 2rem)`, top: `calc(50% + ${y}px - 2rem)` }}
                    className="absolute w-16 h-16 rounded-full border-2 border-slate-300 dark:border-slate-800 bg-white dark:bg-brand-darkSurface p-1 flex flex-col items-center justify-center cursor-pointer shadow-lg transform hover:scale-110 hover:border-orange-500 transition-all"
                  >
                    <img src={member.img} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-[8px] font-bold text-slate-800 dark:text-white mt-0.5 leading-none">{member.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
      {/* FLOAT CANVAS UTILITY PANEL */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn} 
          className="control-button w-9 h-9 rounded-xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 hover:text-orange-500 shadow-md transition-colors"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={handleZoomOut} 
          className="control-button w-9 h-9 rounded-xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 hover:text-orange-500 shadow-md transition-colors"
        >
          <ZoomOut size={16} />
        </button>
        <button 
          onClick={handleResetZoom} 
          className="control-button w-9 h-9 rounded-xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 hover:text-orange-500 shadow-md transition-colors"
        >
          <Maximize2 size={16} />
        </button>
      </div>
      {/* ADD MEMBER MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-brand-darkSurface w-full max-w-md rounded-2xl p-6 relative z-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Add Family Member</h3>
              <form onSubmit={handleAddMemberSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                    placeholder="Enter name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Family Role</label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:bg-brand-darkSurface"
                    >
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Grandparent">Grandparent</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Aunt">Aunt</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Status</label>
                    <select
                      value={newMemberStatus}
                      onChange={(e) => setNewMemberStatus(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:bg-brand-darkSurface"
                    >
                      <option value="Alive">🟢 Alive</option>
                      <option value="Deceased">⚫ Deceased</option>
                      <option value="Missing">🔴 Missing</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={newMemberBirth}
                      onChange={(e) => setNewMemberBirth(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Connect To Parent</label>
                    <select
                      value={newMemberParent}
                      onChange={(e) => setNewMemberParent(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:bg-brand-darkSurface"
                    >
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
// Inner helper component for Tree Node Cards
function MemberCardNode({ id, onClick }) {
  const { getMemberById } = useFamily();
  const member = getMemberById(id);
  if (!member) return null;
  const statusColor = 
    member.status === 'Alive' ? 'bg-green-500' :
    member.status === 'Deceased' ? 'bg-slate-500' : 'bg-red-500';
  return (
    <div 
      onClick={() => onClick(id)}
      className="member-card w-40 p-3 rounded-2xl bg-white dark:bg-brand-darkSurface border border-slate-200 dark:border-slate-800/80 shadow-md hover:border-orange-500 hover:shadow-lg transition-all duration-200 text-center cursor-pointer shrink-0 relative"
    >
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-800 z-10" className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${statusColor}`} title={member.status} />
      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover mx-auto ring-2 ring-orange-500/10 mb-2" />
      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{member.name.split(' ')[0]}</h4>
      <p className="text-[9px] text-slate-400 font-semibold">{member.role}</p>
      <p className="text-[8px] text-slate-400 mt-0.5">{member.birthDate.split('-')[0]} - {member.deathDate ? member.deathDate.split('-')[0] : 'Present'}</p>
    </div>
  );
}
