import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hash, 
  Volume2, 
  Send, 
  Smile, 
  Plus, 
  Image as ImageIcon, 
  File, 
  Search,
  MoreVertical,
  ThumbsUp,
  Heart,
  ChevronRight,
  Mic,
  Settings
} from 'lucide-react';
import Card from '../Components/ui/Card';
import Button from '../Components/ui/Button';

const ChannelItem = ({ label, active, onClick, isVoice }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group relative
      ${active 
        ? 'bg-primary text-white shadow-xl shadow-primary/25' 
        : 'text-slate-500 dark:text-dark-muted hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary'}
    `}
  >
    <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-white/20' : 'bg-slate-100 dark:bg-dark-surface group-hover:bg-primary/10'}`}>
      {isVoice ? <Volume2 size={16} /> : <Hash size={16} />}
    </div>
    <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
      {label}
    </span>
    {active && (
      <motion.div 
        layoutId="active-channel"
        className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
      />
    )}
  </button>
);

const ChatMessage = ({ user, time, message, avatar, images, reactions, isMe }) => (
  <motion.div 
    initial={{ opacity: 0, x: isMe ? 20 : -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`flex gap-5 group hover:bg-slate-50/50 dark:hover:bg-white/5 p-5 rounded-[2rem] transition-all ${isMe ? 'flex-row-reverse' : ''}`}
  >
    <div className="w-14 h-14 rounded-[1.5rem] overflow-hidden shrink-0 shadow-2xl border-4 border-white dark:border-dark-surface group-hover:scale-110 transition-transform duration-500">
      <img src={avatar} alt={user} className="w-full h-full object-cover" />
    </div>
    <div className={`flex-1 space-y-3 ${isMe ? 'text-right' : ''}`}>
      <div className={`flex items-center gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
        <span className="text-base font-heading font-black dark:text-white tracking-tight">{user}</span>
        <span className="text-[10px] font-black text-slate-300 dark:text-dark-muted uppercase tracking-widest">{time}</span>
      </div>
      <div className={`
        inline-block text-sm leading-relaxed font-medium p-5 rounded-[2rem] max-w-2xl
        ${isMe 
          ? 'bg-primary text-white rounded-tr-none shadow-xl shadow-primary/10' 
          : 'bg-white dark:bg-dark-surface text-slate-600 dark:text-dark-muted border border-slate-100 dark:border-dark-border rounded-tl-none shadow-sm'}
      `}>
        {message}
      </div>
      {images && (
        <div className={`grid grid-cols-2 gap-4 pt-3 ${isMe ? 'justify-end' : ''}`}>
          {images.map((img, i) => (
            <div key={i} className="aspect-video w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-dark-surface cursor-pointer hover:ring-8 ring-primary/5 transition-all group/img">
              <img src={img} alt="Shared" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      )}
      {reactions && (
        <div className={`flex gap-2 pt-2 ${isMe ? 'justify-end' : ''}`}>
          {reactions.map((r, i) => (
             <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-dark-bg border border-slate-100 dark:border-dark-border rounded-2xl text-[10px] font-black cursor-pointer hover:border-primary transition-all shadow-sm">
                {r.emoji === 'heart' ? <Heart size={12} className="text-red-500 fill-red-500" /> : <ThumbsUp size={12} className="text-blue-500 fill-blue-500" />}
                <span className="opacity-60">{r.count}</span>
             </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const FamilyHubPage = () => {
  const [activeChannel, setActiveChannel] = useState('family-chat');

  const channels = [
    { id: 'family-chat', label: 'family-chat' },
    { id: 'announcements', label: 'announcements' },
    { id: 'family-history', label: 'history-vault' },
    { id: 'photos', label: 'media-memories' },
    { id: 'memorials', label: 'hall-of-echoes' },
  ];

  const voiceChannels = [
    { id: 'lounge', label: 'Family Lounge' },
    { id: 'roots', label: 'Roots & Wisdom' },
  ];

  return (
    <div className="h-full flex gap-10 relative">
      {/* Hub Sidebar */}
      <Card className="w-80 h-full p-8 flex flex-col gap-10 bg-slate-50/50 dark:bg-dark-surface/10 border-slate-100 dark:border-dark-border rounded-[3rem] shadow-2xl shadow-black/5">
        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Text Channels</h3>
            <button className="text-slate-300 hover:text-primary transition-colors"><Plus size={16} /></button>
          </div>
          <div className="space-y-2">
            {channels.map((ch) => (
              <ChannelItem 
                key={ch.id} 
                label={ch.label} 
                active={activeChannel === ch.id}
                onClick={() => setActiveChannel(ch.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Voice Channels</h3>
            <button className="text-slate-300 hover:text-primary transition-colors"><Settings size={16} /></button>
          </div>
          <div className="space-y-2">
            {voiceChannels.map((ch) => (
              <ChannelItem key={ch.id} label={ch.label} isVoice />
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 bg-primary/5 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
           <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-4">Live Lounge</p>
           <div className="flex -space-x-4 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-2xl border-4 border-white dark:border-dark-surface overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/100?u=user${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-2xl border-4 border-white dark:border-dark-surface bg-slate-100 dark:bg-dark-bg flex items-center justify-center text-[10px] font-bold text-slate-400">
                +12
              </div>
           </div>
           <Button variant="primary" className="w-full h-12 text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
              <Mic size={16} className="mr-2" /> Join Voice
           </Button>
        </div>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col gap-8">
        <header className="flex items-center justify-between glass-panel px-10 py-6 rounded-[3rem] border-slate-100 dark:border-dark-border shadow-2xl shadow-black/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
              <Hash size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black dark:text-white tracking-tight uppercase">#{activeChannel}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">34 family members online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-dark-surface px-5 py-3 rounded-2xl border border-slate-100 dark:border-dark-border group focus-within:border-primary/50 transition-all">
                <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="Search ancestors..." className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-44 outline-none font-medium" />
             </div>
             <button className="p-3.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-[1.2rem] transition-all text-slate-400 hover:text-primary border border-transparent hover:border-primary/20"><MoreVertical size={22}/></button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar px-2">
          <div className="text-center py-10 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-dark-border"></div></div>
            <span className="relative bg-white dark:bg-dark-bg px-6 py-2 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">June 15, 2026</span>
          </div>

          <ChatMessage 
            user="Sarah Johnson" 
            time="10:30 AM" 
            message="Hey everyone! Found some incredible vintage portraits from Robert's archives. It's fascinating to see where our journey began."
            avatar="https://i.pravatar.cc/150?u=sarah"
            images={[
              'https://images.pexels.com/photos/11381917/pexels-photo-11381917.jpeg',
              'https://images.pexels.com/photos/10948631/pexels-photo-10948631.jpeg'
            ]}
            reactions={[{ emoji: 'heart', count: 18 }, { emoji: 'thumbsup', count: 4 }]}
          />
          <ChatMessage 
            user="Michael Johnson" 
            time="11:02 AM" 
            message="These are absolute treasures, Sarah. Look at the resemblance with little Emma! Our heritage is so strong."
            avatar="https://i.pravatar.cc/150?u=michael"
            reactions={[{ emoji: 'heart', count: 9 }]}
          />
          <ChatMessage 
            user="David Johnson" 
            time="11:30 AM" 
            message="I'm working on the anniversary timeline tonight. If anyone has more photos like these, please upload them to #media-memories!"
            avatar="https://i.pravatar.cc/150?u=david"
            isMe
          />
          <ChatMessage 
            user="Emma Johnson" 
            time="11:35 AM" 
            message="I have some! I'll scan them after work. Can't wait for the family reunion! ❤️"
            avatar="https://i.pravatar.cc/150?u=emma"
          />
        </div>

        {/* Message Input */}
        <div className="relative pt-4">
          <div className="glass-panel p-5 rounded-[3rem] border-slate-100 dark:border-dark-border flex items-center gap-5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-primary/10">
            <div className="flex items-center gap-2">
              <button className="p-4 bg-slate-100 dark:bg-dark-surface hover:bg-primary hover:text-white rounded-[1.5rem] transition-all shadow-sm"><Plus size={22}/></button>
              <div className="w-px h-8 bg-slate-100 dark:bg-dark-border mx-2" />
              <button className="p-3 text-slate-400 hover:text-primary transition-colors"><ImageIcon size={22}/></button>
              <button className="p-3 text-slate-400 hover:text-primary transition-colors"><File size={22}/></button>
            </div>
            <input 
              type="text" 
              placeholder={`Message #${activeChannel}`} 
              className="flex-1 bg-transparent border-none focus:ring-0 text-base dark:text-white outline-none font-bold placeholder:text-slate-300 dark:placeholder:text-dark-muted tracking-tight"
            />
            <div className="flex items-center gap-3">
              <button className="p-3 text-slate-400 hover:text-primary transition-colors"><Smile size={24}/></button>
              <Button variant="primary" className="h-14 w-14 p-0 rounded-2xl shadow-xl shadow-primary/30 group">
                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
          <p className="absolute -bottom-8 left-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            Sarah Johnson is typing...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyHubPage;
