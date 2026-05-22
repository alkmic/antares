import type { CollectionConfig } from 'payload';

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'desiredRole', type: 'text' },
    { name: 'targetExpertise', type: 'relationship', relationTo: 'expertises' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'En revue', value: 'reviewing' },
        { label: 'Entretien', value: 'interview' },
        { label: 'Refusé', value: 'rejected' },
        { label: 'Recruté', value: 'hired' },
        { label: 'Archivé', value: 'archived' },
      ],
    },
  ],
};
