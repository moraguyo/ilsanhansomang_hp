import { useRef, useEffect, useState } from 'react';
import sundaySermonThumb from "figma:asset/4e3a2c304d66e962d04b543c5ea42cc92cd3e08e.png";
import wednesdayThumb from "figma:asset/a643fde8dd8002ef7da30276b3f55227921ac771.png";
import prayMeetingThumb from "figma:asset/44c8a6aebbc84727c55e2e6d7c642d14484f4ce2.png";
import { useBreakpoint } from '../hooks/useBreakpoint';

const sermons = [
  {
    type: 'Sunday Worship',
    title: '탕자의 비유 1 : 잃은 아들의 자유',
    scripture: '누가복음 15장 11절-24절',
    preacher: '최봉규 목사',
    date: '2026.03.15',
    thumb: sundaySermonThumb,
  },
  {
    type: 'Wednesday Worship',
    title: '사무엘하 강해 14 : 당신의 마지막 말',
    scripture: '누가복음 16장 11절-24절',
    preacher: '최봉규 목사',
    date: '2026.03.15',
    thumb: wednesdayThumb,
  },
  {
    type: 'Pray Meeting',
    title: '끝까지 포기하지 않는 사랑',
    scripture: '누가복음 16장 11절-24절',
    preacher: '최봉규 목사',
    date: '2026.03.15',
    thumb: prayMeetingThumb,
  },
];

const fontKR    = "'Noto Sans KR', 'Wanted Sans', sans-serif";
const fontSerif = "'Playfair Display', Georgia, serif";

export default function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { isSm, isMobile } = useBreakpoint();

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
      className="relative w-full"
      style={{
        backgroundColor: '#1b2947',
        borderRadius: '64px 64px 0 0',
        marginTop: -40,
        paddingTop: isMobile ? 48 : 72,
        paddingBottom: isMobile ? 80 : 140,
        overflow: 'hidden',
      }}
    >
      <div className="max-w-[1500px] mx-auto px-8 md:px-12 lg:px-20">

        {/* 타이틀 */}
        <h2
          className="text-center mb-10 md:mb-14"
          style={{
            fontFamily: fontSerif,
            fontSize: 'var(--font-size-section-title)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#ffffff',
            ...fadeIn(0),
          }}
        >
          MESSAGE
        </h2>

        {/* 상단 메인 카드 */}
        <div
          className="flex flex-col md:flex-row gap-8 md:gap-12 pb-10 md:pb-12"
          style={fadeIn(0.15)}
        >
          {/* 좌: 썸네일 */}
          <div
            className="flex-none w-full md:w-[48%] overflow-hidden rounded-lg"
            style={{ aspectRatio: '16 / 10' }}
          >
            <img
              src={sermons[0].thumb}
              alt={sermons[0].title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* 우: 텍스트 */}
          <div className="flex flex-col justify-center gap-4 md:gap-5">
            <span
              style={{
                fontFamily: fontKR,
                fontWeight: 700,
                fontSize: 'var(--font-size-worship-type)',
                letterSpacing: '0.06em',
                color: 'rgba(250,250,250,0.65)',
              }}
            >
              {sermons[0].type}
            </span>
            <h3
              style={{
                fontFamily: fontKR,
                fontWeight: 700,
                fontSize: 'var(--font-size-sermon-title)',
                letterSpacing: '-0.02em',
                lineHeight: 1.35,
                color: '#ffffff',
              }}
            >
              {sermons[0].title}
            </h3>
            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div
              style={{
                fontFamily: fontKR,
                fontSize: 'var(--font-size-small)',
                color: 'rgba(250,250,250,0.55)',
                lineHeight: 1.8,
              }}
            >
              <p>{sermons[0].scripture}</p>
              <p>{sermons[0].preacher} | {sermons[0].date}</p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: '100%', height: 1,
            background: 'rgba(255,255,255,0.18)',
            marginBottom: 40,
            ...fadeIn(0.25),
          }}
        />

        {/* 하단 두 카드 */}
        <div className="flex flex-col sm:flex-row">
          {[sermons[1], sermons[2]].map((s, i) => (
            <div
              key={s.type}
              className="flex-1 flex flex-col gap-4"
              style={{
                /* sm 이상: 세로 구분선 / sm 미만: 가로 구분선으로 전환 */
                borderLeft:  (isSm && i === 1) ? '1px solid rgba(255,255,255,0.18)' : 'none',
                borderTop:   (!isSm && i === 1) ? '1px solid rgba(255,255,255,0.18)' : 'none',
                paddingLeft:  (isSm && i === 1) ? 'clamp(20px, 4vw, 56px)' : 0,
                paddingRight: (isSm && i === 0) ? 'clamp(20px, 4vw, 56px)' : 0,
                paddingTop:   (!isSm && i === 1) ? 28 : 0,
                paddingBottom: 8,
                ...fadeIn(0.3 + i * 0.12),
              }}
            >
              <span
                style={{
                  fontFamily: fontKR,
                  fontWeight: 700,
                  fontSize: 'var(--font-size-worship-type)',
                  letterSpacing: '0.06em',
                  color: 'rgba(250,250,250,0.65)',
                }}
              >
                {s.type}
              </span>
              <h4
                style={{
                  fontFamily: fontKR,
                  fontWeight: 700,
                  fontSize: 'var(--font-size-sermon-title)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.4,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {s.title}
              </h4>
              <div className="w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 10' }}>
                <img
                  src={s.thumb}
                  alt={s.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div
                className="text-center"
                style={{
                  fontFamily: fontKR,
                  fontSize: 'var(--font-size-small)',
                  color: 'rgba(250,250,250,0.5)',
                  lineHeight: 1.85,
                }}
              >
                <p>{s.scripture}</p>
                <p>{s.preacher} | {s.date}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}