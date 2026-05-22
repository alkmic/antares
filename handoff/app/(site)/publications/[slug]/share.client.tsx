'use client';
/** Boutons de partage LinkedIn / X / Copy / Email. */
export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/publications/${slug}` : '';
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const x  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  return (
    <div className="flex gap-s-2">
      <a href={li} target="_blank" rel="noopener" aria-label="Partager sur LinkedIn" className="w-9 h-9 border border-line-strong rounded-sm flex items-center justify-center hover:border-antares hover:text-antares">in</a>
      <a href={x}  target="_blank" rel="noopener" aria-label="Partager sur X" className="w-9 h-9 border border-line-strong rounded-sm flex items-center justify-center hover:border-antares hover:text-antares">X</a>
      <button onClick={() => navigator.clipboard.writeText(url)} aria-label="Copier le lien" className="w-9 h-9 border border-line-strong rounded-sm flex items-center justify-center hover:border-antares hover:text-antares">⌗</button>
    </div>
  );
}
