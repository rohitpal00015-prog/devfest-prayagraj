import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Ticket, Sparkles, ArrowUpRight } from 'lucide-react';
import { EVENT_META } from '../data/devfestData';

interface NavbarProps {
  onOpenRegister: () => void;
  scrollToSection: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About', color: '#4285F4' },
  { id: 'tracks', label: 'Tracks', color: '#EA4335' },
  { id: 'schedule', label: 'Schedule', color: '#F9AB00' },
  { id: 'speakers', label: 'Speakers', color: '#34A853' },
  { id: 'badge', label: 'Badge', color: '#4285F4' },
  { id: 'gallery', label: 'Gallery', color: '#F9AB00' },
  { id: 'faq', label: 'FAQ', color: '#34A853' },
];

export default function Navbar({ onOpenRegister, scrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(24);

  useEffect(() => {
    const target = new Date(EVENT_META.targetDateISO).getTime();
    setDaysLeft(Math.max(0, Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24))));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`pointer-events-auto mx-auto max-w-7xl rounded-full border transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border-slate-200/90 shadow-[0_10px_35px_rgba(11,15,26,0.10)] text-slate-900'
              : 'bg-[#0B0F1A]/65 backdrop-blur-lg border-white/15 text-white shadow-[0_8px_30px_rgba(0,0,0,0.28)]'
          }`}
        >
          {/* Logo Lockup */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 cursor-pointer text-left shrink-0"
          >
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 border border-current/10">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="w-2 h-2 rounded-full bg-[#F9AB00]" />
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            </div>
            <div className="font-display font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5">
              <span>{'{'} DevFest {'}'}</span>
              <span className="text-[11px] font-mono-dev px-1.5 py-0.5 rounded bg-[#4285F4]/15 text-[#4285F4] font-semibold">
                PRYJ ’26
              </span>
            </div>
          </button>

          {/* Clean Clear Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-colors cursor-pointer ${
                  scrolled
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA + Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenRegister}
              className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F9AB00] hover:bg-[#FFD427] text-slate-950 font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-rotate-12" />
              <span>Register</span>
              <span className="hidden sm:inline-block font-mono-dev text-[11px] bg-slate-950/15 px-1.5 py-0.5 rounded-full">
                {daysLeft}d
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className={`lg:hidden p-2 rounded-full border transition cursor-pointer ${
                scrolled
                  ? 'border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200'
                  : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Color-Coded Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#0B0F1A]/96 backdrop-blur-2xl flex flex-col justify-between p-6 text-white overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFD427]" />
                <span className="font-display font-bold text-lg">DEVFEST PRAYAGRAJ ’26</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-2.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-8 flex flex-col gap-2">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-white/10 transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition" />
                </motion.button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono-dev text-xs text-slate-400">{EVENT_META.dateDisplay}</div>
                <div className="text-sm text-slate-200">{EVENT_META.venueShort}</div>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenRegister();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#4285F4] hover:bg-[#57CAFF] hover:text-slate-950 text-white font-semibold px-6 py-3 transition cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                Register Now ({daysLeft}d left)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
