'use client';
/**
 * Flow de réservation Calendly custom.
 * 3 étapes : choix expertise → suggestion avocat → créneau.
 * Le calendrier custom appelle l'API Calendly v2 (proxy serveur) plutôt que l'iframe officielle.
 */
import { useState } from 'react';
import type { Expertise } from '@/components/types';

interface Props { expertises: Expertise[]; preselectedExpertise?: string; preselectedAvocat?: string }

export function BookingFlow({ expertises, preselectedExpertise, preselectedAvocat }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(preselectedExpertise ? (preselectedAvocat ? 3 : 2) : 1);
  const [selectedExpertise, setSelectedExpertise] = useState(preselectedExpertise);
  // … sélecteur 7 expertises + carte avocat suggéré + calendrier custom (voir rendez-vous.html)
  return <section aria-label="Réservation en 3 étapes" data-step={step} />;
}
