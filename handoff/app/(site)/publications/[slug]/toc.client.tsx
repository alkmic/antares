'use client';
/** TOC scrollspy — surveille les H2[id] de l'article. */
import { useEffect, useState } from 'react';

export function ArticleToc() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('article h2[id]'));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  // Rendu de la TOC voir publication-ia-generative.html
  return <nav aria-label="Sommaire de l'article" data-active={active} />;
}
