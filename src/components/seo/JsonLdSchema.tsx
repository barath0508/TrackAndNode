import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface JsonLdSchemaProps {
  toolName: string;
  toolUrl: string;
  description: string;
  faqs?: FaqItem[];
}

export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({
  toolName,
  toolUrl,
  description,
  faqs = [],
}) => {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    operatingSystem: 'Any (Web Browser)',
    applicationCategory: 'EngineeringApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    url: toolUrl,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'BenchPulse',
      url: 'https://benchpulse.dev',
    },
  };

  const faqPageSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      {faqPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      )}
    </>
  );
};
