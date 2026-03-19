import { useState, useEffect } from 'react';
import crossIcon from "figma:asset/be57376b9422c175219bbda068f45d27598c0057.png";
import churchLogo from "figma:asset/cd09e2d4c8a86470cac7bf9b90aa1f823a9a4832.png";

interface Props {
  onComplete: () => void;
}

export default function LoadingPage({ onComplete }: Props) {
  const [showText1, setShowText1] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [hideTexts, setHideTexts] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowText1(true), 200),
      setTimeout(() => setShowCross(true), 600),
      setTimeout(() => setShowText2(true), 1000),
      setTimeout(() => setHideTexts(true), 1800),
      setTimeout(() => setShowLogo(true), 2100),
      setTimeout(() => setFadeOut(true), 2900),
      setTimeout(() => onComplete(), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#fcfaf6',
        transition: 'opacity 0.7s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Text + Cross group */}
      <div
        className="flex flex-col items-center"
        style={{ transition: 'opacity 0.8s ease', opacity: hideTexts ? 0 : 1 }}
      >
        <p
          className="text-center text-[#2d6cb1] text-3xl md:text-5xl tracking-tight mb-8"
          style={{
            fontFamily: "'Gowun Batang', serif",
            transition: 'opacity 0.8s ease',
            opacity: showText1 ? 1 : 0,
          }}
        >
          우리의 비전은
        </p>

        <div
          className="flex justify-center mb-8"
          style={{ transition: 'opacity 0.8s ease', opacity: showCross ? 1 : 0 }}
        >
          <img
            src={crossIcon}
            alt="Cross"
            className="object-contain"
            style={{ height: 'clamp(120px, 18vw, 220px)' }}
          />
        </div>

        <div
          className="text-center text-[#2d6cb1] tracking-tight"
          style={{
            fontFamily: "'Gowun Batang', serif",
            transition: 'opacity 0.8s ease',
            opacity: showText2 ? 1 : 0,
          }}
        >
          <span
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            한소망
          </span>
          <span className="text-2xl md:text-4xl">이라는</span>
          <br />
          <span className="text-2xl md:text-4xl">이름에 담겨있다</span>
        </div>
      </div>

      {/* Logo */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          transition: 'opacity 0.8s ease',
          opacity: showLogo ? 1 : 0,
        }}
      >
        <img
          src={churchLogo}
          alt="한소망교회"
          className="object-contain"
          style={{ height: 'clamp(140px, 20vw, 260px)' }}
        />
      </div>
    </div>
  );
}