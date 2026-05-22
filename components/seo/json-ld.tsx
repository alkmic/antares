/** Rend un bloc JSON-LD Schema.org. `<` est échappé pour empêcher toute fermeture de balise script. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
