/**
 * Antares · Components UI — bibliothèque atomique partagée
 * Port de handoff/components/index.tsx (atomes présentationnels).
 * Navigation interne via next/link. Nav/Footer du site vivent dans components/site/.
 */

import type {
  ReactNode,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/* ====================================================================
   01 — PRIMITIVES TYPOGRAPHIQUES
   ==================================================================== */

interface ItalicProps {
  children: ReactNode;
  className?: string;
}
/**
 * Italique d'accent — Instrument Serif antarès.
 * RÈGLE : 1 à 3 mots maximum par section. Jamais sur un nom propre ou un chiffre.
 */
export function Italic({ children, className }: ItalicProps) {
  return <em className={cn('font-italic not-italic text-antares', className)}>{children}</em>;
}

interface DotProps {
  className?: string;
}
/** Point final antarès derrière un mot — signature visuelle du hero. */
export function Dot({ className }: DotProps) {
  return <span className={cn('text-antares', className)}>.</span>;
}

/* ====================================================================
   02 — LABELS & EYEBROWS · numérotation ⌗
   ==================================================================== */

interface EyebrowProps {
  num?: string;
  children: ReactNode;
  variant?: 'antares' | 'muted' | 'gold';
  withRule?: boolean;
}
export function Eyebrow({ num, children, variant = 'antares', withRule = false }: EyebrowProps) {
  const color =
    variant === 'muted' ? 'text-muted' : variant === 'gold' ? 'text-gold' : 'text-antares';
  return (
    <div className={cn('font-mono text-mono-label uppercase flex items-center gap-s-3', color)}>
      {withRule && <span className="w-s-6 h-px bg-current" aria-hidden />}
      <span>
        ⌗ {num && <>{num} — </>}
        {children}
      </span>
    </div>
  );
}

interface SectionLabelProps {
  num: string;
  children: ReactNode;
}
/** Label de section avec filet supérieur — pattern asymétrique 200 + 1fr. */
export function SectionLabel({ num, children }: SectionLabelProps) {
  return (
    <span className="font-mono text-mono-label uppercase text-muted pt-s-4 border-t border-ink inline-block">
      ⌗ {num} — {children}
    </span>
  );
}

/* ====================================================================
   03 — BRAND MARK
   ==================================================================== */

interface BrandMarkProps {
  size?: number;
  variant?: 'ink' | 'bone';
  animated?: boolean;
}
/** Cercle + pastille antarès — signature graphique du cabinet. */
export function BrandMark({ size = 22, variant = 'ink', animated = true }: BrandMarkProps) {
  const ringColor = variant === 'bone' ? 'border-bone' : 'border-ink';
  return (
    <span
      className={cn('relative inline-block', ringColor, 'border-[1.4px] rounded-full')}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-antares',
          animated && 'motion-safe:animate-pulse-soft',
        )}
        style={{
          width: Math.round(size * 0.36),
          height: Math.round(size * 0.36),
          boxShadow: '0 0 12px #A23B2E',
        }}
      />
    </span>
  );
}

interface BrandProps {
  href?: string;
  size?: number;
  variant?: 'ink' | 'bone';
}
export function Brand({ href = '/', size = 22, variant = 'ink' }: BrandProps) {
  const color = variant === 'bone' ? 'text-bone' : 'text-ink';
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-s-3 font-display text-lg font-medium tracking-wider no-underline',
        color,
      )}
    >
      <BrandMark size={size} variant={variant} />
      ANTARES
    </Link>
  );
}

/* ====================================================================
   04 — BUTTONS · 4 variantes
   ==================================================================== */

