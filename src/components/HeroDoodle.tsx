import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Hotspot {
  id: string;
  label: string;
  title: string;
  desc: string;
  color: string;
  x: string;
  y: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'ai',
    label: 'AI Track',
    title: 'Artificial Intelligence · Main Stage',
    desc: 'Hands-on Gemini 2.5, Vertex AI, and multimodal agent sessions led by Google Developer Experts.',
    color: '#4285F4',
    x: '78%',
    y: '24%',
  },
  {
    id: 'cloud',
    label: 'Cloud Track',
    title: 'Google Cloud · Cable-Stayed Scale',
    desc: 'Cloud Run GPUs, GKE, and DevSecOps architectures inspired by Prayagraj’s New Yamuna Bridge.',
    color: '#EA4335',
    x: '56%',
    y: '46%',
  },
  {
    id: 'web',
    label: 'Web Track',
    title: 'Web & Mobile · Smooth Flow',
    desc: 'React, Angular, Flutter, and 60fps GSAP + Motion workshops in Web Hall.',
    color: '#F9AB00',
    x: '46%',
    y: '78%',
  },
  {
    id: 'community',
    label: 'Community',
    title: 'GDG Prayagraj · Developer Community',
    desc: '1,500+ students, engineers, and founders from MNNIT, IIIT-A, AU & across India.',
    color: '#34A853',
    x: '24%',
    y: '72%',
  },
];

