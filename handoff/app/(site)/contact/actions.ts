'use server';
import { z } from 'zod';

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10),
});

export async function sendContactMessage(fd: FormData) {
  const parsed = Schema.parse(Object.fromEntries(fd));
  // verify Turnstile, then forward to contact@ + log to DB
}
