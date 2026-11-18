import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Shuffle, Camera, Hand } from 'lucide-react';
import { POLAROID_MEMORIES } from '../data/devfestData';

interface CardPose {
  x: number;
  y: number;
  rotate: number;
  z: number;
}

export default function PolaroidTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const topZRef = useRef(10);
  const [dealKey, setDealKey] = useState(0);
  const [poses, setPoses] = useState<Record<string, CardPose>>(() => {
    const initial: Record<string, CardPose> = {};
    POLAROID_MEMORIES.forEach((m, i) => {
      initial[m.id] = {
        x: m.initialX,
        y: m.initialY,
        rotate: m.initialRotate,
        z: i + 1,
      };
    });
    return initial;
  });

  const bringToFront = (id: string) => {
    topZRef.current += 1;
    const nextZ = topZRef.current;
    setPoses((curr) => ({
      ...curr,
      [id]: { ...curr[id], z: nextZ },
    }));
  };

  const handleDealAgain = () => {
    const nextPoses: Record<string, CardPose> = {};
    POLAROID_MEMORIES.forEach((m, i) => {
      const spreadX = (i - 1.5) * 125 + (Math.random() * 44 - 22);
      const spreadY = Math.random() * 70 - 35;
      const rot = Math.random() * 24 - 12;
      nextPoses[m.id] = {
        x: Math.round(spreadX),
        y: Math.round(spreadY),
        rotate: Math.round(rot),
        z: i + 1,
      };
    });
    setPoses(nextPoses);
    setDealKey((k) => k + 1);
  };

  return (
    <section id="moments" className="py-20 sm:py-28 bg-[#FAF9F6] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-dev text-xs uppercase tracking-widest text-[#C84B31] font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>{'{ Community & Swag Board }'}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950">
              Grab, flick &amp;{' '}
              <span className="font-editorial italic font-normal text-[#4285F4]">
                shuffle the board.
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Drag and toss official DevFest ’26 brand artwork, sticker previews, and Prayagraj host
              city Polaroids across the table.
            </p>
          </div>

          <button
            onClick={handleDealAgain}
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-full bg-slate-950 hover:bg-[#4285F4] text-white font-semibold px-5 py-3 text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            Deal Again
          </button>
        </div>

        {/* Desktop Interactive Physics Tabletop */}
        <div
          ref={tableRef}
          className="relative hidden md:flex items-center justify-center rounded-[36px] border-2 border-dashed border-amber-300/90 bg-dot-table h-[480px] overflow-hidden shadow-inner"
        >
          <div className="pointer-events-none absolute top-4 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 border border-amber-200 px-3.5 py-1.5 font-mono-dev text-[11px] text-amber-900 shadow-sm">
            <Hand className="w-3.5 h-3.5 text-[#EA4335]" />
            Drag &amp; toss any Polaroid card
          </div>

          {POLAROID_MEMORIES.map((item) => {
            const pose = poses[item.id];
            return (
              <motion.div
                key={`${item.id}-${dealKey}`}
                drag
                dragConstraints={tableRef}
                dragElastic={0.18}
                dragMomentum={true}
                onPointerDown={() => bringToFront(item.id)}
                initial={{ opacity: 0, scale: 0.7, x: 0, y: 120, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: pose.x,
                  y: pose.y,
                  rotate: pose.rotate,
                }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.09, cursor: 'grabbing' }}
                transition={{ type: 'spring', stiffness: 210, damping: 20 }}
                style={{ zIndex: pose.z }}
                className="absolute w-[250px] lg:w-[270px] rounded-xl bg-white p-3 pb-5 shadow-[0_18px_40px_rgba(15,23,42,0.18)] border border-slate-200 cursor-grab select-none"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <span
                    className="absolute top-2 left-2 font-mono-dev text-[9px] font-bold uppercase px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="mt-3 px-1">
                  <p className="font-editorial italic text-base text-slate-800 leading-snug">
                    {item.caption}
                  </p>
                  <div className="font-mono-dev text-[10px] text-slate-400 mt-2 tracking-wider">
                    {item.date}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Touch-Friendly Swipe Deck */}
        <div className="md:hidden rounded-[28px] border-2 border-dashed border-amber-300/90 bg-dot-table p-4">
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar">
            {POLAROID_MEMORIES.map((item, i) => (
              <motion.div
                key={`${item.id}-m-${dealKey}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                className="snap-center shrink-0 w-[260px] rounded-xl bg-white p-3 pb-5 shadow-lg border border-slate-200"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                  <span
                    className="absolute top-2 left-2 font-mono-dev text-[9px] font-bold uppercase px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="font-editorial italic text-base text-slate-800 leading-snug mt-3">
                  {item.caption}
                </p>
                <div className="font-mono-dev text-[10px] text-slate-400 mt-1.5">{item.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
