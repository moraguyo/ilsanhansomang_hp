import { useRef, useEffect, useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const bibleStudyImg = "https://images.unsplash.com/photo-1663162550932-f67b561e656f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGdyb3VwJTIwYmlibGUlMjBzdHVkeXxlbnwxfHx8fDE3NzM4MzU3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const youthImg = "https://images.unsplash.com/photo-1735761059597-c406e804d621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMG1pbmlzdHJ5JTIwcHJheWVyJTIwd29yc2hpcHxlbnwxfHx8fDE3NzM4MzU3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const childrenImg = "https://images.unsplash.com/photo-1702905709201-0950a1a3190f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHdvcnNoaXAlMjBzdW5kYXklMjBzY2hvb2x8ZW58MXx8fHwxNzczODM1Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const ministries = [
  {
    image: bibleStudyImg,
    title: '목장교회',
    titleEn: 'Small Group Ministry',
    description: '목장교회는 가정을 중심으로 모이는 소그룹 사역으로 함께 말씀을 나누고 서로를 돌보는 영적 가족 공동체입니다.',
    color: '#2d6cb1',
  },
  {
    image: youthImg,
    title: '비전의사다리',
    titleEn: 'Vision Ladder',
    description: '비전의 사다리는 훈련과 성장을 통해 하나님의 나라를 세워가는 제자훈련 사역입니다.',
    color: '#1b2947',
  },
  {
    image: childrenImg,
    title: '다음세대청년 사역',
    titleEn: 'Next Generation',
    description: '다음 세대를 하나님의 사람으로 세워가는 어린이, 청소년, 청년 사역입니다.',
    color: '#0f43a3',
  },
];

export default function MinistrySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ paddingTop: isMobile ? 56 : 80, paddingBottom: isMobile ? 64 : 100 }}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Title */}
        <h2
          className="text-center text-[#121212] mb-12 md:mb-16"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          MINISTRY
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ministries.map((m, i) => (
            <div
              key={m.title}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                aspectRatio: isMobile ? '3/2' : '4/5',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(60px)',
                transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
              }}
            >
              <img
                src={m.image}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6"
                style={{
                  background: `linear-gradient(to top, ${m.color}ee 0%, ${m.color}44 50%, transparent 100%)`,
                }}
              >
                <p
                  className="text-white/70 text-xs tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  {m.titleEn}
                </p>
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-white/80 text-sm leading-relaxed"
                  style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}
                >
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}