/**
 * Utilitaire de fusion de classes Tailwind.
 * Standard React + Tailwind — voir https://github.com/dcastil/tailwind-merge
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
