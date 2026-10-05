import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Volume2, Send, Image as ImageIcon, MoreVertical, Mic, Settings, Video, Phone, PhoneOff, X, Loader2, Square, Users, Paperclip } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';
import { isFamilyAdmin } from '../data/mockData';
import Card from '../Components/ui/Card';

const channels = [
  { id: 'general', label: 'family-chat' },
  { id: 'announcements', label: 'announcements' },
  { id: 'family-history', label: 'history-vault' },
  { id: 'photos', label: 'media-memories' },
  { id: 'memorials', label: 'hall-of-echoes' }
];

const voiceChannels = [
  { id: 'family-lounge', label: 'Family Lounge' },
  { id: 'roots-wisdom', label: 'Roots & Wisdom' }
];

const ChannelItem = ({ label, active, onClick, isVoice = false }) => (
  <button type="button" onClick={onClick} aria-current={active ? 'page' : undefined} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group relative text-left ${active ? 'bg-primary text-white shadow-xl shadow-primary/25' : 'text-slate-500 dark:text-dark-muted hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary'}`}>
    <span className={`p-1.5 rounded-lg ${active ? 'bg-white/20' : 'bg-slate-100 dark:bg-dark-surface group-hover:bg-primary/10'}`}>
      {isVoice ? <Volume2 size={16} /> : <Hash size={16} />}
    </span>
    <span className="min-w-0 flex-1 truncate text-[11px] font-black uppercase tracking-[0.1em]">{label}</span>
  </button>
);

function ChatMessage({ message }) {
  const isVoiceNote = message.kind === 'voice-note';
  const isOfficialAnnouncement = message.kind === 'announcement';
  const isMe = message.senderName === 'David Johnson';
  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 p-3 sm:gap-4 sm:p-4 ${isMe ? 'flex-row-reverse' : ''}`}>
      <img src={message.avatar} alt="" className="h-10 w-10 shrink-0 rounded-xl object-cover" />
      <div className={`min-w-0 max-w-[85%] space-y-1.5 ${isMe ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs font-bold text-slate-900 dark:text-white">{message.senderName}</span>
          {isOfficialAnnouncement && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary">Official</span>}
          <time className="text-[10px] text-slate-400">{message.timestamp}</time>
        </div>
        {isVoiceNote ? (
          <div className={`rounded-2xl p-3 ${isMe ? 'bg-primary/10' : 'bg-slate-50 dark:bg-slate-900'}`}>
            {message.audioUrl ? <audio controls preload="metadata" src={message.audioUrl} aria-label={`Voice note from ${message.senderName}`} className="max-w-full" /> : <p className="text-xs text-slate-500">Voice note unavailable after reload in this browser session.</p>}
            {message.durationSeconds > 0 && <p className="mt-1 text-[9px] text-slate-400">Voice note · {Math.round(message.durationSeconds)} sec</p>}
          </div>
        ) : (
          <p className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200 rounded-tl-sm'}`}>{message.content}</p>
        )}
        {message.image && <img src={message.image} alt="Shared in chat" className="mt-2 max-h-56 max-w-full rounded-xl object-cover" />}
        {message.reactions?.length > 0 && <div className={`flex gap-2 ${isMe ? 'justify-end' : ''}`}>{message.reactions.map((reaction, index) => <span key={`${reaction.emoji}-${index}`} className="rounded-full border border-slate-200 px-2 py-1 text-[10px] dark:border-slate-700">{reaction.emoji} {reaction.count}</span>)}</div>}
      </div>
    </motion.article>
  );
}

