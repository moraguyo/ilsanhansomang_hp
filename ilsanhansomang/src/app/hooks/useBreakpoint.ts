import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const getW = () => (typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [width, setWidth] = useState(getW);

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle, { passive: true });
    return () => window.removeEventListener('resize', handle);
  }, []);

  return {
    width,
    isMobile:  width < 768,   // < md
    isTablet:  width < 1024,  // < lg
    isSm:      width >= 640,  // >= sm
  };
}
