import { useRef, useEffect, useState } from 'react';
import crossBg from "figma:asset/be57376b9422c175219bbda068f45d27598c0057.png";
import missionImg from "figma:asset/5b0a8feaef4217e425516a9bf369592310de3b98.png";
import { useBreakpoint } from '../hooks/useBreakpoint';

const missionLines = [
  { parts: [{ text: '우리는 ', bold: false }, { text: '십자가', bold: true }, { text: '와 ', bold: false }, { text: '성령', bold: true }, { text: '의 능력을 통한 거룩함과', bold: false }] },
  { parts: [{ text: '아버지의 마음과 비전', bold: true }, { text: '을 품은 성숙한 성품을 이루고,', bold: false }] },
  { parts: [{ text: 'VIP(태신자)를 ', bold: false }, { text: '전도', bold: true }, { text: '하며,', bold: false }] },
  { parts: [{ text: '하나님의 나라', bold: true }, { text: '를 이 땅에 실현할 영적가족인', bold: false }] },
  { parts: [{ text: '12제자를 세워', bold: true }, { text: ' 도시를 복음으로 정복하고,', bold: false }] },
  { parts: [{ text: '한국교회를 ', bold: false }, { text: '깨우며', bold: true }, { text: ' 한민족을 ', bold: false }, { text: '살리고', bold: true }, { text: ' 열방을 ', bold: false }, { text: '구원하는', bold: true }] },
  { parts: [{ text: '예수님이 꿈꾸신 바로 그 교회', bold: true }, { text: '를 이룬다.', bold: false }] },
];

const quickMenuItems = [
  { title: '새가족 안내', sub: '처음 오셨나요? 안내드립니다.' },
  { title: '오시는 길', sub: '처음 오셨나요? 안내드립니다.' },
  { title: '목장교회 소개', sub: '처음 오셨나요? 안내드립니다.' },
  { title: '비전의 사다리', sub: '처음 오셨나요? 안내드립니다.' },
  { title: '행정 안내', sub: '처음 오셨나요? 안내드립니다.' },
];

type CharInfo = { char: string; bold: boolean; lineIdx: number; globalIdx: number };
const allChars: CharInfo[] = [];
missionLines.forEach((line, lineIdx) => {
  line.parts.forEach((part) => {
    [...part.text].forEach((char) => {
      allChars.push({ char, bold: part.bold, lineIdx, globalIdx: allChars.length });
    });
  });
});
const charsByLine: CharInfo[][] = missionLines.map((_, li) =>
  allChars.filter((c) => c.lineIdx === li)
);
const TOTAL_CHARS = allChars.length;

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 36 35" fill="none">
      <path d="M18.07 0L22.34 13.13H36.14L24.97 21.24L29.24 34.37L18.07 26.26L6.9 34.37L11.17 21.24L0 13.13H13.8L18.07 0Z" fill="#2D2D2D" />
    </svg>
  );
}