function CallDemo({ mode, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState('connecting');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let mounted = true;
    let interval;
    const startPreview = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('This browser does not support local camera or microphone access.');
        setStatus('error');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: mode === 'video' });
        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current && mode === 'video') videoRef.current.srcObject = stream;
        setStatus('active');
        interval = window.setInterval(() => setSeconds((current) => current + 1), 1000);
      } catch {
        if (mounted) {
          setError('Camera or microphone access was denied. Allow access in your browser to start the local call preview.');
          setStatus('error');
        }
      }
    };
    startPreview();
    return () => {
      mounted = false;
      window.clearInterval(interval);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [mode]);

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="call-title">
      <section className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 text-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div><h2 id="call-title" className="text-base font-bold">{mode === 'video' ? 'Video call' : 'Voice call'} demo</h2><p className="mt-1 text-[10px] text-slate-400">Browser-local preview · no remote participant connected</p></div>
          <button type="button" onClick={onClose} aria-label="End call and close" className="rounded-xl p-2 text-slate-300 hover:bg-white/10"><X size={18} /></button>
        </header>
        <div className="space-y-5 p-5">
          {mode === 'video' && <div className="aspect-video overflow-hidden rounded-2xl bg-slate-800">{status === 'active' ? <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-slate-400">Camera preview</div>}</div>}
          {status === 'connecting' && <p className="flex items-center gap-2 text-sm text-slate-300"><Loader2 size={16} className="animate-spin" /> Requesting device access…</p>}
          {status === 'active' && <p className="text-sm text-slate-300">Local {mode} preview active <span className="ml-2 font-mono text-primary">{formattedTime}</span></p>}
          {status === 'error' && <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-xs leading-relaxed text-red-200">{error}</p>}
          <p className="text-[11px] leading-relaxed text-slate-400">This demo only previews your own camera/microphone. Remote calls require a call-signaling service.</p>
          <button type="button" onClick={onClose} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-red-600"><PhoneOff size={15} /> End call</button>
        </div>
      </section>
    </div>
  );
}

export default function FamilyHubPage() {
  const { members, chatMessages, addChatMessage } = useFamily();
  const [searchParams] = useSearchParams();
  const canPostOfficialAnnouncements = isFamilyAdmin();
  const [activeChannel, setActiveChannel] = useState(() => channels.some((channel) => channel.id === searchParams.get('channel')) ? searchParams.get('channel') : 'general');
  const [draft, setDraft] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceChannel, setVoiceChannel] = useState('');
  const [callMode, setCallMode] = useState(null);
  const scrollRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const recordingStartedAt = useRef(0);
  const activeChannelData = channels.find((channel) => channel.id === activeChannel) || channels[0];
  const messages = chatMessages[activeChannel] || [];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length, activeChannel]);

  useEffect(() => {
    if (!recording) return undefined;
    const interval = window.setInterval(() => setRecordingTime(Math.floor((Date.now() - recordingStartedAt.current) / 1000)), 250);
    return () => window.clearInterval(interval);
  }, [recording]);

  useEffect(() => () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
    audioStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    addChatMessage(activeChannel, draft.trim());
    setDraft('');
  };

  const startRecording = async () => {
    setRecordingError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordingError('Voice recording is not supported in this browser. Try a current version of Chrome, Edge, or Firefox.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      audioStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      recordingStartedAt.current = Date.now();
      setRecordingTime(0);
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onerror = () => setRecordingError('The voice note could not be recorded. Please try again.');
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        if (blob.size) {
          const audioUrl = URL.createObjectURL(blob);
          addChatMessage(activeChannel, { kind: 'voice-note', audioUrl, durationSeconds: Math.max(1, (Date.now() - recordingStartedAt.current) / 1000) });
        }
        stream.getTracks().forEach((track) => track.stop());
        if (audioStreamRef.current === stream) audioStreamRef.current = null;
        setRecording(false);
      };
      recorder.start();
      setRecording(true);
    } catch {
      setRecordingError('Microphone access was denied. Allow microphone access to record a voice note.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
  };

  const startCall = (mode) => setCallMode(mode);

  return (
    <div className="relative flex min-h-[calc(100vh-10rem)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111D29] lg:h-[calc(100vh-10rem)] lg:flex-row">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:flex">
        <div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Text channels</span><button type="button" aria-label="Channel settings" className="rounded-lg p-2 text-slate-400 hover:text-primary"><Settings size={15} /></button></div>
        <nav className="space-y-1" aria-label="Chat channels">
          {channels.map((channel) => <ChannelItem key={channel.id} label={channel.label} active={activeChannel === channel.id} onClick={() => setActiveChannel(channel.id)} />)}
        </nav>
        <div className="mb-3 mt-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Voice rooms</div>
        <div className="space-y-1">{voiceChannels.map((channel) => <ChannelItem key={channel.id} isVoice label={channel.label} active={voiceChannel === channel.id} onClick={() => setVoiceChannel((current) => current === channel.id ? '' : channel.id)} />)}</div>
        {voiceChannel && <div className="mt-auto flex items-center justify-between rounded-2xl border border-green-500/20 bg-green-500/10 p-3 text-xs"><span><strong className="block text-green-500">Room joined</strong><span className="text-slate-500">{voiceChannels.find((room) => room.id === voiceChannel)?.label}</span></span><button type="button" onClick={() => setVoiceChannel('')} aria-label="Leave voice room" className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"><PhoneOff size={15} /></button></div>}
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Hash size={18} /></span>
            <div className="min-w-0"><h1 className="truncate text-sm font-black text-slate-900 dark:text-white">#{activeChannelData.label}</h1><p className="text-[10px] text-slate-400">{members.length} family members · messages stay in this archive</p></div>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => startCall('voice')} aria-label="Start voice call demo" className="rounded-xl p-2.5 text-slate-500 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-500/10"><Phone size={17} /></button>
            <button type="button" onClick={() => startCall('video')} aria-label="Start video call demo" className="rounded-xl p-2.5 text-slate-500 hover:bg-primary/10 hover:text-primary"><Video size={18} /></button>
            <button type="button" aria-label="More chat actions" className="rounded-xl p-2.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><MoreVertical size={18} /></button>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto border-b border-slate-100 px-3 py-2 dark:border-slate-800 sm:hidden">
          {channels.map((channel) => <button type="button" key={channel.id} onClick={() => setActiveChannel(channel.id)} className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-bold ${activeChannel === channel.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'}`}>#{channel.label}</button>)}
        </div>

        <div ref={scrollRef} className="min-h-[280px] flex-1 overflow-y-auto p-2 sm:p-4" aria-live="polite">
          {messages.length ? messages.map((message) => <ChatMessage key={message.id} message={message} />) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Hash size={24} /></div>
              <h2 className="mt-4 text-sm font-bold text-slate-800 dark:text-white">Start the conversation</h2>
              <p className="mt-1 text-xs text-slate-500">This channel is ready for family memories and questions.</p>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800 sm:p-4">
          {activeChannel === 'announcements' && !canPostOfficialAnnouncements ? <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:bg-slate-900">Official announcements can only be published by a family administrator.</p> : <>
          {recordingError && <p role="alert" className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-300">{recordingError}</p>}
          {recording && <div className="mb-3 flex items-center justify-between rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-300"><span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Recording voice note · {recordingTime}s</span><button type="button" onClick={stopRecording} className="inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 font-bold text-white"><Square size={12} fill="currentColor" /> Stop and send</button></div>}
          <form onSubmit={handleSendMessage} className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
            <button type="button" aria-label="Add attachment" className="shrink-0 rounded-xl p-2.5 text-slate-400 hover:text-primary"><Paperclip size={17} /></button>
            <label className="sr-only" htmlFor="chat-message">Message to {activeChannelData.label}</label>
            <textarea id="chat-message" rows={1} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSendMessage(event); } }} placeholder={`Message #${activeChannelData.label} · Enter to send, Shift+Enter for a new line`} className="max-h-32 min-h-[42px] min-w-0 flex-1 resize-y bg-transparent px-2 py-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 dark:text-white" />
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" disabled={recording} onClick={startRecording} aria-label="Record voice note" title="Record voice note" className="rounded-xl p-2.5 text-slate-500 transition hover:bg-primary/10 hover:text-primary disabled:opacity-40"><Mic size={17} /></button>
              <button type="submit" disabled={!draft.trim() || recording} aria-label="Send message" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40"><Send size={15} /></button>
            </div>
          </form>
          <p className="mt-2 px-1 text-[9px] text-slate-400">Voice notes are recorded only after you allow microphone access. They’re available for this browser session.</p>
          </>}
        </div>
      </section>

      <aside className="hidden w-48 shrink-0 flex-col gap-4 border-l border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 lg:flex">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Family members · {members.length}</span>
        <div className="flex-1 space-y-3 overflow-y-auto">{members.map((member) => <div key={member.id} className="flex min-w-0 items-center gap-2 text-xs"><span className="relative shrink-0"><img src={member.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /><span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-slate-50 dark:ring-slate-900 ${member.status === 'Alive' ? 'bg-green-500' : 'bg-slate-400'}`} /></span><span className="truncate font-semibold text-slate-700 dark:text-slate-300">{member.name}</span></div>)}</div>
        <Card className="rounded-2xl border-slate-100 p-4 dark:border-slate-800">
          <div className="mb-2 flex items-center gap-2 text-primary"><Users size={15} /><span className="text-[10px] font-black uppercase tracking-wider">Family room</span></div>
          <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">Browse memories shared across families in the public feed.</p>
          <Link to="/family-feed" className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-primary">Open feed <ImageIcon size={12} /></Link>
        </Card>
      </aside>

      <AnimatePresence>{callMode && <CallDemo mode={callMode} onClose={() => setCallMode(null)} />}</AnimatePresence>
    </div>
  );
}
