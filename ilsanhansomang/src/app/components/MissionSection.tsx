import { useRef, useEffect, useState, useCallback } from 'react';
import globeImg    from "figma:asset/c2c8d4ec49410753a661426ea479b46197dec0f2.png";
import missionImg1 from "figma:asset/13fcfe4a423320304c375613681f9ece08692553.png";
import missionImg2 from "figma:asset/b31b4ef018cc5abfcc9d24855b3ec760b609a26d.png";
import missionImg3 from "figma:asset/26d20063ef5b8340954172ff327de7988411f6e4.png";
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const fontKR    = "'Noto Sans KR', 'Wanted Sans', sans-serif";
const fontSerif = "'Playfair Display', Georgia, serif";

const categories = ['국내선교', '해외선교', '파송선교사소식', '중보기도', '디아코니아'];

const cards = [
  { name: '국내선교',       sub: 'Domestic Mission',    image: missionImg2 },
  { name: '해외선교',       sub: 'Overseas Mission',     image: missionImg3 },
  { name: '파송선교사소식',  sub: 'Missionary News',      image: missionImg1 },
  { name: '중보기도',       sub: 'Intercessory Prayer',  image: missionImg2 },
  { name: '디아코니아',     sub: 'Diakonia',             image: missionImg3 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));

/*
  데스크톱 슬롯 transform
  카드 너비 = clamp(190px, 22vw, 300px), 절반 = clamp(95px, 11vw, 150px)
*/
function getSlotTransformDesktop(offset: number): string {
  if (offset === 0)
    return 'translateX(calc(50vw - clamp(95px, 11vw, 150px))) translateY(-50%) perspective(1200px) rotateY(0deg) scale(1)';
  if (offset === -1)
    return 'translateX(-8vw) translateY(-50%) perspective(1200px) rotateY(25deg) scale(0.88)';
  if (offset === 1)
    return 'translateX(calc(100vw - 14vw)) translateY(-50%) perspective(1200px) rotateY(-25deg) scale(0.88)';
  if (offset < 0)
    return 'translateX(-120vw) translateY(-50%) perspective(1200px) rotateY(25deg) scale(0.88)';
  return 'translateX(220vw) translateY(-50%) perspective(1200px) rotateY(-25deg) scale(0.88)';
}

/*
  모바일 슬롯 transform
  카드 너비 = clamp(190px, 72vw, 260px) — 화면 대부분 차지
  사이드 카드는 완전히 화면 밖으로 숨김
*/
function getSlotTransformMobile(offset: number): string {
  if (offset === 0)
    return 'translateX(calc(50vw - clamp(130px, 40vw, 160px))) translateY(-50%) perspective(1200px) rotateY(0deg) scale(1)';
  // 사이드 카드는 완전히 화면 밖으로 숨김
  if (offset < 0)
    return 'translateX(-200vw) translateY(-50%) perspective(1200px) rotateY(0deg) scale(0.88)';
  return 'translateX(200vw) translateY(-50%) perspective(1200px) rotateY(0deg) scale(0.88)';
}

/*
  태블릿 슬롯 transform
  카드 너비 = clamp(190px, 32vw, 280px)
*/
function getSlotTransformTablet(offset: number): string {
  if (offset === 0)
    return 'translateX(calc(50vw - clamp(95px, 16vw, 140px))) translateY(-50%) perspective(1200px) rotateY(0deg) scale(1)';
  if (offset === -1)
    return 'translateX(-5vw) translateY(-50%) perspective(1200px) rotateY(22deg) scale(0.88)';
  if (offset === 1)
    return 'translateX(calc(100vw - 12vw)) translateY(-50%) perspective(1200px) rotateY(-22deg) scale(0.88)';
  if (offset < 0)
    return 'translateX(-130vw) translateY(-50%) perspective(1200px) rotateY(22deg) scale(0.88)';
  return 'translateX(230vw) translateY(-50%) perspective(1200px) rotateY(-22deg) scale(0.88)';
}

