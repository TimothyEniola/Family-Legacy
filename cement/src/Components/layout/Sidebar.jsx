import { useNavigate, useLocation } from 'react-router-dom';
import { CURRENT_USER, isFamilyAdmin } from '../../data/mockData';
import { 
  LayoutDashboard, GitFork, BookOpen, Users, Image, Calendar,
  Heart, Search, Settings, LogOut,
  MessageSquare, Bell, Shield, FileText, Utensils, Flag,
  ScrollText, Landmark, Siren, LayoutPanelLeft, Newspaper, History
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ onLinkClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Family Tree', path: '/family-tree', icon: GitFork },
    { name: 'Member Profiles', path: '/profiles', icon: Users },
    { name: 'Life Stories', path: '/life-story', icon: BookOpen },
    { name: 'Family Community', path: '/community', icon: Flag },
    { name: 'Family Search', path: '/search', icon: Search },
    { name: 'Family Feed', path: '/family-feed', icon: Newspaper },
    { name: 'Family History', path: '/family-history', icon: History },
    { name: 'Photos & Videos', path: '/gallery', icon: Image },
    { name: 'Image Search', path: '/image-search', icon: Search },
    { name: 'Timeline', path: '/timeline', icon: ScrollText },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Recipes', path: '/recipes', icon: Utensils },
    { name: 'Traditions', path: '/traditions', icon: Landmark },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Property Records', path: '/properties', icon: Shield },
    { name: 'Announcements', path: '/announcements', icon: Bell },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Memorials', path: '/memorial', icon: Heart },
    { name: 'Emergency', path: '/emergency', icon: Siren },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Only show Admin Dashboard if user is Super Admin
  const isAdmin = isFamilyAdmin();
  if (isAdmin) {
    menuItems.splice(1, 0, { name: 'Admin Dashboard', path: '/admin', icon: LayoutPanelLeft });
  }

  const handleNavigation = (path) => {
    navigate(path);
    if (onLinkClick) onLinkClick();
  };

  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111D29] p-6 flex flex-col justify-between shadow-sm z-40 overflow-hidden">
      
      <div className="space-y-6 flex-1 flex flex-col min-h-0">
        
        {/* Brand Logo Header */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none px-2" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <GitFork size={22} className="rotate-180" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white leading-none">
              Family <span className="text-primary">Legacy</span>
            </h1>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest block mt-1.5">
              Digital Archive
            </span>
          </div>
        </div>

        {/* Logged In User Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0A1622] border border-slate-100 dark:border-slate-800/50">
          <div className="relative">
            <img 
              src={CURRENT_USER.avatar} 
              alt={CURRENT_USER.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0A1622] rounded-full"></div>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold truncate text-slate-900 dark:text-white">
              {CURRENT_USER.name}
            </h4>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">
              {CURRENT_USER.role}
            </p>
          </div>
        </div>

        {/* Menu Items Links List */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/profiles' && location.pathname.startsWith('/profile/'));

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left group relative ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-white'
                }`}
              >
                <Icon 
                  size={16} 
                  className={`shrink-0 transition-colors ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 group-hover:text-primary dark:group-hover:text-slate-200'
                  }`} 
                />
                <span className="truncate">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Footer Settings & Theme Controls */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/50">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Legacy Progress</p>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-primary rounded-full shadow-sm shadow-primary/30"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] font-bold text-slate-500">65% Archived</span>
            <span className="text-[9px] font-bold text-primary">Silver Tier</span>
          </div>
        </div>

        <button 
          onClick={() => handleNavigation('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          <span>Logout Session</span>
        </button>
      </div>

    </aside>
  );
}
