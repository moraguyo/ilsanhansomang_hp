import { useRef, useEffect, useState } from 'react';
import sundayWorshipImg from "figma:asset/61ecdd1e6a0d4dc87cb2481a6a9304d5744a88aa.png";
import nextGenImg from "figma:asset/f2322b4c979f55cbc1bd5e3710293e66c2bd3092.png";
import { useBreakpoint } from '../hooks/useBreakpoint';

const fontKR    = "'Noto Sans KR', 'Wanted Sans', sans-serif";
const fontSerif = "'Playfair Display', Georgia, serif";

const sundayRow = {
  name: '주일예배',
  times: [
    { part: '1부',       time: '오전 07:30' },
    { part: '2부',       time: '오전 09:30' },
    { part: '3부',       time: '오전 11:30' },
    { part: '4부(청년)', time: '낮 02:00'   },
  ],
  location: '한소망채플(4층)',
};

const otherRows: { name: string; time: string; location: string }[] = [
  { name: '말씀사경회',               time: '오전 07:30', location: '한소망채플(4층)' },
  { name: '한밤의 기도회',             time: '오전 07:30', location: '한소망채플(4층)' },
  { name: '매일 기도회',               time: '오전 07:30', location: '한소망채플(4층)' },
  { name: '월삭 온가족\n한밤의 기도회', time: '오전 07:30', location: '한소망채플(4층)' },
];

const tabs = [
  '해피(영아,유아,유치)',
  '드림(유년,초등)',
  '영어예배,어와나',
  '청소년(중등,고등)',
  '소망부(어린이,소망부)',
];

const nextGenRows: { dept: string; rows: { part: string; time: string; location?: string }[] }[] = [
  {
    dept: '해피영아부 (1-3세)',
    rows: [
      { part: '1부', time: '09:30', location: '3층 환영해방' },
      { part: '2부', time: '11:30' },
    ],
  },
  {
    dept: '해피유아부 (4-5세)',
    rows: [
      { part: '1부', time: '09:30', location: '3층 행복해방' },
      { part: '2부', time: '11:30' },
    ],
  },
  {
    dept: '해피유치부 (6-7세)',
    rows: [
      { part: '1부', time: '09:30', location: '3층 사랑해방' },
      { part: '2부', time: '11:30' },
    ],
  },
];