export default function HeroDoodle() {
  const [activeId, setActiveId] = useState<string>('cloud');
  const [rippleCount, setRippleCount] = useState(0);
  const [bridgeGlow, setBridgeGlow] = useState(true);

  const activeHotspot = HOTSPOTS.find((h) => h.id === activeId) ?? HOTSPOTS[0];

  const handleHotspotClick = (h: Hotspot) => {
    setActiveId(h.id);
    if (h.id === 'web' || h.id === 'community') {
      setRippleCount((c) => c + 1);
    }
    if (h.id === 'cloud') {
      setBridgeGlow((g) => !g);
    }
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* Rainbow Conic Animated Outer Arch Frame */}
      <div className="rainbow-border rounded-t-[240px] rounded-b-[32px] p-[2.5px] shadow-[0_25px_80px_rgba(66,133,244,0.28)]">
        <div className="relative overflow-hidden rounded-t-[238px] rounded-b-[30px] bg-gradient-to-b from-[#0E1730] via-[#131E3E] to-[#0B1224] aspect-[4/4.25] w-full">
          <div className="absolute inset-0 bg-draft-grid-dark opacity-45" />

          {/* Clean Illustrated Prayagraj × DevFest Interactive Arch */}
          <svg
            viewBox="0 0 420 450"
            className="relative z-10 w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="geminiSun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD427" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#F9AB00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EA4335" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="waterRef" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4285F4" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#57CAFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34A853" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Arch decorative ring */}
            <path
              d="M 30 218 A 180 180 0 0 1 390 218"
              stroke="rgba(255,231,165,0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />

            {/* Top DevFest 2026 Mark */}
            <text
              x="210"
              y="66"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="Space Grotesk, sans-serif"
              fontSize="16"
              fontWeight="700"
              letterSpacing="1.5"
            >
              {'{ DEVFEST PRAYAGRAJ ’26 }'}
            </text>

            {/* Gemini AI Sun */}
            <g className="cursor-pointer" onClick={() => handleHotspotClick(HOTSPOTS[0])}>
              <circle cx="326" cy="112" r="50" fill="url(#geminiSun)" />
              <motion.path
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                style={{ originX: '326px', originY: '112px' }}
                d="M 326 90 L 332 106 L 348 112 L 332 118 L 326 134 L 320 118 L 304 112 L 320 106 Z"
                fill="#FFE7A5"
              />
            </g>

            {/* Subtle Prayagraj Skyline Left */}
            <path
              d="M 14 270 L 14 232 L 74 232 L 84 208 L 116 208 L 126 232 L 144 232 L 144 270 Z"
              fill="#1D2B4E"
              stroke="#FFE7A5"
              strokeOpacity="0.35"
              strokeWidth="1.2"
            />
            <path
              d="M 88 208 L 100 174 L 112 208 Z"
              fill="#E8A838"
              fillOpacity="0.85"
              stroke="#FFE7A5"
              strokeWidth="1"
            />

            {/* New Yamuna Cable-Stayed Bridge */}
            <g className="cursor-pointer" onClick={() => handleHotspotClick(HOTSPOTS[1])}>
              <path
                d="M 0 264 Q 210 252 420 264"
                stroke={bridgeGlow ? '#57CAFF' : '#94A3B8'}
                strokeWidth="5"
              />
              <path
                d="M 0 268 Q 210 256 420 268"
                stroke="#34A853"
                strokeWidth="2"
                strokeDasharray="10 8"
              />
              {/* Main H-Pylon */}
              <path d="M 218 292 L 230 144 L 239 144 L 235 292" fill="#E2E8F0" fillOpacity="0.92" />
              <path d="M 270 292 L 260 144 L 251 144 L 256 292" fill="#CBD5E1" fillOpacity="0.92" />
              <rect x="232" y="162" width="26" height="8" rx="2" fill="#4285F4" />
              <rect x="228" y="216" width="34" height="6" rx="2" fill="#F9AB00" />
              {/* Secondary Pylon */}
              <path d="M 332 280 L 339 194 L 344 194 L 341 280" fill="#94A3B8" />
              <path d="M 364 280 L 358 194 L 353 194 L 356 280" fill="#94A3B8" />
              <rect x="340" y="206" width="17" height="5" rx="1.5" fill="#EA4335" />
              {/* Harp Stay Cables */}
              {[150, 175, 200, 290, 315, 340, 365].map((deckX, i) => (
                <motion.line
                  key={deckX}
                  x1={i < 3 ? 234 : 256}
                  y1={152 + (i % 3) * 14}
                  x2={deckX}
                  y2={259}
                  stroke={
                    bridgeGlow
                      ? ['#4285F4', '#34A853', '#F9AB00', '#EA4335'][i % 4]
                      : 'rgba(255,255,255,0.4)'
                  }
                  strokeWidth={bridgeGlow ? '1.6' : '1'}
                  animate={bridgeGlow ? { opacity: [0.45, 1, 0.45] } : { opacity: 0.5 }}
                  transition={{ duration: 2.2, delay: i * 0.16, repeat: Infinity }}
                />
              ))}
            </g>

            {/* River Water */}
            <g className="cursor-pointer" onClick={() => handleHotspotClick(HOTSPOTS[2])}>
              <rect x="0" y="270" width="420" height="180" fill="#0B1933" />
              <motion.path
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                d="M -20 300 Q 70 286 150 302 T 310 300 T 440 296"
                stroke="#4285F4"
                strokeWidth="3"
                strokeOpacity="0.8"
              />
              <motion.path
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                d="M -20 332 Q 90 348 190 330 T 350 338 T 450 330"
                stroke="#34A853"
                strokeWidth="3"
                strokeOpacity="0.75"
              />
              <motion.path
                animate={{ x: [0, 12, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
                d="M -10 364 Q 110 350 210 366 T 430 362"
                stroke="#F9AB00"
                strokeWidth="2.5"
                strokeDasharray="12 10"
                strokeOpacity="0.75"
              />
              <path d="M 218 292 L 270 292 L 280 385 L 208 385 Z" fill="url(#waterRef)" fillOpacity="0.12" />

              <g key={rippleCount}>
                <circle
                  cx="200"
                  cy="352"
                  r="16"
                  stroke="#57CAFF"
                  strokeWidth="2"
                  className="animate-ripple"
                  style={{ transformOrigin: '200px 352px' }}
                />
              </g>
            </g>

            {/* Wooden Builder Boat */}
            <motion.g
              animate={{ y: [0, -4, 0], rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '104px', originY: '332px' }}
              className="cursor-pointer"
              onClick={() => handleHotspotClick(HOTSPOTS[3])}
            >
              <path
                d="M 54 328 Q 104 352 154 326 L 143 342 Q 104 356 65 342 Z"
                fill="#C84B31"
                stroke="#FFE7A5"
                strokeWidth="1.4"
              />
              <circle cx="96" cy="303" r="7.5" fill="#FFE7A5" />
              <path d="M 84 328 C 84 315 108 315 108 328 Z" fill="#4285F4" />
              <path d="M 106 325 L 125 325 L 130 311 L 111 311 Z" fill="#57CAFF" />
            </motion.g>

            <text
              x="210"
              y="428"
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              letterSpacing="1.5"
            >
              TAP TRACK HOTSPOTS TO EXPLORE
            </text>
          </svg>

          {/* Pulsing Track Hotspots */}
          {HOTSPOTS.map((h) => {
            const isSelected = h.id === activeId;
            return (
              <button
                key={h.id}
                onClick={() => handleHotspotClick(h)}
                style={{ left: h.x, top: h.y }}
                aria-label={h.label}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: h.color }}
                />
                <span
                  className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-lg transition-transform ${
                    isSelected ? 'scale-125' : 'group-hover:scale-110'
                  }`}
                  style={{ backgroundColor: h.color }}
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Hotspot Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHotspot.id}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="mt-3 sm:mt-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-4 py-3 text-white shadow-xl"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: activeHotspot.color }}
              />
              <span className="font-display font-bold text-sm">{activeHotspot.title}</span>
            </div>
            <span className="inline-flex items-center gap-1 font-mono-dev text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#FFE7A5]">
              <Sparkles className="w-2.5 h-2.5" />
              {activeHotspot.label}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{activeHotspot.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
