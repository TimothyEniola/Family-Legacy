import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Sun, Moon, GitFork } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Features', to: '/#features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' }
];

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0F172A] dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25">
              <GitFork size={22} className="rotate-180" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              Family<span className="text-primary">Legacy</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-bold text-slate-500 dark:text-slate-300 hover:text-primary transition-colors uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/login"
              className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-2xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Join Now
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] lg:hidden">
            <div className="mx-auto max-w-7xl px-6 py-5 space-y-4">
              <div className="grid gap-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:text-primary transition-colors"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full rounded-2xl px-4 py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full rounded-2xl px-4 py-3 text-center text-sm font-black uppercase tracking-widest bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25">
                <GitFork size={22} className="rotate-180" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                Family<span className="text-primary">Legacy</span>
              </span>
            </div>
            <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Building a secure family archive for stories, photos, documents, and traditions. Every page routes cleanly across desktop and mobile.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Explore</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Product</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">Get Started</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">Log In</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">Plans</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
              <li>
                <button className="hover:text-primary transition-colors" type="button">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors" type="button">Terms of Service</button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors" type="button">Contact</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Family Legacy. Built to keep your family together.</p>
          <p>Designed for perfect routing and responsive navigation on every screen.</p>
        </div>
      </footer>
    </div>
  );
}