type ButtonVariant = 'ink' | 'antares' | 'ghost' | 'text';
type ButtonSize = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'ink', size = 'md', className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-s-3 font-body font-medium tracking-wider transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antares disabled:opacity-35 disabled:cursor-not-allowed';
    const sizes: Record<ButtonSize, string> = {
      md: 'text-[13px] px-s-5 py-s-3',
      sm: 'text-[12px] px-s-4 py-[9px]',
    };
    const variants: Record<ButtonVariant, string> = {
      ink: 'bg-ink text-bone border border-ink hover:bg-ink-soft hover:border-ink-soft',
      antares:
        'bg-antares text-bone border border-antares hover:bg-antares-deep hover:border-antares-deep',
      ghost:
        'bg-transparent text-ink border border-line-strong hover:bg-ink hover:text-bone hover:border-ink',
      text: 'bg-transparent text-ink border-b border-antares pb-1 rounded-none hover:text-antares hover:border-antares',
    };
    return (
      <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

/* ====================================================================
   05 — TAGS, BADGES, STATUS BADGES
   ==================================================================== */

type TagVariant = 'antares' | 'success' | 'warning' | 'ink' | 'gold' | 'outline';
interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
}
export function Tag({ variant = 'antares', children }: TagProps) {
  const variants: Record<TagVariant, string> = {
    antares: 'bg-antares/[0.12] text-antares',
    success: 'bg-success/[0.12] text-success',
    warning: 'bg-warning/[0.12] text-warning',
    ink: 'bg-ink/[0.08] text-ink-soft',
    gold: 'bg-gold/[0.16] text-gold',
    outline: 'bg-transparent text-ink border border-line-strong',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-s-2 font-mono text-[10px] uppercase tracking-wider px-s-2 py-px rounded-sm',
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'published' | 'draft' | 'review' | 'scheduled';
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    published: { label: 'Publié', cls: 'bg-success/[0.12] text-success' },
    draft: { label: 'Brouillon', cls: 'bg-ink/[0.08] text-ink-soft' },
    review: { label: 'Relecture', cls: 'bg-warning/[0.12] text-warning' },
    scheduled: { label: 'Programmé', cls: 'bg-gold/[0.16] text-gold' },
  }[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-s-2 font-mono text-[10px] uppercase tracking-wider px-s-2 py-px rounded-full',
        config.cls,
      )}
    >
      <span className="w-[6px] h-[6px] rounded-full bg-current" />
      {config.label}
    </span>
  );
}

/* ====================================================================
   06 — INPUTS · text / textarea
   ==================================================================== */

interface FieldLabelProps {
  children: ReactNode;
  htmlFor?: string;
}
export function FieldLabel({ children, htmlFor }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-s-2"
    >
      ⌗ {children}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean };
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full bg-card border rounded-md px-s-4 py-s-3 font-body text-[14px] text-ink outline-none transition-colors duration-base',
        'placeholder:text-muted',
        'focus:border-antares focus:shadow-[0_0_0_3px_rgba(162,59,46,0.12)]',
        'disabled:bg-bone-warm disabled:opacity-60 disabled:cursor-not-allowed',
        hasError ? 'border-antares' : 'border-line-strong hover:border-ink',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full bg-card border border-line-strong rounded-md px-s-4 py-s-3 font-body text-[14px] text-ink outline-none min-h-[96px] resize-y leading-relaxed',
        'placeholder:text-muted hover:border-ink focus:border-antares focus:shadow-[0_0_0_3px_rgba(162,59,46,0.12)]',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

/* ====================================================================
   07 — CALLOUTS
   ==================================================================== */

interface CalloutProps {
  variant?: 'antares' | 'gold';
  label?: string;
  title: ReactNode;
  children: ReactNode;
}
export function Callout({ variant = 'antares', label, title, children }: CalloutProps) {
  const defaultLabel = variant === 'antares' ? 'À retenir' : 'Point de vigilance';
  return (
    <aside
      className={cn(
        'px-s-6 py-s-5 my-s-7 border-l-2',
        variant === 'antares' && 'bg-bone-warm border-antares',
        variant === 'gold' && 'bg-gold/[0.08] border-gold',
      )}
    >
      <div
        className={cn(
          'font-mono text-[10px] uppercase tracking-widest mb-s-3',
          variant === 'antares' ? 'text-antares' : 'text-gold',
        )}
      >
        ⌗ {label || defaultLabel}
      </div>
      <h4 className="font-display text-h2 mb-s-3">{title}</h4>
      <div className="font-body text-[14.5px] leading-relaxed text-ink-soft">{children}</div>
    </aside>
  );
}

/* ====================================================================
   08 — LEGAL CITATION · pull-quote
   ==================================================================== */

