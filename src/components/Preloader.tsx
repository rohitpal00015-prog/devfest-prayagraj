import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  forceOpenKey?: number;
}

const STAGE_LABELS = [
  { pct: 0, text: 'Departing New Yamuna Bridge...' },
  { pct: 32, text: 'Passing Prayagraj City & Civil Lines...' },
  { pct: 64, text: 'Gliding past Mandir & Sangam Ghats...' },
  { pct: 90, text: 'Arriving at Triveni Sangam · प्रयागराज!' },
];

export default function Preloader({ onComplete, forceOpenKey = 0 }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setVisible(true);
    setProgress(0);

    const start = performance.now();
    const duration = 2600;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / duration);
      // Smooth easeInOutCubic
      const eased = ratio < 0.5 ? 4 * ratio * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 3) / 2;
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 280);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete, forceOpenKey]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  const currentStage =
    [...STAGE_LABELS].reverse().find((s) => progress >= s.pct) ?? STAGE_LABELS[0];

  // Boat moves along river x from 72 to 650 inside viewBox 0..760
  const boatX = 72 + (progress / 100) * 578;
  const boatBob = Math.sin((progress / 100) * Math.PI * 8) * 3.5;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -28, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070B14] px-4 sm:px-6 text-white overflow-hidden"
        >
          {/* Ambient twilight glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(66,133,244,0.22),transparent_55%),radial-gradient(ellipse_at_60%_35%,rgba(249,171,0,0.16),transparent_50%),radial-gradient(ellipse_at_85%_60%,rgba(52,168,83,0.18),transparent_50%)]" />

          {/* Top Hindi & Brand Header */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 font-hindi text-base sm:text-lg text-[#FFE7A5] tracking-wide mb-1.5"
          >
            प्रणाम गुरु · संगम नगरी, प्रयागराज
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative z-10 font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-5 sm:mb-7"
          >
            DEVFEST <span className="text-[#57CAFF]">PRAYAGRAJ</span>{' '}
            <span className="font-editorial italic font-normal text-[#FFD427]">’26</span>
          </motion.h2>

          {/* Panoramic Illustrated Skeleton: Yamuna Bridge -> City -> Temple -> Sangam Boat Voyage */}
          <div className="relative z-10 w-full max-w-3xl rounded-[28px] border border-white/12 bg-[#0C1326]/90 backdrop-blur-xl p-3 sm:p-5 shadow-[0_25px_90px_rgba(0,0,0,0.65)]">
            <svg
              viewBox="0 0 760 250"
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="preSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A1124" />
                  <stop offset="65%" stopColor="#142347" />
                  <stop offset="100%" stopColor="#1D2F5A" />
                </linearGradient>
                <linearGradient id="preRiver" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0C2247" />
                  <stop offset="55%" stopColor="#0E345A" />
                  <stop offset="100%" stopColor="#0B3B3C" />
                </linearGradient>
                <radialGradient id="templeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFD427" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#EA4335" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="sangamHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#57CAFF" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="#5CDB6D" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#5CDB6D" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Sky Backdrop */}
              <rect x="0" y="0" width="760" height="162" rx="18" fill="url(#preSky)" />

              {/* Twinkling Stars */}
              {[
                [55, 28],
                [140, 22],
                [260, 34],
                [395, 19],
                [520, 26],
                [645, 22],
                [710, 38],
              ].map(([sx, sy], i) => (
                <circle
                  key={i}
                  cx={sx}
                  cy={sy}
                  r={i % 2 === 0 ? 1.6 : 1.1}
                  fill="#FFE7A5"
                  opacity={0.75}
                />
              ))}

              {/* 1. LEFT: NEW YAMUNA CABLE-STAYED BRIDGE */}
              <g>
                {/* Bridge Deck */}
                <path d="M 0 144 Q 105 135 215 148" stroke="#57CAFF" strokeWidth="3.5" />
                <path
                  d="M 0 147 Q 105 138 215 151"
                  stroke="#34A853"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                />
                {/* Main H-Pylon */}
                <path d="M 74 166 L 83 56 L 89 56 L 85 166" fill="#E2E8F0" />
                <path d="M 114 166 L 106 56 L 100 56 L 104 166" fill="#CBD5E1" />
                <rect x="84" y="70" width="21" height="6" rx="1.5" fill="#4285F4" />
                <rect x="81" y="108" width="27" height="5" rx="1.5" fill="#F9AB00" />
                {/* Glowing Harp Cables */}
                {[22, 42, 60, 128, 150, 174, 196].map((xEnd, i) => (
                  <line
                    key={xEnd}
                    x1={i < 3 ? 85 : 103}
                    y1={64 + (i % 3) * 11}
                    x2={xEnd}
                    y2={143}
                    stroke={['#4285F4', '#34A853', '#F9AB00', '#EA4335'][i % 4]}
                    strokeWidth="1.2"
                    strokeOpacity="0.85"
                  />
                ))}
                <text
                  x="94"
                  y="44"
                  textAnchor="middle"
                  fill="#57CAFF"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  YAMUNA BRIDGE
                </text>
              </g>

              {/* 2. MIDDLE-LEFT: BAGAL ME SHAHER (PRAYAGRAJ CITY SKYLINE) */}
              <g>
                {/* City buildings silhouette */}
                <rect x="228" y="114" width="26" height="48" rx="2" fill="#1E2E52" stroke="#57CAFF" strokeOpacity="0.25" />
                <rect x="258" y="96" width="30" height="66" rx="2" fill="#24365E" stroke="#57CAFF" strokeOpacity="0.3" />
                {/* Cathedral / Heritage Dome */}
                <path d="M 294 162 L 294 118 L 309 98 L 324 118 L 324 162 Z" fill="#1F3159" stroke="#FFE7A5" strokeOpacity="0.35" />
                <rect x="330" y="106" width="26" height="56" rx="2" fill="#1A294B" />
                <rect x="360" y="122" width="32" height="40" rx="2" fill="#23355C" />
                <rect x="396" y="110" width="22" height="52" rx="2" fill="#1D2E52" />

                {/* Glowing City Windows */}
                {[
                  [235, 124], [244, 124], [235, 136], [244, 136],
                  [265, 106], [276, 106], [265, 118], [276, 118], [265, 130], [276, 130],
                  [337, 116], [346, 116], [337, 128], [346, 128],
                  [368, 132], [379, 132], [403, 122], [403, 134],
                ].map(([wx, wy], i) => (
                  <rect
                    key={i}
                    x={wx}
                    y={wy}
                    width="4"
                    height="5"
                    rx="0.8"
                    fill={i % 3 === 0 ? '#FFD427' : '#57CAFF'}
                    opacity={0.85}
                  />
                ))}
                <text
                  x="315"
                  y="86"
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  SHAHER · PRAYAGRAJ
                </text>
              </g>

              {/* 3. MIDDLE-RIGHT: BAGAL ME MANDIR (SHANKAR VIMAN MANDAPAM & GHATS) */}
              <g>
                <circle cx="496" cy="112" r="56" fill="url(#templeGlow)" />
                {/* Fort & Ghat Wall */}
                <path
                  d="M 432 162 L 432 138 L 560 138 L 560 162 Z"
                  fill="#2B1D24"
                  stroke="#E8A838"
                  strokeOpacity="0.45"
                />
                {/* Multi-tiered Glowing Temple Shikhara */}
                <path d="M 464 138 L 474 114 L 518 114 L 528 138 Z" fill="#C84B31" stroke="#FFD427" strokeWidth="1.2" />
                <path d="M 474 114 L 482 93 L 510 93 L 518 114 Z" fill="#E8A838" stroke="#FFE7A5" strokeWidth="1.2" />
                <path d="M 484 93 L 496 64 L 508 93 Z" fill="#FFD427" stroke="#FFFFFF" strokeWidth="1" />
                {/* Temple Dhwaj / Kalash */}
                <line x1="496" y1="64" x2="496" y2="52" stroke="#FFE7A5" strokeWidth="1.6" />
                <path d="M 496 52 L 508 56 L 496 60 Z" fill="#EA4335" />
                {/* Ghat Steps & Tiny Diyas */}
                {[445, 468, 496, 524, 546].map((dx, i) => (
                  <circle key={i} cx={dx} cy="148" r="2.2" fill="#FFD427" />
                ))}
                <text
                  x="496"
                  y="44"
                  textAnchor="middle"
                  fill="#FFE7A5"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  MANDIR &amp; GHATS
                </text>
              </g>

              {/* 4. RIGHT: TRIVENI SANGAM CONFLUENCE */}
              <g>
                <circle cx="672" cy="176" r="56" fill="url(#sangamHalo)" />
                <text
                  x="672"
                  y="112"
                  textAnchor="middle"
                  fill="#5CDB6D"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  ★ TRIVENI SANGAM
                </text>
              </g>

              {/* RIVER WATER LAYER */}
              <rect x="0" y="160" width="760" height="88" rx="14" fill="url(#preRiver)" />

              {/* 3 Converging River Currents */}
              <path
                d="M 10 184 Q 200 174 380 186 T 672 198 T 752 196"
                stroke="#4285F4"
                strokeWidth="3"
                strokeOpacity="0.7"
              />
              <path
                d="M 10 218 Q 220 228 410 212 T 672 198 T 752 204"
                stroke="#34A853"
                strokeWidth="3"
                strokeOpacity="0.75"
              />
              <path
                d="M 10 202 Q 260 194 460 202 T 672 198"
                stroke="#F9AB00"
                strokeWidth="2"
                strokeDasharray="8 8"
                strokeOpacity="0.8"
              />

              {/* Glowing Boat Wake Trail Behind Boat */}
              <line
                x1="56"
                y1="196"
                x2={boatX - 24}
                y2="196"
                stroke="#57CAFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />

              {/* Sangam Destination Ripple */}
              <circle
                cx="672"
                cy="198"
                r={progress > 82 ? 22 : 10}
                stroke="#FFD427"
                strokeWidth="1.8"
                strokeOpacity={progress > 82 ? 0.9 : 0.35}
              />

              {/* TRAVELING WOODEN SANGAM BOAT */}
              <g transform={`translate(${boatX}, ${190 + boatBob})`}>
                {/* Boat Shadow on water */}
                <ellipse cx="0" cy="14" rx="34" ry="5" fill="#000" fillOpacity="0.35" />
                {/* Wooden Hull */}
                <path
                  d="M -34 2 Q 0 18 36 0 L 28 11 Q 0 21 -26 11 Z"
                  fill="#C84B31"
                  stroke="#FFE7A5"
                  strokeWidth="1.4"
                />
                {/* Rowing Oar */}
                <line
                  x1="-4"
                  y1="6"
                  x2={-16 + Math.sin(progress * 0.4) * 6}
                  y2="20"
                  stroke="#E8A838"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Boatman / Builder Silhouette with Laptop */}
                <circle cx="-6" cy="-14" r="5" fill="#FFE7A5" />
                <path d="M -14 2 C -14 -8 2 -8 2 2 Z" fill="#4285F4" />
                {/* Glowing Laptop */}
                <path d="M 3 0 L 16 0 L 19 -9 L 7 -9 Z" fill="#57CAFF" />
                {/* Warm Front Diya Lantern */}
                <circle cx="29" cy="-4" r="4" fill="#FFD427" />
                <circle cx="29" cy="-4" r="10" fill="#FFD427" fillOpacity="0.28" />
              </g>
            </svg>

            {/* Bottom Live Progress Bar & Milestone Readout */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2 font-mono-dev text-[11px] sm:text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#5CDB6D] animate-pulse shrink-0" />
                <span>{currentStage.text}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 sm:w-44 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4285F4] via-[#F9AB00] to-[#34A853]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="font-mono-dev text-xs font-bold text-[#FFE7A5] w-9 text-right">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 font-mono-dev text-xs text-slate-200 hover:bg-white/18 hover:text-white transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD427]" />
            Skip Voyage
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
