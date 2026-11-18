import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Download, Copy, Check, Upload, Sparkles, IdCard, CircleUserRound } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type BadgeThemeKey = 'naini' | 'light' | 'gold';
type BadgeMode = 'lanyard' | 'avatar';

const ROLES = ['Attendee', 'Speaker', 'Organizer', 'Volunteer', 'Student'] as const;
const TRACK_COLORS = [
  { name: 'AI Blue', hex: '#4285F4', tag: 'AI TRACK' },
  { name: 'Cloud Red', hex: '#EA4335', tag: 'CLOUD TRACK' },
  { name: 'Web Yellow', hex: '#F9AB00', tag: 'WEB TRACK' },
  { name: 'Build Green', hex: '#34A853', tag: 'BUILD TRACK' },
];
const CAMPUS_CHIPS = ['MNNIT Allahabad', 'IIIT-Allahabad', 'Univ. of Allahabad', 'GDG Prayagraj'];

const THEMES: Record<
  BadgeThemeKey,
  {
    name: string;
    subtitle: string;
    bg: string;
    text: string;
    muted: string;
    canvasTop: string;
    canvasBottom: string;
  }
> = {
  naini: {
    name: 'Midnight',
    subtitle: 'Dark Holographic',
    bg: 'from-[#0B0F1A] via-[#132042] to-[#0B1224]',
    text: 'text-white',
    muted: 'text-slate-300',
    canvasTop: '#0B0F1A',
    canvasBottom: '#132042',
  },
  light: {
    name: 'DevFest Light',
    subtitle: 'Clean Parchment',
    bg: 'from-[#FAF9F6] via-[#FFF8E7] to-[#E6F4FE]',
    text: 'text-slate-950',
    muted: 'text-slate-600',
    canvasTop: '#FAF9F6',
    canvasBottom: '#E6F4FE',
  },
  gold: {
    name: 'Festive Gold',
    subtitle: 'Heritage Accent',
    bg: 'from-[#2A140E] via-[#4A1F14] to-[#1D0F0B]',
    text: 'text-[#FFF7E6]',
    muted: 'text-[#FFE7A5]/80',
    canvasTop: '#2A140E',
    canvasBottom: '#4A1F14',
  },
};

