import type { CollectionConfig } from 'payload';

export const Avocats: CollectionConfig = {
  slug: 'avocats',
  admin: {
    useAsTitle: 'lastName',
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'role', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'calendlyUrl', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bioShort', type: 'textarea' },
    { name: 'bioLong', type: 'richText' },
    { name: 'expertises', type: 'relationship', relationTo: 'expertises', hasMany: true },
    { name: 'isPartner', type: 'checkbox', defaultValue: false },
    { name: 'isPublished', type: 'checkbox', defaultValue: false },
    { name: 'orderIndex', type: 'number', defaultValue: 0 },
  ],
};
