import { site } from './config'
import { faqs, modes } from './content'

/** Dados estruturados (JSON-LD) injetados no <head> pela pré-renderização. */
export function structuredData() {
  const url = `${site.url}/`
  const image = `${site.url}/og-image.png`
  const address = {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'BR',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}#victor`,
        name: site.name,
        jobTitle: 'Personal trainer',
        url,
        image,
        sameAs: [site.instagram],
        knowsAbout: ['Treinamento de força', 'Emagrecimento', 'Hipertrofia', 'Musculação'],
        address,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${url}#negocio`,
        name: site.businessName,
        description:
          'Personal trainer em Vila Velha (ES) com treino de força, emagrecimento e hipertrofia, presencial ou por consultoria online.',
        url,
        image,
        telephone: site.phoneDisplay,
        founder: { '@id': `${url}#victor` },
        sameAs: [site.instagram],
        address,
        areaServed: [
          { '@type': 'City', name: site.city },
          { '@type': 'Country', name: 'Brasil' },
        ],
        makesOffer: modes.map((mode) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: mode.title },
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#site`,
        url,
        name: site.businessName,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${url}#negocio` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }
}
