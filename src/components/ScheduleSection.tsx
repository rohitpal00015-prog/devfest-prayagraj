import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import {
  LayoutGrid,
  Columns3,
  ListOrdered,
  Bookmark,
  Search,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { TRACKS, SESSIONS, SCHEDULE_SLOTS, type TrackKey } from '../data/devfestData';

gsap.registerPlugin(ScrollTrigger);

type ViewMode = 'grid' | 'lanes' | 'timeline';

const TRACK_COLORS: Record<TrackKey, { main: string; pastel: string }> = {
  ai: { main: '#4285F4', pastel: '#C3ECF6' },
  cloud: { main: '#EA4335', pastel: '#F8D8D8' },
  web: { main: '#F9AB00', pastel: '#FFE7A5' },
  build: { main: '#34A853', pastel: '#CCF6C5' },
};

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [trackFilter, setTrackFilter] = useState<TrackKey | 'all'>('all');
  const [search, setSearch] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('devfest_pryj_saved_sessions');
      return raw ? JSON.parse(raw) : ['s2', 's9'];
    } catch {
      return ['s2', 's9'];
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.schedule-header-anim', {
        y: 24,
        duration: 0.65,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('devfest_pryj_saved_sessions', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredSessions = useMemo(() => {
    return SESSIONS.filter((s) => {
      if (trackFilter !== 'all' && s.track !== trackFilter) return false;
      if (onlySaved && !savedIds.includes(s.id)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q) ||
          s.hall.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [trackFilter, onlySaved, savedIds, search]);

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FAF9F6] bg-draft-grid border-t border-slate-200/80 overflow-x-clip"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="schedule-header-anim flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#4285F4] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{'{ Agenda · 4 Tracks }'}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
              Plan your{' '}
              <span className="font-editorial italic font-normal text-[#EA4335]">DevFest day.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Switch between Grid, Hall Lanes, or Timeline — and bookmark sessions to your schedule.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-white p-1.5 border border-slate-200 shadow-sm self-start lg:self-auto">
            {(
              [
                { id: 'grid', label: 'Grid', icon: LayoutGrid },
                { id: 'lanes', label: 'Lanes', icon: Columns3 },
                { id: 'timeline', label: 'Timeline', icon: ListOrdered },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  viewMode === id ? 'text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {viewMode === id && (
                  <motion.span
                    layoutId="scheduleViewMode"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-slate-950"
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTrackFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                trackFilter === 'all'
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              All Tracks
            </button>
            {TRACKS.map((p) => (
              <button
                key={p.id}
                onClick={() => setTrackFilter(p.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  trackFilter === p.id
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
                style={trackFilter === p.id ? { backgroundColor: p.color } : undefined}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: trackFilter === p.id ? '#fff' : p.color }}
                />
                {p.short}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search talks, speakers..."
                className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
              />
            </div>
            <button
              onClick={() => setOnlySaved((s) => !s)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition shrink-0 cursor-pointer ${
                onlySaved
                  ? 'bg-[#F9AB00] text-slate-950 border-[#F9AB00]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-slate-950' : ''}`} />
              My Agenda ({savedIds.length})
            </button>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSessions.map((session) => {
              const style = TRACK_COLORS[session.track];
              const isSaved = savedIds.includes(session.id);
              return (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="font-mono-dev text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: style.main }}
                      >
                        {session.time} – {session.endTime}
                      </span>
                      <button
                        onClick={() => toggleSave(session.id)}
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                        aria-label="Save session"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-[#F9AB00] text-[#F9AB00]' : 'text-slate-500'
                          }`}
                        />
                      </button>
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-950 leading-snug">
                      {session.title}
                    </h4>
                    <div className="mt-2 text-xs font-semibold text-slate-700">
                      {session.speaker}{' '}
                      <span className="font-normal text-slate-500">· {session.speakerRole}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      {session.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 font-mono-dev text-[11px] text-slate-600">
                      <MapPin className="w-3 h-3" style={{ color: style.main }} />
                      {session.hall}
                    </span>
                    <span className="font-mono-dev text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {session.type}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* LANES VIEW */}
        {viewMode === 'lanes' && (
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[820px] space-y-4">
              <div className="grid grid-cols-[170px_1fr] gap-4 items-center">
                <div className="font-mono-dev text-[11px] uppercase tracking-wider text-slate-500 font-bold pl-2">
                  Track Hall ↓
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {SCHEDULE_SLOTS.map((slot) => (
                    <div
                      key={slot}
                      className="font-mono-dev text-[11px] font-bold text-slate-600 bg-white border border-slate-200 rounded-xl py-1.5 text-center"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {TRACKS.filter((p) => trackFilter === 'all' || p.id === trackFilter).map((track) => {
                const laneSessions = filteredSessions.filter((s) => s.track === track.id);
                return (
                  <div
                    key={track.id}
                    className="grid grid-cols-[170px_1fr] gap-4 items-stretch rounded-3xl bg-white border border-slate-200 p-3 shadow-sm"
                  >
                    <div
                      className="rounded-2xl p-3.5 flex flex-col justify-between"
                      style={{ backgroundColor: `${track.pastel}75` }}
                    >
                      <div>
                        <span
                          className="inline-block font-mono-dev text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: track.color }}
                        >
                          {track.short} Track
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-950 mt-2">
                          {track.hall}
                        </h4>
                      </div>
                      <span className="font-mono-dev text-[10px] text-slate-600 mt-2">
                        {laneSessions.length} session{laneSessions.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="flex gap-3 overflow-x-auto no-scrollbar py-0.5">
                      {laneSessions.length === 0 ? (
                        <div className="flex items-center justify-center w-full text-xs text-slate-400 font-mono-dev py-6">
                          No matching sessions
                        </div>
                      ) : (
                        laneSessions.map((session) => {
                          const isSaved = savedIds.includes(session.id);
                          return (
                            <div
                              key={session.id}
                              className="min-w-[270px] max-w-[300px] flex-1 rounded-2xl border border-slate-200 bg-[#FAF9F6] hover:bg-white hover:shadow-md transition p-4 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="inline-flex items-center gap-1 font-mono-dev text-[11px] font-semibold text-slate-600">
                                    <Clock className="w-3 h-3" />
                                    {session.time}
                                  </span>
                                  <button
                                    onClick={() => toggleSave(session.id)}
                                    aria-label="Bookmark session"
                                    className="p-1.5 rounded-full hover:bg-slate-200/70 transition cursor-pointer"
                                  >
                                    <Bookmark
                                      className={`w-4 h-4 ${
                                        isSaved ? 'fill-[#F9AB00] text-[#F9AB00]' : 'text-slate-400'
                                      }`}
                                    />
                                  </button>
                                </div>
                                <h5 className="font-display font-bold text-sm text-slate-950 leading-snug">
                                  {session.title}
                                </h5>
                                <p className="text-xs text-slate-600 mt-1.5">{session.speaker}</p>
                              </div>
                              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between gap-2">
                                <span
                                  className="font-mono-dev text-[10px] font-bold px-2 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: TRACK_COLORS[session.track].pastel,
                                    color: '#111827',
                                  }}
                                >
                                  {session.type}
                                </span>
                                <span className="font-mono-dev text-[10px] text-slate-500">
                                  {session.level}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TIMELINE VIEW */}
        {viewMode === 'timeline' && (
          <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 space-y-5 before:content-[''] before:absolute before:left-2.5 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
            {filteredSessions.map((session) => {
              const style = TRACK_COLORS[session.track];
              const isSaved = savedIds.includes(session.id);
              return (
                <div key={session.id} className="relative">
                  <span
                    className="absolute -left-[22px] sm:-left-[31px] top-6 w-4 h-4 rounded-full border-4 border-[#FAF9F6]"
                    style={{ backgroundColor: style.main }}
                  />
                  <div className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-dev text-xs font-bold text-slate-900">
                          {session.time} – {session.endTime}
                        </span>
                        <span
                          className="font-mono-dev text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: style.pastel, color: '#111827' }}
                        >
                          {session.hall}
                        </span>
                        <span className="font-mono-dev text-[11px] text-slate-500">
                          · {session.type}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-slate-950">
                        {session.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600">{session.summary}</p>
                      <div className="text-xs font-semibold text-slate-800 pt-1">
                        {session.speaker}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSave(session.id)}
                      className={`self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition shrink-0 cursor-pointer ${
                        isSaved
                          ? 'bg-[#FFE7A5] border-[#F9AB00] text-slate-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-slate-950' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
