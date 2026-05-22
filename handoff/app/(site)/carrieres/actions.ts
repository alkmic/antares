'use server';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const Schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  desiredRole: z.enum(['collaborateur', 'stage', 'spontanee']),
  targetExpertise: z.string(),
  coverLetter: z.string().min(100).max(600),
  cv: z.instanceof(File).refine((f) => f.size < 5 * 1024 * 1024, 'CV doit faire moins de 5 Mo'),
  linkedinUrl: z.string().url().optional(),
  turnstile_token: z.string().min(10),
  rgpd: z.literal('on'),
});

export async function submitApplication(fd: FormData) {
  const parsed = Schema.parse(Object.fromEntries(fd));
  // 1) Verify Turnstile token côté Cloudflare
  // 2) Upload CV sur Vercel Blob / R2
  // 3) INSERT job_application
  // 4) await sendJobApplicationReceived + sendJobApplicationAcknowledgement
  redirect('/carrieres/merci');
}
