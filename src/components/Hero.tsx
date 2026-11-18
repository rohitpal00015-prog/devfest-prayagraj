import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Calendar, MapPin, Ticket, IdCard, ArrowRight, Sparkles } from 'lucide-react';
import { EVENT_META, TRACKS } from '../data/devfestData';
import HeroDoodle from './HeroDoodle';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenRegister: () => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ onOpenRegister, scrollToSection }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState({ days: 24, hours: 10, mins: 42, secs: 18 });

  useEffect(() => {
    const tick = () => {
      const target = new Date(EVENT_META.targetDateISO).getTime();
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Subtle GSAP ScrollTrigger parallax on minimal-visibility Yamuna Bridge background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 16,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-[#0B0F1A] text-white pt-24 sm:pt-28 pb-20 sm:pb-28 overflow-hidden"
    >
      {/* New Yamuna Bridge Background in Minimal Visibility (GSAP Scroll Parallax) */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/media/naini-bridge.jpeg"
          className="w-full h-full object-cover opacity-[0.18] scale-105"
        >
          <source src="/media/yamuna-bridge.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/75 to-[#0B0F1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(66,133,244,0.20),transparent_55%),radial-gradient(ellipse_at_80%_75%,rgba(52,168,83,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: Clear DevFest Prayagraj '26 Identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-stagger inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-md px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
              <span className="font-mono-dev text-xs uppercase tracking-wider text-[#57CAFF] font-semibold">
                Google Developer Groups · Prayagraj
              </span>
              <span className="hidden sm:inline-block h-3.5 w-[1px] bg-white/20" />
              <span className="font-hindi text-xs sm:text-sm text-[#FFE7A5]">प्रयागराज २०२६</span>
            </div>

            <div className="hero-stagger">
              <div className="font-mono-dev text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD427]" />
                <span>Annual Developer Conference</span>
              </div>
              <h1 className="font-display font-bold tracking-tight leading-[0.94] text-[clamp(2.8rem,7.2vw,5.4rem)]">
                <span className="block text-white">DEVFEST</span>
                <span className="block bg-gradient-to-r from-[#57CAFF] via-white to-[#FFE7A5] bg-clip-text text-transparent">
                  PRAYAGRAJ{' '}
                  <span className="font-editorial italic font-normal text-[#FFD427]">’26</span>
                </span>
              </h1>
            </div>

            <div className="hero-stagger space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-editorial italic text-2xl sm:text-4xl text-white/95 tracking-wide">
                  {EVENT_META.tagline}
                  <span className="text-[#4285F4]">.</span>
                </p>
                <div className="google-bar w-24 sm:w-32 shrink-0">
                  <span className="bg-[#4285F4]" />
                  <span className="bg-[#EA4335]" />
                  <span className="bg-[#F9AB00]" />
                  <span className="bg-[#34A853]" />
                </div>
              </div>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {EVENT_META.subTagline}
              </p>
            </div>

            {/* 4 Core DevFest Pillars: AI · Cloud · Web · Build */}
            <div className="hero-stagger grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              {TRACKS.map((track) => (
                <motion.button
                  key={track.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('tracks')}
                  className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/6 backdrop-blur-md p-3 text-left transition hover:bg-white/12 cursor-pointer"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: track.color }}
                  />
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-display font-bold text-lg sm:text-xl"
                      style={{ color: track.halftone }}
                    >
                      {track.short}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight">
                    {track.title}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Event Meta & Live Countdown */}
            <div className="hero-stagger flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200 pt-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/12 px-3.5 py-2">
                <Calendar className="w-4 h-4 text-[#57CAFF]" />
                <span className="font-medium">{EVENT_META.dateDisplay}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/12 px-3.5 py-2">
                <MapPin className="w-4 h-4 text-[#FF7DAF]" />
                <span className="font-medium">{EVENT_META.venueShort}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#34A853]/15 border border-[#34A853]/35 px-3.5 py-2 font-mono-dev text-[#5CDB6D]">
                <span>{String(countdown.days).padStart(2, '0')}d</span>:
                <span>{String(countdown.hours).padStart(2, '0')}h</span>:
                <span>{String(countdown.mins).padStart(2, '0')}m</span>:
                <span>{String(countdown.secs).padStart(2, '0')}s</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="hero-stagger flex flex-wrap items-center gap-3.5 pt-2">
              <div className="rainbow-border rounded-full p-[2px]">
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B0F1A] hover:bg-[#161F36] text-white font-semibold px-6 py-3.5 text-sm sm:text-base transition cursor-pointer"
                >
                  <Ticket className="w-4 h-4 text-[#FFD427]" />
                  <span>Register Now</span>
                </button>
              </div>

              <button
                onClick={() => scrollToSection('schedule')}
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 hover:bg-[#FFE7A5] font-semibold px-5 py-3.5 text-sm sm:text-base transition active:scale-95 cursor-pointer"
              >
                <span>View Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('badge')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white font-medium px-5 py-3.5 text-sm sm:text-base transition cursor-pointer"
              >
                <IdCard className="w-4 h-4 text-[#57CAFF]" />
                <span>Create Badge</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Interactive Arched DevFest Prayagraj Visual */}
          <div className="lg:col-span-5 hero-stagger">
            <HeroDoodle />
          </div>
        </div>
      </div>

      {/* Smooth Wave Transition into Warm Parchment */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 54" className="w-full h-8 sm:h-12 fill-[#FAF9F6]" preserveAspectRatio="none">
          <path d="M0,22 C240,56 480,0 720,26 C960,52 1200,4 1440,28 L1440,54 L0,54 Z" />
        </svg>
      </div>
    </section>
  );
}
