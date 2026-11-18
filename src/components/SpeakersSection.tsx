import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { Mic2, X, Sparkles, Globe, Share2, Code2 } from 'lucide-react';
import { SPEAKERS, TRACKS, type Speaker, type TrackKey } from '../data/devfestData';

gsap.registerPlugin(ScrollTrigger);

export default function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [trackFilter, setTrackFilter] = useState<TrackKey | 'all'>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.speaker-card', {
        y: 26,
        duration: 0.65,
        stagger: 0.05,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.speakers-grid',
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const visibleSpeakers =
    trackFilter === 'all' ? SPEAKERS : SPEAKERS.filter((s) => s.track === trackFilter);

  return (
    <section id="speakers" ref={sectionRef} className="py-20 sm:py-28 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#F9AB00] font-semibold mb-2">
              <Mic2 className="w-3.5 h-3.5" />
              <span>{'{ Speakers & GDEs · 12 Featured }'}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
              Engineers who{' '}
              <span className="font-editorial italic font-normal text-[#34A853]">actually ship.</span>
            </h2>
            <div className="google-bar w-28 mt-4">
              <span className="bg-[#4285F4]" />
              <span className="bg-[#EA4335]" />
              <span className="bg-[#F9AB00]" />
              <span className="bg-[#34A853]" />
            </div>
          </div>

          {/* Track Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTrackFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                trackFilter === 'all'
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-[#FAF9F6] text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              All ({SPEAKERS.length})
            </button>
            {TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrackFilter(t.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  trackFilter === t.id
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-[#FAF9F6] text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
                style={trackFilter === t.id ? { backgroundColor: t.color } : undefined}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: trackFilter === t.id ? '#fff' : t.color }}
                />
                {t.short}
              </button>
            ))}
          </div>
        </div>

        <div className="speakers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {visibleSpeakers.map((sp) => (
            <motion.button
              layout
              key={sp.id}
              onClick={() => setSelectedSpeaker(sp)}
              className="speaker-card group text-left rounded-[28px] border-2 bg-[#FAF9F6] hover:bg-white p-5 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              style={{ borderColor: `${sp.color}40` }}
            >
              <div>
                <div className="relative flex justify-center pt-2 pb-5">
                  <div
                    className="w-24 h-24 rounded-full p-1 transition-transform duration-300 group-hover:scale-105 shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${sp.color}, #0B0F1A)`,
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#0B0F1A] overflow-hidden relative">
                      <img
                        src={sp.photo}
                        alt={sp.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span
                    className="absolute bottom-2 px-3 py-1 rounded-full font-mono-dev text-[10px] font-bold uppercase tracking-wider text-white shadow-md"
                    style={{ backgroundColor: sp.color }}
                  >
                    {sp.badge}
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="font-display font-bold text-lg text-slate-950">{sp.name}</h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">{sp.role}</p>
                  <p className="font-mono-dev text-[11px] text-slate-500 mt-0.5">{sp.company}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 text-center">
                <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-snug">
                  “{sp.talkTitle}”
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Speaker Detail Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpeaker(null)}
            className="fixed inset-0 z-[90] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[32px] bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: selectedSpeaker.color }}
              />
              <button
                onClick={() => setSelectedSpeaker(null)}
                aria-label="Close speaker modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div
                  className="w-18 h-18 rounded-2xl p-0.5 shrink-0 shadow-md"
                  style={{ backgroundColor: selectedSpeaker.color }}
                >
                  <img
                    src={selectedSpeaker.photo}
                    alt={selectedSpeaker.name}
                    className="w-full h-full rounded-[14px] object-cover"
                  />
                </div>
                <div>
                  <span
                    className="inline-block font-mono-dev text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full text-white mb-1"
                    style={{ backgroundColor: selectedSpeaker.color }}
                  >
                    {selectedSpeaker.badge}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-slate-950">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {selectedSpeaker.role} · {selectedSpeaker.company}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="font-mono-dev text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3 h-3" style={{ color: selectedSpeaker.color }} />
                    Session at DevFest Prayagraj ’26
                  </div>
                  <div className="font-display font-bold text-sm sm:text-base text-slate-950">
                    {selectedSpeaker.talkTitle}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{selectedSpeaker.bio}</p>

                <div className="flex items-center gap-2 pt-2">
                  {[
                    { icon: Globe, label: 'LinkedIn' },
                    { icon: Share2, label: 'X / Twitter' },
                    { icon: Code2, label: 'GitHub' },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#speakers"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSpeaker(null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