export default function BadgeStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState('Aarav Tiwari');
  const [org, setOrg] = useState('MNNIT Allahabad');
  const [role, setRole] = useState<(typeof ROLES)[number]>('Attendee');
  const [trackIdx, setTrackIdx] = useState(0);
  const [themeKey, setThemeKey] = useState<BadgeThemeKey>('naini');
  const [mode, setMode] = useState<BadgeMode>('lanyard');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.badge-studio-anim', {
        y: 28,
        duration: 0.7,
        stagger: 0.12,
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

  const track = TRACK_COLORS[trackIdx];
  const theme = THEMES[themeKey];

  const initials = (name.trim() || 'DP')
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadPng = async () => {
    const canvas = document.createElement('canvas');
    const isAvatar = mode === 'avatar';
    canvas.width = 1080;
    canvas.height = isAvatar ? 1080 : 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, theme.canvasTop);
    grad.addColorStop(1, theme.canvasBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stripeColors = ['#4285F4', '#EA4335', '#F9AB00', '#34A853'];
    stripeColors.forEach((c, idx) => {
      ctx.fillStyle = c;
      ctx.fillRect((canvas.width / 4) * idx, 0, canvas.width / 4 + 1, 22);
    });

    const isLight = themeKey === 'light';
    const primaryText = isLight ? '#0F172A' : '#FFFFFF';
    const secondaryText = isLight ? '#475569' : '#CBD5E1';
    const cx = canvas.width / 2;

    ctx.fillStyle = track.hex;
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DEVFEST PRAYAGRAJ ’26', cx, 118);

    const cy = isAvatar ? 430 : 470;
    const radius = isAvatar ? 210 : 195;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 14, 0, Math.PI * 2);
    ctx.strokeStyle = track.hex;
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    if (photoUrl) {
      const img = new Image();
      img.src = photoUrl;
      await new Promise((res) => {
        img.onload = res;
        img.onerror = res;
      });
      const scale = Math.max((radius * 2) / img.width, (radius * 2) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    } else {
      ctx.fillStyle = '#0B0F1A';
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 140px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initials, cx, cy);
    }
    ctx.restore();

    const pillY = cy + radius + 54;
    ctx.fillStyle = track.hex;
    ctx.beginPath();
    ctx.roundRect(cx - 170, pillY - 32, 340, 64, 32);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(role.toUpperCase(), cx, pillY);

    ctx.fillStyle = primaryText;
    ctx.font = 'bold 74px "Space Grotesk", sans-serif';
    ctx.fillText(name || 'DevFest Builder', cx, pillY + 125);

    ctx.fillStyle = secondaryText;
    ctx.font = '500 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(org || 'GDG Prayagraj', cx, pillY + 190);

    ctx.fillStyle = secondaryText;
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillText(`DEC 12, 2026  ·  ${track.tag}  ·  #DevFestPrayagraj`, cx, canvas.height - 62);

    const link = document.createElement('a');
    link.download = `devfest-prayagraj-26-${(name || 'badge').toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#4285F4', '#EA4335', '#F9AB00', '#34A853'],
    });
  };

  const handleCopyCaption = async () => {
    const caption = `Excited to join #DevFestPrayagraj26 as a ${role} (${track.tag})! Looking forward to a full day of AI, Google Cloud, Web & Community with @GDGPrayagraj on Dec 12, 2026! 🚀 #DevFest #GDG`;
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="badge"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#0B0F1A] text-white relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-draft-grid-dark opacity-45" />
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[280px] sm:w-[520px] h-[280px] sm:h-[520px] rounded-full bg-[#4285F4]/15 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="badge-studio-anim flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#57CAFF] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{'{ Holographic Badge Studio }'}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight">
              Mint your{' '}
              <span className="font-editorial italic font-normal text-[#FFD427]">
                DevFest ’26 Pass.
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              Personalize your DevFest Prayagraj ’26 lanyard or social avatar right in your browser
              and download a crisp PNG in 1 click.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-white/10 border border-white/15 p-1.5 self-start lg:self-auto">
            <button
              onClick={() => setMode('lanyard')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                mode === 'lanyard' ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              <IdCard className="w-4 h-4" />
              Lanyard Badge
            </button>
            <button
              onClick={() => setMode('avatar')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                mode === 'avatar' ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              <CircleUserRound className="w-4 h-4" />
              1:1 Avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Controls */}
          <div className="badge-studio-anim lg:col-span-6 space-y-5 rounded-[30px] border border-white/12 bg-white/5 backdrop-blur-md p-5 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-dev text-[11px] uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  maxLength={28}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#57CAFF]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-mono-dev text-[11px] uppercase tracking-wider text-slate-300 mb-1.5">
                  Campus / Company
                </label>
                <input
                  type="text"
                  maxLength={32}
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#57CAFF]"
                  placeholder="e.g. MNNIT / IIIT-A"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {CAMPUS_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setOrg(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/8 hover:bg-white/18 border border-white/12 font-mono-dev text-[11px] text-slate-200 transition cursor-pointer"
                >
                  + {chip}
                </button>
              ))}
            </div>

            <div>
              <label className="block font-mono-dev text-[11px] uppercase tracking-wider text-slate-300 mb-2">
                Select Role
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      role === r
                        ? 'bg-[#F9AB00] text-slate-950'
                        : 'bg-white/8 text-slate-200 border border-white/12 hover:bg-white/15'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono-dev text-[11px] uppercase tracking-wider text-slate-300 mb-2">
                Badge Theme
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(Object.keys(THEMES) as BadgeThemeKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setThemeKey(key)}
                    className={`rounded-2xl p-3 text-left border transition cursor-pointer ${
                      themeKey === key
                        ? 'border-[#57CAFF] bg-white/15'
                        : 'border-white/12 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-display font-bold text-xs sm:text-sm text-white">
                      {THEMES[key].name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{THEMES[key].subtitle}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div>
                <div className="font-mono-dev text-[11px] uppercase tracking-wider text-slate-300 mb-2">
                  Track Color
                </div>
                <div className="flex items-center gap-2.5">
                  {TRACK_COLORS.map((tc, i) => (
                    <button
                      key={tc.name}
                      onClick={() => setTrackIdx(i)}
                      aria-label={tc.name}
                      className={`w-8 h-8 rounded-full border-2 transition cursor-pointer ${
                        trackIdx === i ? 'border-white scale-115' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: tc.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#57CAFF]" />
                  {photoUrl ? 'Change Photo' : 'Upload Photo'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
              <button
                onClick={handleDownloadPng}
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 rounded-full bg-[#4285F4] hover:bg-[#57CAFF] hover:text-slate-950 text-white font-semibold px-5 py-3.5 text-sm transition active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download High-Res PNG
              </button>
              <button
                onClick={handleCopyCaption}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-5 py-3.5 text-sm transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#5CDB6D]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Share Post
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Holographic Preview */}
          <div className="badge-studio-anim lg:col-span-6 flex flex-col items-center justify-center">
            {mode === 'lanyard' && (
              <div className="w-16 h-6 rounded-t-xl bg-slate-700 border border-slate-500 flex items-center justify-center -mb-2 z-20 shadow-md">
                <div className="w-8 h-1.5 rounded-full bg-slate-950" />
              </div>
            )}

            <motion.div
              layout
              whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`relative w-full ${
                mode === 'avatar'
                  ? 'max-w-[360px] aspect-square rounded-[36px]'
                  : 'max-w-[360px] aspect-[3/4] rounded-[32px]'
              } bg-gradient-to-br ${theme.bg} ${theme.text} shadow-[0_30px_90px_rgba(0,0,0,0.65)] border border-white/20 overflow-hidden flex flex-col justify-between p-6`}
            >
              <div className="pointer-events-none absolute inset-0 holo-sheen opacity-65" />

              <div className="absolute top-0 left-0 right-0 google-bar h-2 rounded-none">
                <span className="bg-[#4285F4]" />
                <span className="bg-[#EA4335]" />
                <span className="bg-[#F9AB00]" />
                <span className="bg-[#34A853]" />
              </div>

              <div className="relative z-10 flex items-center justify-between pt-2">
                <div>
                  <div className="font-display font-bold text-sm tracking-tight">
                    DEVFEST PRAYAGRAJ ’26
                  </div>
                  <div className="font-mono-dev text-[10px] opacity-75">GDG PRAYAGRAJ</div>
                </div>
                <span
                  className="font-mono-dev text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: track.hex }}
                >
                  {track.tag.split(' ')[0]}
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 shadow-xl mb-4"
                  style={{ backgroundColor: track.hex }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0B0F1A] flex items-center justify-center">
                    {photoUrl ? (
                      <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display font-bold text-4xl text-white">{initials}</span>
                    )}
                  </div>
                </div>

                <span
                  className="font-mono-dev text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full text-white mb-2.5"
                  style={{ backgroundColor: track.hex }}
                >
                  {role}
                </span>

                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
                  {name || 'DevFest Builder'}
                </h3>
                <p className={`text-xs sm:text-sm font-medium mt-1 ${theme.muted}`}>
                  {org || 'GDG Prayagraj'}
                </p>
              </div>

              <div className="relative z-10 pt-3 border-t border-current/15 flex items-center justify-between font-mono-dev text-[10px] uppercase tracking-wider opacity-80">
                <span>DEC 12, 2026</span>
                <span>#DevFestPrayagraj</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
