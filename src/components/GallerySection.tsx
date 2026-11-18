import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { Images, X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { LAST_YEAR_GALLERY, type GalleryPhoto } from '../data/devfestData';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Keynotes', 'Workshops', 'Community', 'Swag'] as const;
type Category = (typeof CATEGORIES)[number];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visiblePhotos =
    activeCategory === 'All'
      ? LAST_YEAR_GALLERY
      : LAST_YEAR_GALLERY.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-tile', {
        y: 28,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Keyboard support inside Lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % visiblePhotos.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, visiblePhotos.length]);

  const activePhoto: GalleryPhoto | null =
    lightboxIdx !== null ? visiblePhotos[lightboxIdx] ?? null : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FAF9F6] bg-draft-grid border-t border-slate-200/80 text-slate-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#EA4335] font-semibold mb-2">
              <Images className="w-3.5 h-3.5" />
              <span>{'{ Last Year Highlights · #DevFestPrayagraj25 }'}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
              Relive{' '}
              <span className="font-editorial italic font-normal text-[#4285F4]">
                last year’s energy.
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Snapshots from DevFest Prayagraj ’25 — packed keynotes, hands-on workshops, swag
              drops, and the people who make our developer community special.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIdx(null);
                }}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Editorial Masonry Grid */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-12 gap-5">
          {visiblePhotos.map((photo, idx) => {
            const colSpan =
              activeCategory === 'All' && photo.span === 'wide'
                ? 'md:col-span-7'
                : activeCategory === 'All'
                ? 'md:col-span-5'
                : 'md:col-span-6';
            return (
              <motion.button
                layout
                key={photo.id}
                onClick={() => setLightboxIdx(idx)}
                className={`gallery-tile group relative rounded-[28px] overflow-hidden border border-slate-200 bg-slate-950 shadow-sm hover:shadow-2xl transition-all text-left cursor-pointer ${colSpan} h-[280px] sm:h-[340px]`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-90 group-hover:opacity-95 transition" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span
                    className="font-mono-dev text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-sm"
                    style={{ backgroundColor: photo.color }}
                  >
                    {photo.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-2.5 py-1 font-mono-dev text-[10px] text-white">
                    <Expand className="w-3 h-3" />
                    {photo.year}
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-display font-bold text-lg sm:text-xl leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-[95] bg-slate-950/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
              className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {visiblePhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx(
                      (lightboxIdx - 1 + visiblePhotos.length) % visiblePhotos.length
                    );
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx((lightboxIdx + 1) % visiblePhotos.length);
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-[28px] overflow-hidden bg-[#0B0F1A] border border-white/15 shadow-2xl"
            >
              <div className="relative bg-black max-h-[68vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full max-h-[68vh] object-contain"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-mono-dev text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: activePhoto.color }}
                    >
                      {activePhoto.category}
                    </span>
                    <span className="font-mono-dev text-xs text-slate-400">
                      {activePhoto.year} · {lightboxIdx + 1} / {visiblePhotos.length}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-xl">{activePhoto.title}</h4>
                  <p className="text-sm text-slate-300 mt-0.5">{activePhoto.caption}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
