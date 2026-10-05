import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hash, Volume2, Send, Plus, Users, Image as ImageIcon, Smile, Paperclip, Mic, PhoneOff } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';
import { COMMUNITY_CHANNELS } from '../data/mockData';

export default function CommunityPage() {
  const { chatMessages, activeChannelId, setActiveChannelId, addChatMessage, members } = useFamily();
  const [inputVal, setInputVal] = useState('');
  const [activeVoiceChannel, setActiveVoiceChannel] = useState(null);
  const currentChannel = COMMUNITY_CHANNELS.text.find((channel) => channel.id === activeChannelId) || COMMUNITY_CHANNELS.text[0];
  const activeMessages = chatMessages[activeChannelId] || [];

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!inputVal.trim()) return;
    addChatMessage(activeChannelId, inputVal.trim());
    setInputVal('');
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Family Community</h1><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">A private space for family conversation and shared interests.</p></div>
        <Link to="/family-feed" className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-600">Browse public family feed</Link>
      </header>
      <div className="flex min-h-[480px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111D29] lg:h-[calc(100vh-14rem)]">
        <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:flex md:w-64">
          <div className="space-y-6">
            <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Channels</span><button type="button" aria-label="Add channel" className="text-slate-400 hover:text-primary"><Plus size={14} /></button></div>
            <div className="space-y-1"><span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-slate-400">Text Channels</span>
              {COMMUNITY_CHANNELS.text.map((channel) => <button type="button" key={channel.id} onClick={() => setActiveChannelId(channel.id)} aria-current={activeChannelId === channel.id ? 'page' : undefined} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${activeChannelId === channel.id ? 'bg-orange-500/10 text-orange-500 dark:bg-orange-500/15' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800/40 dark:hover:text-white'}`}><Hash size={14} className="shrink-0 text-slate-400" /><span className="truncate">{channel.name}</span></button>)}
            </div>
            <div className="space-y-1"><span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-slate-400">Voice Rooms</span>
              {COMMUNITY_CHANNELS.voice.map((channel) => <button type="button" key={channel.id} onClick={() => setActiveVoiceChannel((current) => current === channel.id ? null : channel.id)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${activeVoiceChannel === channel.id ? 'bg-green-500/10 text-green-500' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/40'}`}><span className="flex min-w-0 items-center gap-2"><Volume2 size={14} className="shrink-0" /><span className="truncate">{channel.name}</span></span>{activeVoiceChannel === channel.id && <Mic size={12} className="animate-pulse" />}</button>)}
            </div>
          </div>
          {activeVoiceChannel && <div className="mt-4 flex items-center justify-between rounded-2xl border border-green-500/20 bg-green-500/10 p-3 text-xs"><span className="text-green-500">Connected to {COMMUNITY_CHANNELS.voice.find((channel) => channel.id === activeVoiceChannel)?.name}</span><button type="button" onClick={() => setActiveVoiceChannel(null)} aria-label="Leave voice room" className="rounded-lg p-1.5 text-red-500 hover:bg-red-500/10"><PhoneOff size={14} /></button></div>}
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div className="flex min-w-0 items-center gap-2"><Hash size={16} className="shrink-0 text-slate-400" /><div className="min-w-0"><h2 className="truncate text-xs font-bold text-slate-900 dark:text-white">{currentChannel.name}</h2><p className="truncate text-[9px] text-slate-400">{currentChannel.description}</p></div></div>
            <label className="sr-only" htmlFor="community-channel-select">Choose a channel</label>
            <select id="community-channel-select" value={activeChannelId} onChange={(event) => setActiveChannelId(event.target.value)} className="max-w-40 rounded-lg border border-slate-200 bg-white px-2 py-2 text-[10px] sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white">{COMMUNITY_CHANNELS.text.map((channel) => <option key={channel.id} value={channel.id}>#{channel.name}</option>)}</select>
            <span className="hidden items-center gap-1 text-[10px] text-slate-400 sm:flex"><Users size={13} /> {members.length}</span>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {activeMessages.length ? activeMessages.map((message) => (
              <article key={message.id} className="flex gap-3 text-xs"><img src={message.avatar} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" /><div className="min-w-0 space-y-1"><div className="flex flex-wrap items-center gap-2"><span className="font-bold text-slate-900 dark:text-white">{message.senderName}</span><time className="text-[8px] text-slate-400">{message.timestamp}</time></div><p className="whitespace-pre-wrap break-words leading-relaxed text-slate-600 dark:text-slate-300">{message.content}</p>{message.image && <img src={message.image} alt="Shared attachment" className="mt-2 max-h-60 max-w-full rounded-xl object-cover" />}</div></article>
            )) : <div className="flex h-full min-h-48 flex-col items-center justify-center text-center"><Hash size={24} className="text-slate-300" /><p className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-300">Start this conversation</p><p className="mt-1 text-[10px] text-slate-400">Share a thought with your relatives.</p></div>}
          </div>

          <form onSubmit={handleSendMessage} className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800 sm:p-4"><div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-800 dark:bg-slate-900"><button type="button" aria-label="Attach a file" className="shrink-0 text-slate-400 hover:text-primary"><Paperclip size={16} /></button><label className="sr-only" htmlFor="community-message">Message to {currentChannel.name}</label><input id="community-message" type="text" value={inputVal} onChange={(event) => setInputVal(event.target.value)} placeholder={`Message #${currentChannel.name}`} className="min-w-0 flex-1 bg-transparent py-2 text-xs text-slate-950 outline-none dark:text-white" /><button type="button" aria-label="Add photo" className="hidden shrink-0 text-slate-400 hover:text-primary sm:block"><ImageIcon size={16} /></button><button type="button" aria-label="Emoji picker" className="hidden shrink-0 text-slate-400 hover:text-primary sm:block"><Smile size={16} /></button><button type="submit" disabled={!inputVal.trim()} aria-label="Send message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition hover:bg-primary-600 disabled:opacity-40"><Send size={13} /></button></div></form>
        </section>

        <aside className="hidden w-48 shrink-0 flex-col gap-4 border-l border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 lg:flex"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Family members · {members.length}</span><div className="flex-1 space-y-3 overflow-y-auto">{members.map((member) => <div key={member.id} className="flex min-w-0 items-center gap-2 text-xs"><img src={member.avatar} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" /><span className="truncate font-semibold text-slate-700 dark:text-slate-300">{member.name.split(' ')[0]}</span></div>)}</div></aside>
      </div>
    </div>
  );
}