function SundayTable() {
  return (
    <div style={{ fontFamily: fontKR, width: '100%', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: 56 }}>
        <div style={{ width: 100, flexShrink: 0, display: 'flex', alignItems: 'center', paddingRight: 14, paddingTop: 14, paddingBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 'var(--font-size-base)', color: '#121212' }}>{sundayRow.name}</span>
        </div>
        <div style={{ width: 1, background: 'rgba(18,18,18,0.15)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, gap: 4 }}>
          {sundayRow.times.map((t, ti) => (
            <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--font-size-base)', color: 'rgba(18,18,18,0.65)', minWidth: 56 }}>{t.part}</span>
              <span style={{ fontSize: 'var(--font-size-base)', color: 'rgba(18,18,18,0.65)', minWidth: 80 }}>{t.time}</span>
              {ti === 0 && (
                <span style={{ fontSize: 'var(--font-size-small)', color: 'rgba(18,18,18,0.45)' }}>{sundayRow.location}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OtherWorshipTable() {
  return (
    <div style={{ fontFamily: fontKR, width: '100%' }}>
      {otherRows.map((row, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', minHeight: 48 }}>
          <div style={{ width: 100, flexShrink: 0, display: 'flex', alignItems: 'center', paddingRight: 14, paddingTop: 10, paddingBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-base)', color: '#121212', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{row.name}</span>
          </div>
          <div style={{ width: 1, background: 'rgba(18,18,18,0.15)', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingTop: 10, paddingBottom: 10, gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--font-size-base)', color: 'rgba(18,18,18,0.65)', minWidth: 80 }}>{row.time}</span>
            <span style={{ fontSize: 'var(--font-size-small)', color: 'rgba(18,18,18,0.45)' }}>{row.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function NextGenTable() {
  return (
    <div style={{ fontFamily: fontKR, width: '100%' }}>
      {nextGenRows.map((dept, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', minHeight: 60 }}>
          <div style={{ width: 110, flexShrink: 0, display: 'flex', alignItems: 'center', paddingRight: 12, paddingTop: 12, paddingBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-small)', color: i === 0 ? '#0f43a3' : '#121212', lineHeight: 1.5 }}>{dept.dept}</span>
          </div>
          <div style={{ width: 1, background: 'rgba(18,18,18,0.13)', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 14, paddingTop: 10, paddingBottom: 10, gap: 4 }}>
            {dept.rows.map((r, ri) => (
              <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--font-size-small)', color: 'rgba(18,18,18,0.65)', minWidth: 20 }}>{r.part}</span>
                <span style={{ fontSize: 'var(--font-size-small)', color: 'rgba(18,18,18,0.65)', minWidth: 44 }}>{r.time}</span>
                {r.location && <span style={{ fontSize: 'var(--font-size-small)', color: 'rgba(18,18,18,0.45)' }}>{r.location}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorshipInfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible]     = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeIn = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(36px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{
        borderRadius: '64px 64px 0 0',
        marginTop: -60,
        paddingTop: isMobile ? 56 : 80,
        paddingBottom: isMobile ? 64 : 100,
        overflow: 'hidden',
      }}
    >
      <div className="max-w-[1500px] mx-auto px-8 md:px-12 lg:px-20">

        {/* 타이틀 */}
        <h2
          className="text-center text-[#121212] mb-12 md:mb-16"
          style={{
            fontFamily: fontSerif,
            fontSize: 'var(--font-size-section-title)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            ...fadeIn(0),
          }}
        >
          WORSHIP INFO
        </h2>

        {/* Row 1: 장년예배 */}
        <div
          className="flex flex-col md:flex-row gap-10 md:gap-14 pb-14 mb-14"
          style={{ borderBottom: '1px solid rgba(18,18,18,0.1)', ...fadeIn(0.15) }}
        >
          {/* 사진 */}
          <div
            className="flex-none w-full md:w-[42%] rounded-xl overflow-hidden"
            style={{ aspectRatio: isMobile ? '16/9' : '4/3' }}
          >
            <img src={sundayWorshipImg} alt="주일예배" className="w-full h-full object-cover" />
          </div>

          {/* 표 */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="mb-5" style={{ fontFamily: fontKR, fontWeight: 700, fontSize: 'var(--font-size-card-title)', color: '#121212' }}>장년예배</h3>
            <SundayTable />
            <OtherWorshipTable />
          </div>
        </div>

        {/* Row 2: 다음세대 */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-14" style={fadeIn(0.3)}>

          {/* 탭 + 표 */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="mb-5" style={{ fontFamily: fontKR, fontWeight: 700, fontSize: 'var(--font-size-card-title)', color: '#121212' }}>다음세대 예배</h3>

            {isMobile ? (
              /* ── 모바일: 탭을 가로 스크롤 바로 위에, 아래에 표 ── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* 탭 가로 스크롤 */}
                <div style={{
                  display: 'flex', flexDirection: 'row', gap: 8,
                  overflowX: 'auto', paddingBottom: 4,
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                } as React.CSSProperties}>
                  {tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(idx)}
                      style={{
                        flexShrink: 0,
                        background: activeTab === idx ? '#0f43a3' : 'rgba(18,18,18,0.06)',
                        border: 'none',
                        borderRadius: 999,
                        padding: '5px 12px',
                        cursor: 'pointer',
                        fontFamily: fontKR,
                        fontSize: '0.72rem',
                        fontWeight: activeTab === idx ? 700 : 400,
                        color: activeTab === idx ? '#fff' : 'rgba(18,18,18,0.55)',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* 표 */}
                <NextGenTable />
              </div>
            ) : (
              /* ── 데스크톱/태블릿: 탭 왼쪽 세로, 표 오른쪽 ── */
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 20, marginRight: 20, flexShrink: 0, minWidth: 110 }}>
                  {tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(idx)}
                      style={{
                        background: 'none', border: 'none',
                        padding: '3px 0', cursor: 'pointer',
                        textAlign: 'left', fontFamily: fontKR,
                        fontSize: '0.75rem', lineHeight: 1.5,
                        fontWeight: activeTab === idx ? 700 : 400,
                        color: activeTab === idx ? '#0f43a3' : 'rgba(18,18,18,0.45)',
                        display: 'flex', alignItems: 'center', gap: 5,
                        transition: 'color 0.2s',
                      }}
                    >
                      <span style={{
                        display: 'inline-block',
                        width: 5, height: 5, borderRadius: '50%',
                        background: activeTab === idx ? '#0f43a3' : 'rgba(18,18,18,0.25)',
                        flexShrink: 0, transition: 'background 0.2s',
                      }} />
                      {tab}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <NextGenTable />
                </div>
              </div>
            )}
          </div>

          {/* 사진 */}
          <div
            className="flex-none w-full md:w-[42%] rounded-xl overflow-hidden"
            style={{ aspectRatio: isMobile ? '16/9' : '4/3' }}
          >
            <img src={nextGenImg} alt="다음세대 예배" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
}