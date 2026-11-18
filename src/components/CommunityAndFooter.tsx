import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ChevronDown,
  Handshake,
  Ticket,
  Calendar,
  IdCard,
  ArrowUp,
  X,
  CheckCircle2,
  Sparkles,
  Mail,
} from 'lucide-react';
import { EVENT_META, FAQS, SPONSORS } from '../data/devfestData';

gsap.registerPlugin(ScrollTrigger);

interface CommunityAndFooterProps {
  onOpenRegister: () => void;
  registerOpen: boolean;
  onCloseRegister: () => void;
  scrollToSection: (id: string) => void;
}

export default function CommunityAndFooter({
  onOpenRegister,
  registerOpen,
  onCloseRegister,
  scrollToSection,
}: CommunityAndFooterProps) {
  const partnersRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [passTier, setPassTier] = useState<'student' | 'builder' | 'contributor'>('builder');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [ticketIssued, setTicketIssued] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: partnersRef.current,
          start: 'top 84%',
          once: true,
        },
      });
    }, partnersRef);
    return () => ctx.revert();
  }, []);

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    const code = `DF26-PRYJ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketIssued(code);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#4285F4', '#EA4335', '#F9AB00', '#34A853'],
    });
  };

  return (
    <>
      {/* Partners & Sponsors */}
      <section
        id="partners"
        ref={partnersRef}
        className="py-16 sm:py-24 bg-white border-t border-slate-200/80"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#34A853] font-semibold mb-2">
                <Handshake className="w-3.5 h-3.5" />
                <span>{'{ Partners & Community }'}</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
                Backed by the{' '}
                <span className="font-editorial italic font-normal text-[#4285F4]">ecosystem.</span>
              </h2>
            </div>
            <a
              href={`mailto:${EVENT_META.email}?subject=DevFest%20Prayagraj%2026%20Partnership`}
              className="self-start md:self-auto inline-flex items-center gap-2 rounded-full border border-slate-300 bg-[#FAF9F6] hover:bg-slate-950 hover:text-white hover:border-slate-950 px-5 py-2.5 text-xs sm:text-sm font-semibold transition"
            >
              <Mail className="w-4 h-4" />
              Become a Sponsor / Partner
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPONSORS.map((s) => (
              <div
                key={s.name}
                className="partner-card rounded-3xl border border-slate-200 bg-[#FAF9F6] hover:bg-white p-5 sm:p-6 flex flex-col justify-between transition shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <span
                  className="self-start font-mono-dev text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full text-white mb-3"
                  style={{ backgroundColor: s.color }}
                >
                  {s.tier}
                </span>
                <div className="font-display font-bold text-base sm:text-lg text-slate-950">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section
        id="faq"
        className="py-16 sm:py-24 bg-[#FAF9F6] bg-draft-grid border-t border-slate-200/80"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="font-mono-dev text-xs uppercase tracking-widest text-[#EA4335] font-semibold mb-2">
              {'{ Frequently Asked Questions }'}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
              Everything you{' '}
              <span className="font-editorial italic font-normal text-[#4285F4]">need to know.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className={`rounded-3xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-[#FFE7A5]/55 border-[#F9AB00] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-lg text-slate-950">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center"
                    >
                      <ChevronDown className="w-4 h-4 text-slate-700" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-700 leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Midnight CTA Banner + Prayagraj Skyline Footer */}
      <footer className="relative bg-[#0B0F1A] text-white pt-16 sm:pt-24 pb-24 sm:pb-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-[34px] border border-white/15 bg-gradient-to-br from-[#132042] via-[#0F172A] to-[#1C1427] p-7 sm:p-12 text-center mb-14 relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 right-0 google-bar h-1.5 rounded-none">
              <span className="bg-[#4285F4]" />
              <span className="bg-[#EA4335]" />
              <span className="bg-[#F9AB00]" />
              <span className="bg-[#34A853]" />
            </div>
            <p className="font-mono-dev text-xs uppercase tracking-widest text-[#FFE7A5] mb-2">
              {EVENT_META.dateDisplay} · {EVENT_META.venueShort}
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight">
              Ready for{' '}
              <span className="font-editorial italic font-normal text-[#57CAFF]">
                DevFest Prayagraj ’26?
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-3">
              Reserve your free seat for a full day of talks, hands-on workshops, and networking
              with builders across Prayagraj.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 rounded-full bg-[#F9AB00] hover:bg-[#FFD427] text-slate-950 font-bold px-7 py-3.5 text-sm sm:text-base transition active:scale-95 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                Register Now
              </button>
              <button
                onClick={() => scrollToSection('badge')}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-6 py-3.5 text-sm sm:text-base transition cursor-pointer"
              >
                <IdCard className="w-4 h-4 text-[#57CAFF]" />
                Generate Badge
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F9AB00]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                <span className="font-display font-bold text-lg ml-1">GDG Prayagraj</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Google Developer Group Prayagraj is an independent, volunteer-run developer
                community celebrating AI, Cloud, Web, Mobile &amp; Open Source.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-sm">
              <div className="font-mono-dev text-xs uppercase tracking-wider text-slate-400 mb-2">
                Explore
              </div>
              {['about', 'tracks', 'schedule', 'speakers', 'badge', 'gallery', 'faq'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block text-slate-300 hover:text-white capitalize transition cursor-pointer"
                >
                  {id}
                </button>
              ))}
            </div>

            <div className="md:col-span-4 space-y-2 text-sm">
              <div className="font-mono-dev text-xs uppercase tracking-wider text-slate-400 mb-2">
                Community &amp; Conduct
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                GDG Prayagraj is dedicated to a harassment-free, inclusive experience under the
                Google Developers Community Guidelines &amp; Code of Conduct.
              </p>
              <p className="font-mono-dev text-xs text-[#57CAFF] pt-2">{EVENT_META.email}</p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>© 2026 GDG Prayagraj · DevFest Prayagraj ’26</span>
            <span className="font-mono-dev text-[11px] text-slate-500">
              Official DevFest ’26 Brand Assets · GSAP · Motion · Lenis
            </span>
          </div>
        </div>

        {/* Subtle Prayagraj Naini Bridge Skyline Silhouette */}
        <svg
          viewBox="0 0 1440 120"
          className="pointer-events-none absolute bottom-0 left-0 right-0 w-full h-16 sm:h-24 opacity-25"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M 0 100 Q 720 82 1440 100" stroke="#57CAFF" strokeWidth="3" />
          <path d="M 960 115 L 980 20 L 995 20 L 1015 115" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M 1180 115 L 1192 45 L 1202 45 L 1214 115" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="980" y1="28" x2="820" y2="94" stroke="#4285F4" strokeWidth="1.5" />
          <line x1="980" y1="42" x2="880" y2="93" stroke="#34A853" strokeWidth="1.5" />
          <line x1="995" y1="28" x2="1120" y2="95" stroke="#F9AB00" strokeWidth="1.5" />
          <line x1="995" y1="42" x2="1070" y2="94" stroke="#EA4335" strokeWidth="1.5" />
          <path
            d="M 120 115 L 120 75 L 190 75 L 210 38 L 230 75 L 310 75 L 310 115 Z"
            fill="#FFE7A5"
            fillOpacity="0.3"
          />
        </svg>
      </footer>

      {/* Floating Frosted Glass Quick-Action Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 w-full max-w-fit">
        <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-white/15 px-2.5 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] text-white">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F9AB00] text-slate-950 font-bold text-xs px-3.5 py-2 hover:bg-[#FFD427] transition cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5" />
            Pass
          </button>
          <button
            onClick={() => scrollToSection('schedule')}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#57CAFF]" />
            <span>Agenda</span>
          </button>
          <button
            onClick={() => scrollToSection('badge')}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition cursor-pointer"
          >
            <IdCard className="w-3.5 h-3.5 text-[#5CDB6D]" />
            <span>Badge</span>
          </button>
          <button
            onClick={() => scrollToSection('hero')}
            aria-label="Scroll to top"
            className="p-2 rounded-full text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {registerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseRegister}
            className="fixed inset-0 z-[95] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[32px] bg-white text-slate-950 p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 google-bar h-2 rounded-none">
                <span className="bg-[#4285F4]" />
                <span className="bg-[#EA4335]" />
                <span className="bg-[#F9AB00]" />
                <span className="bg-[#34A853]" />
              </div>

              <button
                onClick={onCloseRegister}
                aria-label="Close registration modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {!ticketIssued ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono-dev text-[11px] font-bold uppercase text-[#4285F4]">
                      <Sparkles className="w-3.5 h-3.5" />
                      DevFest Prayagraj ’26 RSVP
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl mt-1">
                      Reserve Your Seat
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {EVENT_META.dateDisplay} · {EVENT_META.venueShort} · All 4 Tracks + Swag.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'student', label: 'Student', sub: 'Free · College ID' },
                        { id: 'builder', label: 'Developer', sub: 'Free · Community' },
                        { id: 'contributor', label: 'OSS / GDE', sub: 'Priority Pass' },
                      ] as const
                    ).map((tier) => (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setPassTier(tier.id)}
                        className={`rounded-2xl p-3 text-left border-2 transition cursor-pointer ${
                          passTier === tier.id
                            ? 'border-[#4285F4] bg-[#C3ECF6]/35'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-display font-bold text-sm">{tier.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{tier.sub}</div>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block font-mono-dev text-[11px] uppercase text-slate-500 mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-dev text-[11px] uppercase text-slate-500 mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-slate-950 hover:bg-[#4285F4] text-white font-semibold py-3.5 text-sm transition cursor-pointer"
                  >
                    Generate Digital Pass
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#CCF6C5] text-[#34A853] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl mt-1">
                      Registration Confirmed!
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      See you at DevFest Prayagraj ’26, {regName}.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#0B0F1A] text-white p-5 font-mono-dev text-left space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>PASS ID</span>
                      <span className="text-[#FFD427] uppercase">{passTier} PASS</span>
                    </div>
                    <div className="text-xl font-bold text-[#57CAFF]">{ticketIssued}</div>
                    <div className="text-xs text-slate-300 pt-1">
                      {regName} · {regEmail}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        onCloseRegister();
                        scrollToSection('badge');
                      }}
                      className="rounded-full bg-[#4285F4] text-white font-semibold px-5 py-2.5 text-sm cursor-pointer"
                    >
                      Mint Your Badge Now →
                    </button>
                    <button
                      onClick={() => {
                        setTicketIssued(null);
                        onCloseRegister();
                      }}
                      className="rounded-full bg-slate-100 text-slate-700 font-semibold px-5 py-2.5 text-sm cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
