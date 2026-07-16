import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Volume2, Send, Plus, Users, Image as ImageIcon, Smile, Paperclip, Mic, PhoneOff } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';
import { COMMUNITY_CHANNELS } from '../data/mockData';
export default function CommunityPage() {
  const { 
    chatMessages, 
    activeChannelId, 
    setActiveChannelId, 
    addChatMessage, 
    members 
  } = useFamily();
  const [inputVal, setInputVal] = useState('');
  const [activeVoiceChannel, setActiveVoiceChannel] = useState(null);
  
  // Find current channel metadata
  const currentChannel = 
    COMMUNITY_CHANNELS.text.find(c => c.id === activeChannelId) || 
    COMMUNITY_CHANNELS.text[0];
  const activeMessages = chatMessages[activeChannelId] || [];
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    addChatMessage(activeChannelId, inputVal.trim());
    setInputVal('');
  };
  const handleJoinVoice = (channelName) => {
    if (activeVoiceChannel === channelName) {
      setActiveVoiceChannel(null); // Disconnect
    } else {
      setActiveVoiceChannel(channelName);
    }
  };
  return (
    <div className="h-[calc(100vh-10rem)] flex rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkSurface shadow-sm overflow-hidden min-w-0">
      
      {/* 1. CHANNELS SIDEBAR */}
      <aside className="w-56 md:w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 flex flex-col justify-between hidden sm:flex">
        <div className="space-y-6">
          
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Channels</span>
            <button className="text-slate-400 hover:text-orange-500"><Plus size={14} /></button>
          </div>
          {/* Text Channels List */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Text Channels</span>
            {COMMUNITY_CHANNELS.text.map(ch => {
              const isActive = ch.id === activeChannelId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannelId(ch.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive 
                      ? 'bg-orange-500/10 dark:bg-orange-500/15 text-orange-500' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-800'
                  }`}
                >
                  <Hash size={14} className="shrink-0 text-slate-400" />
                  <span className="truncate">{ch.name}</span>
                </button>
              );
            })}
          </div>
          {/* Voice Channels List */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-1">Voice Channels</span>
            {COMMUNITY_CHANNELS.voice.map(ch => {
              const isJoined = activeVoiceChannel === ch.name;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleJoinVoice(ch.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isJoined 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Volume2 size={14} className="shrink-0 text-slate-400" />
                    <span className="truncate">{ch.name}</span>
                  </div>
                  {isJoined && <Mic size={12} className="text-green-500 animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>
        {/* VOICE STATUS PANEL */}
        {activeVoiceChannel && (
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-xs flex items-center justify-between mt-4">
            <div>
              <p className="font-bold text-green-500">Connected</p>
              <p className="text-[10px] text-slate-400 font-semibold">{activeVoiceChannel}</p>
            </div>
            <button 
              onClick={() => setActiveVoiceChannel(null)}
              className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
              title="Disconnect Voice"
            >
              <PhoneOff size={14} />
            </button>
          </div>
        )}
      </aside>
      {/* 2. CHAT AREA */}
      <section className="flex-1 flex flex-col min-w-0 bg-white dark:bg-brand-darkSurface">
        
        {/* Chat Header */}
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Hash size={16} className="text-slate-400" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-none">{currentChannel?.name}</h3>
              <p className="text-[9px] text-slate-400 font-medium mt-0.5">{currentChannel?.description}</p>
            </div>
          </div>
          <button className="sm:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <Users size={18} />
          </button>
        </header>
        {/* Message Logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMessages.map(msg => (
            <div key={msg.id} className="flex gap-3 text-xs">
              <img src={msg.avatar} alt={msg.senderName} className="w-8 h-8 rounded-full object-cover shrink-0" />
              <div className="space-y-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{msg.senderName}</span>
                  <span className="text-[8px] text-slate-400 font-medium">{msg.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed break-words">{msg.content}</p>
                {msg.image && (
                  <img src={msg.image} alt="Uploaded attachment" className="rounded-xl max-w-xs mt-2 border border-slate-100 dark:border-slate-800 object-cover" />
                )}
                {/* Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex gap-1.5 pt-1">
                    {msg.reactions.map((react, rIdx) => (
                      <button key={rIdx} className="px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-[10px] hover:border-orange-500/30 font-semibold text-slate-600 dark:text-slate-400">
                        {react.emoji} {react.count}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Chat Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
            <button type="button" className="text-slate-400 hover:text-orange-500 shrink-0"><Paperclip size={16} /></button>
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`Message #${currentChannel?.name}`} 
              className="flex-1 bg-transparent border-none outline-none text-xs text-slate-950 dark:text-white"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" className="text-slate-400 hover:text-orange-500"><ImageIcon size={16} /></button>
              <button type="button" className="text-slate-400 hover:text-orange-500"><Smile size={16} /></button>
              <button type="submit" className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm"><Send size={12} /></button>
            </div>
          </div>
        </form>
      </section>
      {/* 3. MEMBERS SIDEBAR */}
      <aside className="w-48 shrink-0 border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 space-y-4 hidden lg:flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Members — {members.length}</span>
        
        <div className="space-y-3 flex-1 overflow-y-auto">
          {/* Online section */}
          <div className="space-y-2">
            <span className="text-[8px] font-bold uppercase text-slate-400 tracking-widest block">Online</span>
            {members.filter(m => m.status === 'Alive').map(m => (
              <div key={m.id} className="flex items-center gap-2 text-xs">
                <div className="relative shrink-0">
                  <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 ring-2 ring-slate-50 dark:ring-slate-900" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          {/* Offline section */}
          <div className="space-y-2 pt-2">
            <span className="text-[8px] font-bold uppercase text-slate-400 tracking-widest block">Offline</span>
            {members.filter(m => m.status !== 'Alive').map(m => (
              <div key={m.id} className="flex items-center gap-2 text-xs opacity-60">
                <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}


