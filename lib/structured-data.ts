import { site } from './site';
import { offices } from './offices';

/** JSON-LD Schema.org LegalService — partagé par la home et /cabinet. */
export function legalServiceJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.name,
    description: site.description,
    url: site.url,
    areaServed: 'FR',
    knowsLanguage: ['fr', 'en'],
    address: offices.map((o) => ({
      '@type': 'PostalAddress',
      streetAddress: o.streetAddress,
      postalCode: o.postalCode,
      addressLocality: o.addressLocality,
      addressCountry: 'FR',
    })),
  };
}
