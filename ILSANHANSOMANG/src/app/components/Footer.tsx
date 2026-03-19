import churchLogo from "figma:asset/cd09e2d4c8a86470cac7bf9b90aa1f823a9a4832.png";
import { useBreakpoint } from '../hooks/useBreakpoint';

function KakaoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.875c0 2.731 1.628 5.128 4.092 6.556-.178.614-.644 2.241-.738 2.589-.117.427.157.42.33.307.136-.09 2.16-1.464 3.041-2.06.415.057.84.087 1.275.087 5.523 0 10-3.477 10-7.875S17.523 3 12 3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <footer
      className="relative w-full"
      style={{ backgroundColor: '#111827', paddingTop: isMobile ? 48 : 60, paddingBottom: isMobile ? 32 : 40 }}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left: Logo */}
          <div className="flex-none">
            <img
              src={churchLogo}
              alt="한소망교회"
              className="object-contain filter brightness-0 invert opacity-80"
              style={{ height: 'clamp(50px, 8vw, 80px)' }}
            />
          </div>

          {/* Center: SNS */}
          <div className="flex flex-col items-center gap-4">
            <p
              className="text-white/50 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              Follow Us
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-white/60 hover:text-[#FEE500] transition-colors"
                aria-label="KakaoTalk"
              >
                <KakaoIcon />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-[#FF0000] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Right: Contact + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p
              className="text-white/80"
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}
            >
              02-000-0000
            </p>
            <p
              className="text-white/40 text-xs"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              서울특별시 한소망교회
            </p>
            <p
              className="text-white/30 text-xs"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              © 2026 한소망교회. All rights reserved.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex gap-6">
            {['개인정보처리방침', '이용약관', '사이트맵'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 transition-colors text-xs"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            Designed with ❤️ for 한소망교회
          </p>
        </div>
      </div>
    </footer>
  );
}