export default function VisionMissionSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useBreakpoint();

  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [crossY, setCrossY] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(0);
  const [imgTranslateY, setImgTranslateY] = useState(60);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const scrollRange = wrapperHeight - viewH;
      let progress = 0;
      if (scrollRange > 0) progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

      if (progress <= 0.6) {
        const charProgress = progress / 0.6;
        setActiveCharIndex(Math.round(TOTAL_CHARS * charProgress));
        setCrossY(-180 + progress * 400);
        setImgOpacity(0.25);
        setImgTranslateY(60);
        setMenuVisible(false);
      } else {
        setActiveCharIndex(TOTAL_CHARS);
        setCrossY(60);
        const phase2Progress = Math.min(1, (progress - 0.6) / 0.25);
        setImgOpacity(0.25 + 0.75 * phase2Progress);
        setImgTranslateY(60 * (1 - phase2Progress));
        setMenuVisible(progress >= 0.7);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── 반응형 스타일 값 ── */
  const titleFontSize = isMobile
    ? 'clamp(1.9rem, 8vw, 2.8rem)'
    : 'clamp(2.8rem, 6.5vw, 8rem)';

  const titleLeft  = isMobile ? 16  : undefined;
  const titleRight = isMobile ? undefined : undefined;
  const titleLeftStr = isMobile ? '16px' : 'clamp(24px, 6vw, 96px)';
  const titleTop   = isMobile ? 'clamp(36px, 5vh, 60px)' : 'clamp(60px, 10vh, 120px)';

  /* 미션 텍스트: 모바일 → 오른쪽 절반, 태블릿+ → 데스크톱 원본 */
  const missionTextStyle: React.CSSProperties = isMobile
    ? {
        position: 'absolute',
        left: '48vw',
        top: '48%',
        transform: 'translateY(-50%)',
        width: 'calc(100vw - 48vw - 14px)',
        zIndex: 10,
      }
    : {
        position: 'absolute',
        right: 'clamp(24px, 6vw, 96px)',
        top: '50%',
        transform: 'translateY(-50%)',
        width: isTablet ? 'clamp(220px, 42vw, 520px)' : 'clamp(260px, 38vw, 520px)',
        zIndex: 10,
      };

  /* 이미지: 모바일에서 숨김 */
  const imgVisible = !isMobile;

  /* 퀵메뉴: 모바일 → 전체 너비 bottom, 태블릿+ → 원본 우측 하단 */
  const quickMenuStyle: React.CSSProperties = isMobile
    ? {
        position: 'absolute',
        bottom: 'clamp(16px, 3vh, 32px)',
        left: 16,
        right: 16,
        zIndex: 10,
      }
    : {
        position: 'absolute',
        right: 'clamp(24px, 6vw, 96px)',
        bottom: 'clamp(32px, 6vh, 80px)',
        width: isTablet ? 'clamp(220px, 44vw, 560px)' : 'clamp(260px, 42vw, 560px)',
        zIndex: 10,
      };

  const quickMenuCols = isMobile ? 3 : 3;

  return (
    <div ref={wrapperRef} className="relative w-full bg-white" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ① 배경 십자가 */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            right: isMobile ? '-6%' : '-4%',
            top: '2%',
            width: isMobile ? 'clamp(140px, 42vw, 220px)' : 'clamp(260px, 36vw, 500px)',
            transform: `translateY(${crossY}px)`,
            transition: 'transform 0.08s linear',
            opacity: isMobile ? 0.3 : 0.55,
            zIndex: 0,
          }}
        >
          <img src={crossBg} alt="" className="w-full h-auto object-contain" />
        </div>

        {/* ② 제목 "Hansomang Mission" */}
        <div
          className="absolute"
          style={{
            left: titleLeftStr,
            top: titleTop,
            zIndex: 10,
            maxWidth: isMobile ? '44vw' : undefined,
          }}
        >
          <h2
            className="text-[#121212]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: isMobile 
                ? 'clamp(2rem, 8vw, 3.5rem)' 
                : 'var(--font-size-hero-title)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            Hansomang
            <br />
            Mission
          </h2>
        </div>

        {/* ③ 한글 미션 본문 */}
        <div style={missionTextStyle}>
          <div className="space-y-1">
            {charsByLine.map((lineChars, lineIdx) => (
              <p
                key={lineIdx}
                className="leading-relaxed"
                style={{
                  fontFamily: "'Noto Sans KR', 'Wanted Sans', sans-serif",
                  fontSize: isMobile
                    ? 'clamp(0.72rem, 2.4vw, 0.95rem)'
                    : 'var(--font-size-mission-text)',
                  letterSpacing: '-0.02em',
                }}
              >
                {lineChars.map((c) => (
                  <span
                    key={c.globalIdx}
                    style={{
                      color: c.globalIdx < activeCharIndex ? '#1A1A1A' : '#CCCCCC',
                      fontWeight: c.bold ? 700 : 400,
                      transition: 'color 0.15s ease',
                      display: 'inline',
                    }}
                  >
                    {c.char}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* ④ 그라디언트 이미지 (모바일 숨김) */}
        {imgVisible && (
          <div
            className="absolute"
            style={{
              left: 'clamp(24px, 6vw, 96px)',
              bottom: 'clamp(32px, 6vh, 80px)',
              width: isTablet ? 'clamp(120px, 18vw, 260px)' : 'clamp(160px, 24vw, 340px)',
              opacity: imgOpacity,
              transform: `translateY(${imgTranslateY}px)`,
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              zIndex: 10,
            }}
          >
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
              <img src={missionImg} alt="Mission gradient" className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(134,190,255,0.30) 0%, transparent 60%)',
                  mixBlendMode: 'hard-light',
                }}
              />
            </div>
          </div>
        )}

        {/* ⑤ 퀵메뉴 */}
        <div style={quickMenuStyle}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${quickMenuCols}, 1fr)`,
              gap: isMobile ? '12px 16px' : '32px',
            }}
          >
            {quickMenuItems.map((item, idx) => (
              <a
                key={item.title}
                href="#"
                className="flex flex-col gap-1 group cursor-pointer"
                style={{
                  opacity: menuVisible ? 1 : 0,
                  transform: menuVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${idx * 0.1}s, transform 0.6s ease ${idx * 0.1}s`,
                }}
              >
                <div className="mb-0.5 group-hover:scale-110 transition-transform origin-left">
                  <StarIcon />
                </div>
                <p
                  className="text-[#121212] leading-tight"
                  style={{
                    fontFamily: "'Noto Sans KR', 'Wanted Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 'clamp(0.8rem, 2.4vw, 1rem)' : 'var(--font-size-card-title)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.title}
                </p>
                {!isMobile && (
                  <p
                    className="text-[#727272] leading-snug"
                    style={{
                      fontFamily: "'Noto Sans KR', 'Wanted Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 'var(--font-size-small)',
                    }}
                  >
                    {item.sub}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}