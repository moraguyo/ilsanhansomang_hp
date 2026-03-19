import { useState, useEffect } from 'react';
import churchLogo from "figma:asset/cd09e2d4c8a86470cac7bf9b90aa1f823a9a4832.png";
import heroImg1 from "figma:asset/20f58e736b8b8f1406a5d3f23f0abf68efb25349.png";
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const heroImg2 = "https://images.unsplash.com/photo-1505427214476-47e71e07abfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29uZ3JlZ2F0aW9ufGVufDF8fHx8MTc3Mzc1MTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080";

const slides = [
  {
    image: heroImg1,
    title: '한소망교회에 오신것을',
    title2: '환영합니다.',
  },
  {
    image: heroImg2,
    title: '예수님이 꿈꾸신',
    title2: '바로 그 교회',
  },
];

const navItems = ['교회소개', '예배', '목장교회', '비전의 사다리', '다음세대·청년', '선교·섬김'];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full" style={{ height: '100svh', minHeight: 600 }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(120.87deg, rgba(0,0,0,0.5) 40%, rgba(80,80,80,0.1) 100%)',
            }}
          />
        </div>
      ))}

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <img src={churchLogo} alt="한소망교회" className="h-10 object-contain filter brightness-0 invert" />
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-sm lg:text-base tracking-tight hover:text-white/70 transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}
            >
              {item}
            </a>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-30"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute inset-0 z-10 bg-black/90 flex flex-col items-center justify-center gap-8 md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-xl tracking-tight"
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Text */}
      <div className="absolute left-5 md:left-16 lg:left-28 bottom-20 md:bottom-32 z-10 max-w-[85vw] md:max-w-none">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="transition-all duration-1000"
            style={{
              opacity: i === current ? 1 : 0,
              position: i === current ? 'relative' : 'absolute',
              transform: i === current ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <h1
              className="text-white leading-tight"
              style={{
                fontFamily: "'Noto Serif KR', 'Gowun Batang', serif",
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              {slide.title}
              <br />
              {slide.title2}
            </h1>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </section>
  );
}