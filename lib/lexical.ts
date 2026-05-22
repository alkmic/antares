/** Helpers pour le contenu richText (Lexical) généré par Payload. */

interface LexicalNode {
  text?: string;
  children?: LexicalNode[];
}

/** Extrait le texte brut d'un état Lexical sérialisé (pour résumés, temps de lecture). */
export function lexicalPlainText(body: unknown): string {
  if (!body || typeof body !== 'object') return '';
  const root = (body as { root?: LexicalNode }).root;
  if (!root) return '';
  const parts: string[] = [];
  const walk = (node?: LexicalNode) => {
    if (!node) return;
    if (typeof node.text === 'string') parts.push(node.text);
    node.children?.forEach(walk);
  };
  walk(root);
  return parts.join(' ');
}

/** Estimation du temps de lecture en minutes (~200 mots/min). */
export function readingTime(body: unknown, extra = ''): number {
  const words = `${lexicalPlainText(body)} ${extra}`.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
