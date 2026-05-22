'use client';

import { useState } from 'react';

/**
 * Champ newsletter du footer.
 * Placeholder : le backend d'inscription (Resend) sera câblé dans une étape ultérieure.
 */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <h4 className="font-mono text-mono-label uppercase text-gold mb-s-5 font-medium">
        ⌗ Newsletter
      </h4>
      <p className="text-[13px] text-bone/70 leading-snug">
        Une fois par mois, nos décryptages juridiques.
      </p>
      {submitted ? (
        <p className="text-[13px] text-gold mt-s-3" role="status">
          Inscription bientôt disponible — merci de votre intérêt.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex mt-s-3 border-b border-bone/40 pb-1"
        >
          <label htmlFor="nl-email" className="sr-only">
            Adresse email
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            placeholder="votre@email.fr"
            className="flex-1 bg-transparent border-0 outline-none text-bone text-[14px] py-s-2 placeholder:text-bone/40"
          />
          <button
            type="submit"
            className="bg-transparent text-gold font-mono px-s-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="S'inscrire à la newsletter"
          >
            →
          </button>
        </form>
      )}
    </div>
  );
}
