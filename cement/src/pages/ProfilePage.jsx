import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useFamily } from '../context/FamilyContext';
import { Briefcase, Heart, Calendar, Users, MapPin, ArrowLeft, Plus, Clock, Edit3, Share2, Image as ImageIcon, Video, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeMember, getMemberById, members } = useFamily();
  const [activeTab, setActiveTab] = useState('Life Story');
  const [copied, setCopied] = useState(false);
  const selectedMember = id ? getMemberById(id) : activeMember;

  if (!selectedMember) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-premium dark:border-slate-800 dark:bg-[#111D29]">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profile not found</h1>
        <p className="mt-2 text-sm text-slate-500">This member is not in the family archive yet.</p>
        <Link to="/profiles" className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white">Browse family members</Link>
      </div>
    );
  }

  const spouse = selectedMember.spouseId ? getMemberById(selectedMember.spouseId) : null;
  const childrenCount = selectedMember.childrenIds?.length || members.filter((member) => member.parentId === selectedMember.id).length;
  const member = {
    name: selectedMember.name,
    role: selectedMember.role,
    birthDate: selectedMember.birthDate?.slice(0, 4) || 'Unknown',
    deathDate: selectedMember.deathDate?.slice(0, 4) || null,
    status: selectedMember.status,
    location: selectedMember.birthPlace || 'Location not listed',
    occupation: selectedMember.occupation || 'Not listed',
    spouse: spouse?.name || 'Not listed',
    marriedYear: selectedMember.marriageYear || 'Not listed',
    childrenCount,
    avatar: selectedMember.avatar,
    cover: selectedMember.coverImage || selectedMember.avatar,
    bio: selectedMember.bio || selectedMember.shortBio || 'The family is still gathering this member’s story.',
    achievements: selectedMember.achievements || [],
    lessons: selectedMember.lifeLessons || [],
    timeline: [
      { year: selectedMember.birthDate?.slice(0, 4) || '—', title: 'Born', description: `Born in ${selectedMember.birthPlace || 'a place remembered by family'}.`, image: selectedMember.coverImage || selectedMember.avatar },
      ...(selectedMember.marriageYear ? [{ year: String(selectedMember.marriageYear), title: spouse ? `Married ${spouse.name}` : 'Marriage', description: 'A family milestone preserved in the archive.', image: selectedMember.coverImage || selectedMember.avatar }] : []),
      ...(selectedMember.achievements || []).slice(0, 3).map((achievement, index) => ({ year: '', title: achievement, description: 'A family achievement remembered across generations.', image: selectedMember.avatar, id: `achievement-${index}` }))
    ]
  };

  const tabs = ['About', 'Life Story', 'Timeline', 'Photos', 'Videos', 'Documents'];

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${member.name} · Family Legacy`, url });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      setCopied(false);
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'About') {
      return (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-900/50"><h3 className="text-xl font-bold text-slate-900 dark:text-white">About {member.name}</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">{member.bio}</p></div>
          <div className="space-y-4 rounded-3xl border border-slate-100 p-6 dark:border-slate-800"><h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Family milestones</h3>{member.achievements.length ? <ul className="space-y-3">{member.achievements.map((achievement) => <li key={achievement} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{achievement}</li>)}</ul> : <p className="text-sm text-slate-500">No milestones have been added yet.</p>}{member.lessons.length > 0 && <div className="border-t border-slate-100 pt-4 dark:border-slate-800"><h4 className="mb-2 text-xs font-bold text-slate-500">Words to remember</h4>{member.lessons.map((lesson) => <p key={lesson} className="mb-2 text-sm italic text-slate-600 dark:text-slate-300">“{lesson}”</p>)}</div>}</div>
        </section>
      );
    }

    if (activeTab === 'Photos' || activeTab === 'Videos' || activeTab === 'Documents') {
      const destinations = { Photos: '/gallery', Videos: '/gallery', Documents: '/documents' };
      const Icon = activeTab === 'Photos' ? ImageIcon : activeTab === 'Videos' ? Video : FileText;
      return (
        <section className="flex flex-col items-center rounded-3xl border-2 border-dashed border-slate-200 px-6 py-16 text-center dark:border-slate-800">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={26} /></span>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{activeTab} for {member.name}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">Media and records for this member are organized in the family archive. Open the collection to browse or add items.</p>
          <button type="button" onClick={() => navigate(destinations[activeTab])} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white">Open {activeTab} archive <ArrowLeft size={14} className="rotate-180" /></button>
        </section>
      );
    }

    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{activeTab === 'Life Story' ? 'Life Story' : 'Life Timeline'}</h3><p className="mt-1 text-sm text-slate-500">Milestones currently recorded for {member.name}.</p></div><button type="button" onClick={() => navigate('/timeline')} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition hover:scale-105"><Plus size={16} /> Add Event</button></div>
        <div className="relative space-y-10 pl-10 before:absolute before:bottom-1 before:left-4 before:top-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {member.timeline.map((event, index) => (
            <article key={event.id || `${event.year}-${event.title}-${index}`} className="relative grid gap-4 sm:grid-cols-[90px_1fr] sm:gap-6">
              <span className="absolute -left-[33px] top-1.5 flex h-8 w-8 items-center justify-center rounded-xl border-4 border-white bg-primary text-white shadow dark:border-[#111D29]"><span className="h-2 w-2 rounded-full bg-white" /></span>
              <span className="text-2xl font-black tracking-tight text-primary/60">{event.year || '—'}</span>
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start"><div className="min-w-0 flex-1"><h4 className="text-lg font-bold text-slate-900 dark:text-white">{event.title}</h4><p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{event.description}</p></div><img src={event.image} alt="" className="h-24 w-full rounded-2xl object-cover sm:w-36" /></div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-premium dark:border-slate-800 dark:bg-[#111D29]">
      <div className="group relative h-56 overflow-hidden sm:h-72"><img src={member.cover} alt="Family landscape" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" /><button type="button" aria-label="Go back" onClick={() => navigate(-1)} className="absolute left-5 top-5 rounded-xl bg-white/20 p-2.5 text-white backdrop-blur-md hover:bg-white/40"><ArrowLeft size={20} /></button><div className="absolute right-5 top-5 flex gap-2"><button type="button" onClick={() => navigate('/settings')} aria-label="Edit profile in settings" className="rounded-xl bg-white/20 p-2.5 text-white backdrop-blur-md hover:bg-white/40"><Edit3 size={18} /></button><button type="button" onClick={handleShare} aria-label="Share profile" title={copied ? 'Link copied' : 'Share profile'} className="rounded-xl bg-white/20 p-2.5 text-white backdrop-blur-md hover:bg-white/40">{copied ? <Check size={18} /> : <Share2 size={18} />}</button></div></div>

      <div className="relative px-5 pb-10 sm:px-10 sm:pb-12">
        <div className="relative z-10 -mt-16 flex flex-col items-center gap-6 sm:-mt-20 sm:flex-row sm:items-end">
          <div className="relative shrink-0"><img src={member.avatar} alt={member.name} className="h-32 w-32 rounded-[2rem] border-8 border-white object-cover shadow-2xl ring-8 ring-primary/5 dark:border-[#111D29] sm:h-40 sm:w-40" /><span className={`absolute -right-2 top-3 rounded-full border-4 border-white px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white dark:border-[#111D29] ${member.status === 'Alive' ? 'bg-green-500' : member.status === 'Missing' ? 'bg-red-500' : 'bg-slate-500'}`}>{member.status}</span></div>
          <div className="min-w-0 flex-1 pb-2 text-center sm:text-left"><h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">{member.name}</h1><div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400 sm:justify-start"><span className="flex items-center gap-1.5"><Heart size={13} className="text-primary" /> {member.role}</span><span className="flex items-center gap-1.5"><Clock size={13} className="text-primary" /> {member.birthDate} – {member.deathDate || 'Present'}</span><span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" /> {member.location}</span></div></div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">{[
          { label: 'Occupation', value: member.occupation, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Spouse', value: member.spouse, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Married', value: member.marriedYear, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Children', value: member.childrenCount, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' }
        ].map((stat) => <div key={stat.label} className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40 sm:p-5"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}><stat.icon size={17} /></span><div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p><p className="truncate text-sm font-bold text-slate-800 dark:text-white">{stat.value}</p></div></div>)}</div>

        <div className="mt-9 flex gap-7 overflow-x-auto border-b border-slate-100 dark:border-slate-800 sm:gap-10">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative shrink-0 pb-4 text-[10px] font-black uppercase tracking-[0.18em] transition ${activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>{tab}{activeTab === tab && <motion.span layoutId="profile-tab-line" className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-primary" />}</button>)}</div>
        <div className="mt-8 min-h-[280px]"><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{renderTabContent()}</motion.div></AnimatePresence></div>
      </div>
    </div>
  );
}
