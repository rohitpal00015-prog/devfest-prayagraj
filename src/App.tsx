import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'motion/react';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutAndTracks from './components/AboutAndTracks';
import ScheduleSection from './components/ScheduleSection';
import SpeakersSection from './components/SpeakersSection';
import BadgeStudio from './components/BadgeStudio';
import GallerySection from './components/GallerySection';
import PolaroidTable from './components/PolaroidTable';
import CommunityAndFooter from './components/CommunityAndFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -76, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onComplete={() => ScrollTrigger.refresh()} />

      <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#FAF9F6] text-slate-950 selection:bg-[#FFE7A5] selection:text-slate-950">
        <Navbar
          onOpenRegister={() => setRegisterOpen(true)}
          scrollToSection={scrollToSection}
        />

        <main>
          <Hero
            onOpenRegister={() => setRegisterOpen(true)}
            scrollToSection={scrollToSection}
          />
          <AboutAndTracks scrollToSection={scrollToSection} />
          <ScheduleSection />
          <SpeakersSection />
          <BadgeStudio />
          <GallerySection />
          <PolaroidTable />
        </main>

        <CommunityAndFooter
          onOpenRegister={() => setRegisterOpen(true)}
          registerOpen={registerOpen}
          onCloseRegister={() => setRegisterOpen(false)}
          scrollToSection={scrollToSection}
        />
      </div>
    </MotionConfig>
  );
}
