import { Helmet } from 'react-helmet';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
  description = "Book an appointment with top General Physician & Internal Medicine specialists at Apollo 247 Clone. Consult with experienced doctors online or in-clinic.",
  canonicalUrl = "https://apollo247-clone.example.com/specialties/general-physician-internal-medicine",
  ogType = "website",
}) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="General Physician, Internal Medicine, doctor appointment, Apollo 247, medical consultation" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalSpecialty",
          "name": "General Physician & Internal Medicine",
          "description": "Specialists in diagnosing and treating a wide range of health conditions in adults.",
          "provider": {
            "@type": "Organization",
            "name": "Apollo 247 Clone",
            "url": "https://apollo247-clone.example.com"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
