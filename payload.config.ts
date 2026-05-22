import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Users } from './collections/Users.ts';
import { Media } from './collections/Media.ts';
import { Avocats } from './collections/Avocats.ts';
import { Expertises } from './collections/Expertises.ts';
import { Articles } from './collections/Articles.ts';
import { Bookings } from './collections/Bookings.ts';
import { JobApplications } from './collections/JobApplications.ts';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Avocats, Expertises, Articles, Bookings, JobApplications],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
