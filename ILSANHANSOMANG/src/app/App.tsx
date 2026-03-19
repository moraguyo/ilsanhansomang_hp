import { useState, useEffect, useRef } from 'react';
import LoadingPage from './components/LoadingPage';
import HeroSection from './components/HeroSection';
import VisionMissionSection from './components/VisionMissionSection';
import MessageSection from './components/MessageSection';
import WorshipInfoSection from './components/WorshipInfoSection';
import GlobeMissionSection from './components/GlobeMissionSection';
import MinistrySection from './components/MinistrySection';
import GallerySection from './components/GallerySection';
import MissionSection from './components/MissionSection';
import Footer from './components/Footer';

/* ─────────────────────────────────────────────────────────
   CardStackSection
   ─ MessageSection을 자연스럽게 스크롤한 뒤
     WorshipInfoSection이 카드처럼 위로 올라오는 효과
───────────────────────────────────────────────────────── */
function CardStackSection() {
  const msgRef = useRef<HTMLDivElement>(null);

  const [coverScale, setCoverScale] = useState(1);
  const [coverDim,   setCoverDim]   = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!msgRef.current) return;

      const msgRect = msgRef.current.getBoundingClientRect();
      const viewH   = window.innerHeight;

      // MessageSection의 bottom이 뷰포트 하단에 가까워질수록 scale-down + dim
      // msgRect.bottom === viewH 일 때 progress=0, msgRect.bottom === 0 일 때 progress=1
      const rawProgress = (viewH - msgRect.bottom) / viewH;
      const progress = isFinite(rawProgress) ? Math.max(0, Math.min(1, rawProgress)) : 0;

      setCoverScale(1 - progress * 0.07);
      setCoverDim(progress * 0.45);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'relative', isolation: 'isolate' }}>

      {/* ── Card 1: MESSAGE ── 자연스럽게 스크롤, WorshipInfo가 올라올 때만 scale-down */}
      <div
        ref={msgRef}
        style={{
          position: 'relative',
          zIndex: 1,
          transformOrigin: 'top center',
          transform: `scale(${coverScale})`,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      >
        <MessageSection />

        {/* 어둠 오버레이 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: coverDim,
            pointerEvents: 'none',
            borderRadius: '64px 64px 0 0',
            transition: 'opacity 0.05s linear',
          }}
        />
      </div>

      {/* ── Card 2: WORSHIP INFO ── 바로 아래에서 위로 올라오는 카드 */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <WorshipInfoSection />
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   App
───────────────────────────────────────────────────────── */
export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    if (!loadingDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loadingDone]);

  return (
    <div className="relative">
      {/* Loading overlay */}
      {!loadingDone && (
        <LoadingPage onComplete={() => setLoadingDone(true)} />
      )}

      {/* Main site */}
      <div
        style={{
          opacity: loadingDone ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: loadingDone ? 'all' : 'none',
        }}
      >
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Vision / Mission */}
        <VisionMissionSection />

        {/* 3 + 4. Message → Worship Info  (카드 스택 스크롤) */}
        <CardStackSection />

        {/* 5. Global Mission Intro */}
        <GlobeMissionSection />

        {/* 6. Ministry Section */}
        <MinistrySection />

        {/* 7. Mission Section */}
        <MissionSection />

        {/* 8. Gallery Section */}
        <GallerySection variant="second" />

        {/* 9. Footer */}
        <Footer />
      </div>
    </div>
  );
}