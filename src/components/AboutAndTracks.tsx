import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { CalendarDays, MapPin, Users, Sparkles, ArrowUpRight } from 'lucide-react';
import { EVENT_META, OFFICIAL_BADGES, STATS, TRACKS } from '../data/devfestData';

gsap.registerPlugin(ScrollTrigger);

interface AboutAndTracksProps {
  scrollToSection: (id: string) => void;
}

const TECH_MARQUEE = [
  'GEMINI 2.5',
  'GOOGLE CLOUD',
  'FLUTTER',
  'KUBERNETES',
  'ANGULAR',
  'FIREBASE',
  'VERTEX AI',
  'ANDROID',
  'WEB PERFORMANCE',
  'OPEN SOURCE',
];

export default function AboutAndTracks({ scrollToSection }: AboutAndTracksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger count-up stats
      const counters = gsap.utils.toArray<HTMLElement>('.stat-counter');
      counters.forEach((el) => {
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.floor(obj.val).toLocaleString('en-IN')}${suffix}`;
          },
        });
      });

      // GSAP ScrollTrigger staggered cards for About / Logistics
      gsap.from('.logistics-card', {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.logistics-grid',
          start: 'top 84%',
          once: true,
        },
      });

      // GSAP ScrollTrigger staggered cards for Official Role Badges
      gsap.from('.role-badge-card', {
        y: 32,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.role-badges-grid',
          start: 'top 84%',
          once: true,
        },
      });

      // GSAP ScrollTrigger staggered cards for 4 Tracks
      gsap.from('.track-bento-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tracks-bento-grid',
          start: 'top 82%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] text-slate-900">
      {/* Kinetic Developer Tech Marquee */}
      <div className="marquee-wrapper overflow-hidden border-y border-slate-200/80 bg-white py-3.5 sm:py-4 select-none">
        <div className="animate-marquee-left items-center gap-7">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((item, i) => (
            <div key={i} className="flex items-center gap-7 shrink-0">
              <span className="font-mono-dev text-xs sm:text-sm font-bold tracking-widest text-slate-800">
                {item}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#4285F4', '#EA4335', '#F9AB00', '#34A853'][i % 4],
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT & EVENT LOGISTICS */}
      <section id="about" className="relative py-16 sm:py-24 bg-draft-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 3-Column Event Logistics Cards */}
          <div className="logistics-grid grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-14">
            <div className="logistics-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#C3ECF6] text-[#4285F4] mb-4">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div className="font-mono-dev text-xs uppercase tracking-wider text-slate-500">
                {'{ WHEN }'}
              </div>
              <h3 className="font-display font-bold text-xl mt-1">{EVENT_META.dateDisplay}</h3>
              <p className="text-sm text-slate-600 mt-1.5">
                {EVENT_META.timeDisplay}. Full-day conference covering keynotes, talks, and codelabs.
              </p>
            </div>

            <div className="logistics-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#F8D8D8] text-[#EA4335] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-mono-dev text-xs uppercase tracking-wider text-slate-500">
                {'{ WHERE }'}
              </div>
              <h3 className="font-display font-bold text-xl mt-1">{EVENT_META.venueShort}</h3>
              <p className="text-sm text-slate-600 mt-1.5">
                Easily accessible — 10 minutes from Prayagraj Junction &amp; 25 minutes from IXD Airport.
              </p>
            </div>

            <div className="logistics-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#CCF6C5] text-[#34A853] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-mono-dev text-xs uppercase tracking-wider text-slate-500">
                {'{ WHO SHOULD ATTEND }'}
              </div>
              <h3 className="font-display font-bold text-xl mt-1">All Developers &amp; Students</h3>
              <p className="text-sm text-slate-600 mt-1.5">
                Open to students, software engineers, designers, and founders across all skill levels.
              </p>
            </div>
          </div>

          {/* Count-Up Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-16">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: stat.color }}
                />
                <div
                  className="stat-counter font-display font-bold text-3xl sm:text-5xl tracking-tight"
                  style={{ color: stat.color }}
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                <div className="font-display font-bold text-slate-900 text-sm sm:text-base mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Official DevFest 2026 Role Badges (from Official PDF) */}
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="font-mono-dev text-xs uppercase tracking-wider text-[#4285F4] font-semibold">
                  {'{ Official DevFest 2026 Roles }'}
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 mt-1">
                  Ways to be part of DevFest Prayagraj ’26
                </h3>
              </div>
              <button
                onClick={() => scrollToSection('badge')}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full bg-slate-950 hover:bg-[#4285F4] text-white px-4 py-2 text-xs font-semibold transition cursor-pointer"
              >
                Create Custom Badge
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="role-badges-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICIAL_BADGES.map((b) => (
                <div
                  key={b.title}
                  className="role-badge-card rounded-3xl border border-slate-200/80 bg-[#FAF9F6] hover:bg-white hover:shadow-md transition p-5 flex flex-col items-center text-center"
                >
                  <img
                    src={b.image}
                    alt={`DevFest 2026 ${b.title} Badge`}
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <h4 className="font-display font-bold text-lg text-slate-950">{b.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dark Contrast Divider */}
      <div className="w-full overflow-hidden py-3 bg-[#10172A] text-[#FFE7A5] border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between gap-4 font-mono-dev text-xs sm:text-sm tracking-[0.25em] whitespace-nowrap overflow-hidden">
          <span>◆ {'{ AI }'} ◆</span>
          <span className="text-[#57CAFF]">DEVFEST PRAYAGRAJ 2026</span>
          <span className="hidden sm:inline">◆ {'{ CLOUD }'} ◆</span>
          <span className="hidden md:inline text-[#5CDB6D]">WHERE CODE MEETS CULTURE</span>
          <span>◆ {'{ WEB · BUILD }'} ◆</span>
        </div>
      </div>

      {/* 4 CORE TRACKS BENTO GRID */}
      <section id="tracks" className="py-20 sm:py-28 bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#4285F4] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{'{ 4 Core Tracks }'}</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
                Four tracks,{' '}
                <span className="font-editorial italic font-normal text-[#EA4335]">
                  one developer festival.
                </span>
              </h2>
              <div className="google-bar w-32 mt-4">
                <span className="bg-[#4285F4]" />
                <span className="bg-[#EA4335]" />
                <span className="bg-[#F9AB00]" />
                <span className="bg-[#34A853]" />
              </div>
            </div>

            {/* Official DevFest 2026 Key Art Card */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 pr-5 shadow-sm max-w-md">
              <img
                src="/assets/devfest/official/keyart-horizontal.png"
                alt="Official DevFest 2026 Key Art"
                className="w-20 h-14 object-contain rounded-xl bg-slate-50 p-1 shrink-0"
              />
              <div>
                <div className="font-mono-dev text-[10px] uppercase tracking-wider text-slate-500">
                  Official DevFest ’26 Identity
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">
                  Talks, hands-on codelabs &amp; live demos across AI, Cloud, Web &amp; Build.
                </div>
              </div>
            </div>
          </div>

          <div className="tracks-bento-grid grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {TRACKS.map((track) => (
              <motion.div
                key={track.id}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="track-bento-card group relative rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-55 blur-2xl transition-transform duration-500 group-hover:scale-125"
                  style={{ backgroundColor: track.pastel }}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span
                        className="font-mono-dev text-xs font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: track.pastel, color: '#111827' }}
                      >
                        Track {track.code} · {track.hall}
                      </span>
                      <span
                        className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight"
                        style={{ color: track.color }}
                      >
                        {track.short}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
                      {track.title}
                    </h3>
                    <p className="font-mono-dev text-xs text-slate-500 mt-1">{track.tagline}</p>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                      {track.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {track.topics.map((t) => (
                        <span
                          key={t}
                          className="font-mono-dev text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => scrollToSection('schedule')}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer"
                      style={{ color: track.color }}
                    >
                      Sessions
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
