'use client';
/** Progress bar fixée en haut, suit le scroll de l'article. */
import { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 h-[2px] bg-antares z-[70]"
      style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(162,59,46,0.5)' }}
    />
  );
}
