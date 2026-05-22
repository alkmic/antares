/** Les trois implantations du cabinet (adresses depuis handoff/assets-required.md). */
export interface Office {
  slug: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
}

export const offices: Office[] = [
  {
    slug: 'paris',
    city: 'Paris',
    streetAddress: '3 square Lamartine',
    postalCode: '75116',
    addressLocality: 'Paris',
  },
  {
    slug: 'massy',
    city: 'Massy',
    streetAddress: '7 allée du Mail',
    postalCode: '91300',
    addressLocality: 'Massy',
  },
  {
    slug: 'nice',
    city: 'Nice',
    streetAddress: '9 avenue Henri Matisse',
    postalCode: '06200',
    addressLocality: 'Nice',
  },
];
