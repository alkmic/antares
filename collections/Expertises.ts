import type { CollectionConfig } from 'payload';

export const Expertises: CollectionConfig = {
  slug: 'expertises',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'lede', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'orderIndex', type: 'number', defaultValue: 0 },
  ],
};
