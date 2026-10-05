import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, BellRing, Building2, FileText, Megaphone, Plus, Search, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { CURRENT_USER } from '../data/mockData';
import { useFamily } from '../context/FamilyContext';

const announcementTypes = ['Birth / New Baby', 'Birthday', 'Wedding', 'Missing Person', 'Family Reunion', 'Emergency Notice', 'Memorial', 'General'];
const emptyAnnouncement = { type: announcementTypes[0], title: '', familyId: 'all', priority: 'Normal', content: '', eventDate: '', eventTime: '', location: '' };
const emptyBranch = { name: '', town: '', state: '', country: '', about: '' };
const formatBytes = (bytes) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export default function AdminPage() {
  const { familyGroups, members, announcements, documents, activities, addFamilyGroup, publishAnnouncement } = useFamily();
  const [announcement, setAnnouncement] = useState(emptyAnnouncement);
  const [branch, setBranch] = useState(emptyBranch);
  const [search, setSearch] = useState('');
  const [announcementStatus, setAnnouncementStatus] = useState('');
  const [branchStatus, setBranchStatus] = useState('');

  const filteredBranches = useMemo(() => familyGroups.filter((item) => `${item.name} ${item.town || ''} ${item.state || ''} ${item.country || ''}`.toLowerCase().includes(search.toLowerCase())), [familyGroups, search]);
  const storageBytes = documents.reduce((total, document) => total + (document.sizeBytes || 0), 0);
  const stats = [
    { label: 'Family branches', value: familyGroups.length, icon: Building2, color: 'bg-orange-500' },
    { label: 'Archived members', value: members.length, icon: Users, color: 'bg-emerald-500' },
    { label: 'Official announcements', value: announcements.length, icon: Megaphone, color: 'bg-blue-500' },
    { label: 'Document archive size', value: formatBytes(storageBytes), icon: FileText, color: 'bg-violet-500' }
  ];

  const handleAnnouncement = (event) => {
    event.preventDefault();
    setAnnouncementStatus('');
    try {
      const record = publishAnnouncement(announcement);
      setAnnouncementStatus({ message: `${record.type} announcement published to ${record.familyName} and the announcements channel.`, error: false });
      setAnnouncement(emptyAnnouncement);
    } catch (error) {
      setAnnouncementStatus({ message: error.message || 'The announcement could not be published.', error: true });
    }
  };

  const handleBranch = (event) => {
    event.preventDefault();
    setBranchStatus('');
    if (familyGroups.some((item) => item.name.trim().toLowerCase() === branch.name.trim().toLowerCase())) {
      setBranchStatus({ message: 'A family branch with that name already exists.', error: true });
      return;
    }
    const created = addFamilyGroup(branch);
    setBranchStatus({ message: `${created.name} is ready and available as an announcement audience.`, error: false });
    setBranch(emptyBranch);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-7 pb-12">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary"><Shield size={13} /> Family administration</div><h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Admin dashboard</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Publish official family news and manage the shared archive.</p></div><div className="flex gap-2"><Link to="/notifications" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-primary dark:border-slate-800 dark:bg-[#111D29] dark:text-slate-200"><Activity size={15} /> Activity & notifications</Link><Link to="/announcements" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white"><BellRing size={15} /> View announcements</Link></div></header>

      <section aria-label="Live archive metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat, index) => <motion.article key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-[#111D29]"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} text-white`}><stat.icon size={19} /></span><p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p><p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p></motion.article>)}</section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)]">
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-premium dark:border-slate-800 dark:bg-[#111D29] sm:p-7">
          <div className="mb-5 flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Megaphone size={20} /></span><div><h2 className="text-lg font-black text-slate-900 dark:text-white">Publish an official announcement</h2><p className="mt-1 text-xs leading-relaxed text-slate-500">This appears on Announcements, sends a post to the group announcements channel, and records the activity.</p></div></div>
          <form onSubmit={handleAnnouncement} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="announcement-type" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Announcement type</label><select id="announcement-type" value={announcement.type} onChange={(event) => setAnnouncement((current) => ({ ...current, type: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white">{announcementTypes.map((type) => <option key={type}>{type}</option>)}</select></div><div><label htmlFor="announcement-family" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Audience</label><select id="announcement-family" value={announcement.familyId} onChange={(event) => setAnnouncement((current) => ({ ...current, familyId: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option value="all">All families</option>{familyGroups.map((family) => <option key={family.id} value={family.id}>{family.name}</option>)}</select></div></div>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px]"><div><label htmlFor="announcement-title" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Headline</label><input id="announcement-title" required maxLength={100} value={announcement.title} onChange={(event) => setAnnouncement((current) => ({ ...current, title: event.target.value }))} placeholder="e.g. Welcome baby Amara" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div><div><label htmlFor="announcement-priority" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Priority</label><select id="announcement-priority" value={announcement.priority} onChange={(event) => setAnnouncement((current) => ({ ...current, priority: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"><option>Normal</option><option>Medium</option><option>High</option></select></div></div>
            <div><label htmlFor="announcement-content" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Message</label><textarea id="announcement-content" required rows={4} maxLength={1500} value={announcement.content} onChange={(event) => setAnnouncement((current) => ({ ...current, content: event.target.value }))} placeholder="Share the important details with the family…" className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div>
            <details className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"><summary className="cursor-pointer text-xs font-bold text-slate-600 dark:text-slate-300">Add event details (optional)</summary><div className="mt-3 grid gap-3 sm:grid-cols-3"><div><label htmlFor="event-date" className="mb-1 block text-[10px] font-bold text-slate-500">Date</label><input id="event-date" type="date" value={announcement.eventDate} onChange={(event) => setAnnouncement((current) => ({ ...current, eventDate: event.target.value }))} className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div><div><label htmlFor="event-time" className="mb-1 block text-[10px] font-bold text-slate-500">Time</label><input id="event-time" type="time" value={announcement.eventTime} onChange={(event) => setAnnouncement((current) => ({ ...current, eventTime: event.target.value }))} className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div><div><label htmlFor="event-location" className="mb-1 block text-[10px] font-bold text-slate-500">Location</label><input id="event-location" value={announcement.location} onChange={(event) => setAnnouncement((current) => ({ ...current, location: event.target.value }))} placeholder="Lagos" className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div></div><p className="mt-2 text-[10px] text-slate-400">Adding a date also creates an event in the family calendar.</p></details>
            {announcementStatus && <p role={announcementStatus.error ? 'alert' : 'status'} className={`rounded-xl px-3 py-2.5 text-xs font-semibold ${announcementStatus.error ? 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300' : 'bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300'}`}>{announcementStatus.message}</p>}
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition hover:bg-primary-600 sm:w-auto"><Megaphone size={15} /> Publish to family</button>
          </form>
        </section>

        <div className="space-y-6">
          <details className="group rounded-3xl border border-slate-100 bg-white shadow-premium dark:border-slate-800 dark:bg-[#111D29]"><summary className="flex cursor-pointer list-none items-center justify-between p-5 sm:p-6"><span><span className="block text-sm font-black text-slate-900 dark:text-white">Provision a family branch</span><span className="mt-1 block text-xs text-slate-500">New branches are added to announcement audiences.</span></span><span className="rounded-xl bg-primary/10 p-2 text-primary group-open:rotate-45"><Plus size={17} /></span></summary><form onSubmit={handleBranch} className="space-y-3 border-t border-slate-100 p-5 dark:border-slate-800 sm:p-6"><div><label htmlFor="branch-name" className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">Family name</label><input id="branch-name" required value={branch.name} onChange={(event) => setBranch((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Okafor Family" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div><div className="grid grid-cols-2 gap-3">{[['town', 'Town'], ['state', 'State'], ['country', 'Country']].map(([key, label]) => <div key={key}><label htmlFor={`branch-${key}`} className="mb-1 block text-[10px] font-bold text-slate-500">{label}</label><input id={`branch-${key}`} value={branch[key]} onChange={(event) => setBranch((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div>)}</div><div><label htmlFor="branch-about" className="mb-1 block text-[10px] font-bold text-slate-500">Branch description</label><textarea id="branch-about" rows={2} value={branch.about} onChange={(event) => setBranch((current) => ({ ...current, about: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div>{branchStatus && <p role={branchStatus.error ? 'alert' : 'status'} className={`text-xs font-semibold ${branchStatus.error ? 'text-red-600' : 'text-green-600'}`}>{branchStatus.message}</p>}<button type="submit" className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white">Create branch</button></form></details>

          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-premium dark:border-slate-800 dark:bg-[#111D29]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 dark:border-slate-800"><div><h2 className="text-sm font-black text-slate-900 dark:text-white">Family branches</h2><p className="mt-1 text-[10px] text-slate-400">{familyGroups.length} active in this archive</p></div><label className="relative"><span className="sr-only">Search branches</span><Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="w-32 rounded-lg bg-slate-50 py-2 pl-8 pr-2 text-xs outline-none focus:ring-1 focus:ring-primary dark:bg-slate-900 dark:text-white" /></label></div><ul className="divide-y divide-slate-100 dark:divide-slate-800">{filteredBranches.map((item) => <li key={item.id} className="flex items-center gap-3 p-4"><img src={item.logo || CURRENT_USER.avatar} alt="" className="h-9 w-9 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">{item.name}</p><p className="truncate text-[10px] text-slate-400">{[item.town, item.state, item.country].filter(Boolean).join(', ') || 'Location not listed'} · {item.memberIds?.length || 0} members</p></div><span className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">Active</span></li>)}{!filteredBranches.length && <li className="p-6 text-center text-xs text-slate-500">No matching branches.</li>}</ul></section>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-[#111D29]"><div className="flex items-center justify-between"><div><h2 className="text-sm font-black text-slate-900 dark:text-white">Recent admin activity</h2><p className="mt-1 text-[10px] text-slate-400">Updates from the shared family archive</p></div><Link to="/notifications" className="text-xs font-bold text-primary hover:underline">View all</Link></div><div className="mt-4 grid gap-3 md:grid-cols-2">{activities.slice(0, 4).map((activity) => <article key={activity.id} className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-900"><img src={activity.avatar || CURRENT_USER.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /><div className="min-w-0"><p className="truncate text-xs font-bold text-slate-700 dark:text-slate-200">{activity.user} {activity.action}</p><p className="truncate text-[10px] text-primary">{activity.detail}</p></div><time className="ml-auto shrink-0 text-[9px] text-slate-400">{activity.time}</time></article>)}</div></section>
      <p className="text-[10px] leading-relaxed text-slate-400">This interface stores demo records in this browser. Real permission enforcement, encrypted storage, and cross-device publishing require a secure server-backed service.</p>
    </div>
  );
}
