import type { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Décryptage', value: 'decryptage' },
        { label: 'Alerte', value: 'alerte' },
        { label: 'Actualité', value: 'actualite' },
        { label: 'Analyse', value: 'analyse' },
        { label: 'Tribune', value: 'tribune' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Relecture', value: 'review' },
        { label: 'Publié', value: 'published' },
        { label: 'Programmé', value: 'scheduled' },
        { label: 'Archivé', value: 'archived' },
      ],
    },
    { name: 'lede', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'authors', type: 'relationship', relationTo: 'avocats', hasMany: true },
    { name: 'expertise', type: 'relationship', relationTo: 'expertises' },
    { name: 'publishedAt', type: 'date' },
  ],
};
