import { Link } from 'react-router-dom';
import { Bell, CalendarDays, ScanFace, ArrowRight, CheckCheck } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';

const icons = { announcement: CalendarDays, match: ScanFace };

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useFamily();
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Bell size={20} /></div><div><h1 className="text-2xl font-black text-slate-900 dark:text-white">Notifications</h1><p className="text-xs text-slate-500 dark:text-slate-400">{unreadCount ? `${unreadCount} unread update${unreadCount === 1 ? '' : 's'}` : 'You’re all caught up.'}</p></div></header>
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-premium dark:border-slate-800 dark:bg-[#111D29]">
        {notifications.length ? notifications.map((notification) => {
          const Icon = icons[notification.type] || Bell;
          return <Link key={notification.id} to={notification.route || '/announcements'} onClick={() => markNotificationRead(notification.id)} className={`flex items-start gap-4 border-b border-slate-100 p-5 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/60 sm:p-6 ${notification.read ? 'opacity-70' : ''}`}><span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={18} />{!notification.read && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary dark:border-[#111D29]" />}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><strong className="text-sm text-slate-900 dark:text-white">{notification.title}</strong><small className="text-[10px] text-slate-400">{notification.date}</small></span><span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{notification.message}</span></span>{notification.read ? <CheckCheck size={16} className="mt-2 shrink-0 text-slate-300" /> : <ArrowRight size={16} className="mt-2 shrink-0 text-slate-300" />}</Link>;
        }) : <div className="p-12 text-center text-sm text-slate-500">No notifications yet.</div>}
      </div>
      <Link to="/announcements" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">View all family announcements <ArrowRight size={14} /></Link>
    </div>
  );
}
