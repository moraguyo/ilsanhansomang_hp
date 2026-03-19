import { useRef, useEffect, useState } from 'react';
import globeImg from "figma:asset/92af6860be0a3fdb8ec9196f96acc14a28a09f61.png";

const missionCards = [
  {
    icon: '🌏',
    title: '국내선교',
    subtitle: 'Domestic Mission',
    description: '대한민국의 복음화를 위해 기도하고 섬기는 사역입니다.',
  },
  {
    icon: '✈️',
    title: '해외선교',
    subtitle: 'Global Mission',
    description: '열방을 향한 복음의 사명을 감당하는 해외선교 사역입니다.',
  },
  {
    icon: '🙏',
    title: '중보기도',
    subtitle: 'Intercessory Prayer',
    description: '세계 열방을 위한 중보기도로 하나님의 나라를 세워갑니다.',
  },
];

export default function GlobeMissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [globeScale, setGlobeScale] = useState(0.3);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH * 0.7)));
      setGlobeScale(0.3 + progress * 0.7);
      if (progress > 0.5 && !triggered) {
        setCardsVisible(true);
        setTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggered]);

  return (
    null
  );
}