export default function MissionSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useBreakpoint();
  const [progress, setProgress]       = useState(0);
  const [currentCat, setCurrentCat]   = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect    = wrapperRef.current.getBoundingClientRect();
      const total   = wrapperRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const GLOBE_FREEZE  = 0.72;
  const globeScale    = progress <= GLOBE_FREEZE ? lerp(3, 15, progress / GLOBE_FREEZE) : 15;
  const globeTopPct   = lerp(50, 88, Math.min(1, progress / GLOBE_FREEZE));
  const contentAlpha  = Math.max(0, Math.min(1, (progress - 0.48) / 0.25));

  const navigate = useCallback((dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentCat(c => (c + dir + cards.length) % cards.length);
    setTimeout(() => setIsAnimating(false), 520);
  }, [isAnimating]);

  /* 카드 크기 */
  const cardW = isMobile
    ? 'clamp(190px, 72vw, 260px)'
    : isTablet
      ? 'clamp(190px, 32vw, 280px)'
      : 'clamp(190px, 22vw, 300px)';

  const getSlotTransform = isMobile
    ? getSlotTransformMobile
    : isTablet
      ? getSlotTransformTablet
      : getSlotTransformDesktop;

  return (
    <div ref={wrapperRef} style={{ height: '350vh', position: 'relative' }}>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}>

        {/* 지구본 */}
        <div style={{
          position: 'absolute',
          top: `${globeTopPct}%`,
          left: '50%',
          transform: `translate(-50%, -50%) scale(${globeScale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.08s linear, top 0.08s linear',
          width: isMobile ? 'clamp(140px, 50vw, 240px)' : 'clamp(200px, 38vw, 520px)',
          aspectRatio: '1 / 1',
          zIndex: 1,
          willChange: 'transform, top',
        }}>
          <img src={globeImg} alt="Globe"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>

        {/* 콘텐츠 레이어 */}
        <div style={{
          position: 'absolute', inset: 0,
          zIndex: 2,
          opacity: contentAlpha,
          transition: 'opacity 0.25s ease',
          pointerEvents: contentAlpha > 0.05 ? 'auto' : 'none',
        }}>

          {/* MISSION 타이틀 + 탭 */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: isMobile ? 8 : 12,
            paddingTop: isMobile ? 'clamp(20px, 3.5vh, 40px)' : 'clamp(32px, 5.5vh, 60px)',
            transform: `translateY(${(1 - contentAlpha) * -20}px)`,
            transition: 'transform 0.35s ease',
            maxWidth: 1500,
            margin: '0 auto',
            width: '100%',
          }}>
            <h2 style={{
              fontFamily: fontSerif, fontWeight: 700,
              fontSize: 'var(--font-size-section-title)',
              letterSpacing: '0.04em', color: '#111', margin: 0,
            }}>
              MISSION
            </h2>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: isMobile ? 5 : 7,
              justifyContent: 'center',
              paddingLeft: isMobile ? 16 : 0,
              paddingRight: isMobile ? 16 : 0,
            }}>
              {categories.map((cat, i) => (
                <button key={cat} onClick={() => setCurrentCat(i)} style={{
                  padding: isMobile ? '4px 10px' : '5px 13px',
                  borderRadius: 999,
                  border: '1px solid rgba(0,0,0,0.17)',
                  background: i === currentCat ? '#111' : 'transparent',
                  color:  i === currentCat ? '#fff' : 'rgba(0,0,0,0.48)',
                  fontFamily: fontKR,
                  fontSize: 'var(--font-size-small)',
                  fontWeight: i === currentCat ? 700 : 400,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 카드 슬라이더 */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>

            {cards.map((card, i) => {
              const total = cards.length;
              let offset = ((i - currentCat) % total + total) % total;
              if (offset > total / 2) offset -= total;

              const isCenter  = offset === 0;
              const isPrev    = offset === -1;
              const isNext    = offset === 1;
              const isVisible = isMobile ? isCenter : Math.abs(offset) <= 1;

              const cardHeight = `calc(${cardW} * 4 / 3)`;

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (isPrev) navigate(-1);
                    if (isNext) navigate(1);
                  }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '44%',
                    width: cardW,
                    height: cardHeight,
                    transform: getSlotTransform(offset),
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, box-shadow 0.5s ease',
                    zIndex: isCenter ? 10 : isVisible ? 5 : 0,
                    opacity: isVisible ? 1 : 0,
                    cursor: (isPrev || isNext) ? 'pointer' : 'default',
                    boxShadow: isCenter
                      ? '0 24px 64px rgba(0,0,0,0.28)'
                      : '0 12px 32px rgba(0,0,0,0.15)',
                    overflow: 'visible',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 14,
                    overflow: 'hidden',
                    transform: 'translateZ(0)',
                  }}>
                    <img
                      src={card.image}
                      alt={card.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: isMobile ? '12px 14px 16px' : '16px 18px 20px',
                      display: 'flex', flexDirection: 'column', gap: 3,
                    }}>
                      <span style={{ fontFamily: fontKR, fontWeight: 700, fontSize: 'var(--font-size-card-title)', color: '#fff' }}>{card.name}</span>
                      <span style={{ fontFamily: fontKR, fontSize: 'var(--font-size-base)', color: 'rgba(255,255,255,0.72)', marginBottom: 8 }}>{card.sub}</span>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          border: '1.5px solid rgba(255,255,255,0.65)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff',
                        }}>
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 좌측 화살표 */}
            <button
              onClick={() => navigate(-1)}
              style={{
                position: 'absolute',
                left: isMobile
                  ? 'clamp(4px, 1vw, 12px)'
                  : `max(clamp(6px, 1.5vw, 24px), calc(50vw - 750px + clamp(6px, 1.5vw, 24px)))`,
                top: '44%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: isMobile ? 32 : 38,
                height: isMobile ? 32 : 38,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#111',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >
              <ChevronLeft size={isMobile ? 16 : 20} />
            </button>

            {/* 우측 화살표 */}
            <button
              onClick={() => navigate(1)}
              style={{
                position: 'absolute',
                right: isMobile
                  ? 'clamp(4px, 1vw, 12px)'
                  : `max(clamp(6px, 1.5vw, 24px), calc(50vw - 750px + clamp(6px, 1.5vw, 24px)))`,
                top: '44%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                width: isMobile ? 32 : 38,
                height: isMobile ? 32 : 38,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#111',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >
              <ChevronRight size={isMobile ? 16 : 20} />
            </button>
          </div>

          {/* 도트 인디케이터 */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(14px, 3vh, 32px)',
            left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 8, zIndex: 30,
          }}>
            {cards.map((_, i) => (
              <button key={i} onClick={() => setCurrentCat(i)} style={{
                width: i === currentCat ? 24 : 8, height: 8,
                borderRadius: 999,
                background: i === currentCat ? '#111' : 'rgba(0,0,0,0.18)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s',
              }} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}