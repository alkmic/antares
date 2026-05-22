import type { CollectionConfig } from 'payload';

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'clientName',
  },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'clientEmail', type: 'email', required: true },
    { name: 'scheduledAt', type: 'date' },
    { name: 'durationMinutes', type: 'number' },
    { name: 'avocat', type: 'relationship', relationTo: 'avocats' },
    {
      name: 'location',
      type: 'select',
      options: [
        { label: 'Visio', value: 'visio' },
        { label: 'Paris', value: 'paris' },
        { label: 'Massy', value: 'massy' },
        { label: 'Nice', value: 'nice' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'scheduled',
      options: [
        { label: 'Programmé', value: 'scheduled' },
        { label: 'Terminé', value: 'completed' },
        { label: 'Annulé', value: 'cancelled' },
        { label: 'No-show', value: 'no_show' },
      ],
    },
    { name: 'calendlyEventUri', type: 'text' },
  ],
};