interface LegalCiteProps {
  label?: string;
  children: ReactNode;
  reference: string;
}
/** Bloc citation jurisprudentielle — fond encre, guillemet rouge décoratif. */
export function LegalCite({ label = 'Considérant', children, reference }: LegalCiteProps) {
  return (
    <figure className="my-s-7 p-s-6 bg-ink text-bone relative">
      <span
        aria-hidden
        className="absolute -top-2 left-5 text-antares font-display text-[80px] leading-none"
      >
        &ldquo;
      </span>
      <div className="font-mono text-[10px] uppercase tracking-widest text-gold mb-s-3">⌗ {label}</div>
      <blockquote className="font-display font-light italic text-[19px] leading-relaxed mb-s-4">
        {children}
      </blockquote>
      <figcaption className="font-mono text-[10px] uppercase tracking-wider text-bone/70 pt-s-3 border-t border-bone/20">
        ⌗ {reference}
      </figcaption>
    </figure>
  );
}

interface PullQuoteProps {
  children: ReactNode;
}
export function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="my-s-7 pl-s-7 border-l-2 border-ink font-display font-light text-[28px] leading-snug tracking-tight">
      {children}
    </blockquote>
  );
}

/* ====================================================================
   09 — SECTION HEAD · pattern asymétrique 200 + 1fr
   ==================================================================== */

interface SectionHeadProps {
  num: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}
export function SectionHead({ num, label, title, intro }: SectionHeadProps) {
  return (
    <header className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-s-5 lg:gap-s-7 mb-s-9 items-start">
      <SectionLabel num={num}>{label}</SectionLabel>
      <div>
        <h2 className="font-display font-light text-[clamp(36px,5vw,56px)] leading-[1.02] tracking-tight max-w-[800px]">
          {title}
        </h2>
        {intro && (
          <p className="font-display font-light text-[20px] leading-relaxed text-ink-soft mt-s-5 max-w-[640px]">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}

/* ====================================================================
   10 — CARDS · article / avocat
   ==================================================================== */

interface ArticleCardProps {
  href: string;
  category: string;
  date: string;
  title: string;
  author: string;
  readingTime: number;
  variant?: 'ink' | 'bone';
}
export function ArticleCard({
  href,
  category,
  date,
  title,
  author,
  readingTime,
  variant = 'ink',
}: ArticleCardProps) {
  const onDark = variant === 'ink';
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col p-s-6 min-h-[320px] transition-all duration-medium no-underline',
        onDark
          ? 'bg-bone/[0.04] border border-bone/[0.16] text-bone hover:bg-bone/[0.08] hover:border-gold hover:-translate-y-1'
          : 'bg-bone border border-line text-ink hover:bg-bone-warm',
      )}
    >
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider mb-s-5">
        <span className={onDark ? 'text-gold' : 'text-antares'}>⌗ {category}</span>
        <span className={onDark ? 'text-bone/50' : 'text-muted'}>{date}</span>
      </div>
      <h3 className="font-display text-[22px] leading-tight tracking-tight mb-auto">{title}</h3>
      <footer
        className={cn(
          'mt-s-6 pt-s-4 border-t flex justify-between text-[12px]',
          onDark ? 'border-bone/15 text-bone/75' : 'border-line text-muted',
        )}
      >
        <span>{author}</span>
        <span>{readingTime} min</span>
      </footer>
    </Link>
  );
}

interface AvocatCardProps {
  href: string;
  initials: string;
  role: string;
  fullName: string;
  specialty: string;
  photoUrl?: string;
}
export function AvocatCard({ href, initials, role, fullName, specialty, photoUrl }: AvocatCardProps) {
  return (
    <Link href={href} className="block group no-underline text-ink">
      <div className="aspect-[4/5] mb-s-4 relative overflow-hidden bg-gradient-to-br from-bone-warm to-[#c1a87d]">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={`${fullName}, ${role.toLowerCase()} du cabinet`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display font-light text-[64px] text-ink/35">
            {initials}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-antares mb-1">⌗ {role}</div>
      <h3 className="font-display text-[19px] leading-tight mb-1">{fullName}</h3>
      <p className="text-[12.5px] text-muted leading-snug">{specialty}</p>
    </Link>
  );
}

/* ====================================================================
   11 — GRAIN OVERLAY
   ==================================================================== */

/**
 * Grain SVG fixe sur l'ensemble du viewport. À monter une seule fois dans le layout racine.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[200] opacity-[0.04] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.04 0 0 0 0 0.08 0 0 0 0 0.15 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
