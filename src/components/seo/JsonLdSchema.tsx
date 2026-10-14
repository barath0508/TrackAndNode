import React from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface JsonLdProps {
  toolName: string;
  description: string;
  canonicalUrl?: string;
  toolUrl?: string; // backwards compatibility alias
  categoryName?: string;
  faqs: FaqItem[];
}

export function JsonLdSchema({
  toolName,
  description,
  canonicalUrl,
  toolUrl,
  categoryName = 'Engineering Tools',
  faqs,
}: JsonLdProps) {
  const finalUrl = canonicalUrl || toolUrl || 'https://traceandnode.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: toolName,
        url: finalUrl,
        description: description,
        applicationCategory: 'EngineeringApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires HTML5 and JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TraceAndNode Engineering Tools',
          url: 'https://traceandnode.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'TraceAndNode',
            item: 'https://traceandnode.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: categoryName,
            item: finalUrl.split('/').slice(0, 4).join('/'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: toolName,
            item: finalUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
