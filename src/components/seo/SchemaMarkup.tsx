import { useEffect } from 'react';

interface WebApplicationSchema {
  name: string;
  url: string;
  description: string;
  featureList?: string[];
}

interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface BreadcrumbSchema {
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description: string;
  sameAs?: string[];
}

interface SchemaMarkupProps {
  type: 'WebApplication' | 'FAQ' | 'Breadcrumb' | 'Organization';
  data: WebApplicationSchema | FAQSchema | BreadcrumbSchema | OrganizationSchema;
}

function generateSchema(type: string, data: WebApplicationSchema | FAQSchema | BreadcrumbSchema | OrganizationSchema) {
  const baseUrl = window.location.origin;

  switch (type) {
    case 'WebApplication': {
      const appData = data as WebApplicationSchema;
      return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: appData.name,
        url: appData.url || `${baseUrl}${window.location.pathname}`,
        description: appData.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        ...(appData.featureList && { featureList: appData.featureList })
      };
    }

    case 'FAQ': {
      const faqData = data as FAQSchema;
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.questions.map(q => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      };
    }

    case 'Breadcrumb': {
      const breadcrumbData = data as BreadcrumbSchema;
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbData.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
        }))
      };
    }

    case 'Organization': {
      const orgData = data as OrganizationSchema;
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: orgData.name,
        url: orgData.url || baseUrl,
        ...(orgData.logo && { logo: orgData.logo.startsWith('http') ? orgData.logo : `${baseUrl}${orgData.logo}` }),
        description: orgData.description,
        ...(orgData.sameAs && { sameAs: orgData.sameAs })
      };
    }

    default:
      return null;
  }
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  useEffect(() => {
    const schema = generateSchema(type, data);
    if (!schema) return;

    // Create a unique ID for this schema type
    const schemaId = `schema-${type.toLowerCase()}`;
    
    // Remove existing schema of this type
    const existingScript = document.getElementById(schemaId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create and add new schema
    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById(schemaId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}

// Helper components for specific schema types
export function WebApplicationSchema(props: WebApplicationSchema) {
  return <SchemaMarkup type="WebApplication" data={props} />;
}

export function FAQSchema(props: FAQSchema) {
  return <SchemaMarkup type="FAQ" data={props} />;
}

export function BreadcrumbSchema(props: BreadcrumbSchema) {
  return <SchemaMarkup type="Breadcrumb" data={props} />;
}

export function OrganizationSchema(props: OrganizationSchema) {
  return <SchemaMarkup type="Organization" data={props} />;
}
