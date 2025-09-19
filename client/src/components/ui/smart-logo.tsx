import React, { useState, useCallback } from 'react';

interface SmartLogoProps {
  company: {
    name: string;
    website?: string;
    linkedinUrl?: string;
    logo?: string;
  };
  className?: string;
  size?: number;
  fallbackClassName?: string;
}

export function SmartLogo({ company, className, size = 48, fallbackClassName }: SmartLogoProps) {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [hasImageError, setHasImageError] = useState(false);

  // Generate multiple logo sources in priority order
  const generateLogoSources = useCallback(() => {
    const sources: string[] = [];
    const { name, website, linkedinUrl, logo } = company;

    // 1. Custom logo if provided
    if (logo && logo.trim()) {
      sources.push(logo);
    }

    // 2. Local assets for known companies
    const knownCompanies: { [key: string]: string } = {
      'infosys': '/images/infosys-logo.png',
      'tcs': '/images/tcs-logo.png',
      'tata consultancy services': '/images/tcs-logo.png',
      'microsoft': '/images/microsoft-logo.png',
      'google': '/images/google-logo.png',
      'amazon': '/images/amazon-logo.png',
      'accenture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/200px-Accenture.svg.png',
      'wipro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/200px-Wipro_Primary_Logo_Color_RGB.svg.png',
      'capgemini': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Capgemini_Logo.svg/200px-Capgemini_Logo.svg.png',
      'cognizant': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cognizant_logo_2022.svg/200px-Cognizant_logo_2022.svg.png',
      'deloitte': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png',
      'ibm': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png',
      'oracle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/200px-Oracle_logo.svg.png',
      'salesforce': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/200px-Salesforce.com_logo.svg.png',
      'adobe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/200px-Adobe_Corporate_Logo.svg.png',
      'netflix': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png'
    };

    const normalizedName = name.toLowerCase().trim();
    if (knownCompanies[normalizedName]) {
      sources.push(knownCompanies[normalizedName]);
    }

    // 3. Extract domain from website
    if (website && website.trim()) {
      try {
        let cleanWebsite = website.trim();
        if (!cleanWebsite.startsWith('http')) {
          cleanWebsite = `https://${cleanWebsite}`;
        }
        const url = new URL(cleanWebsite);
        const domain = url.hostname.replace('www.', '');
        
        // Add multiple reliable logo sources
        sources.push(
          `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
          `https://logo.clearbit.com/${domain}`,
          `https://img.logo.dev/${domain}?token=pk_X6tOkA1jTMKJrfaW2xUfaQ&size=200`,
          `https://favicons.githubusercontent.com/${domain}`
        );
      } catch (error) {
        console.log('Error parsing website URL:', error);
      }
    }

    // 4. LinkedIn-based logo extraction
    if (linkedinUrl && linkedinUrl.trim()) {
      try {
        const url = new URL(linkedinUrl);
        const pathParts = url.pathname.split('/').filter(part => part);
        const companyIndex = pathParts.findIndex(part => part === 'company');

        if (companyIndex !== -1 && pathParts[companyIndex + 1]) {
          const companySlug = pathParts[companyIndex + 1];
          sources.push(`https://www.google.com/s2/favicons?domain=${companySlug}.com&sz=64`);
        }
      } catch (error) {
        console.log('Error parsing LinkedIn URL:', error);
      }
    }

    // 5. Fallback based on company name
    const cleanName = normalizedName.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '').toLowerCase();
    if (cleanName && cleanName.length > 2) {
      sources.push(
        `https://www.google.com/s2/favicons?domain=${cleanName}.com&sz=64`
      );
    }

    // Remove duplicates
    return [...new Set(sources)];
  }, [company, size]);

  const logoSources = generateLogoSources();
  const currentSource = logoSources[currentSourceIndex];

  const handleImageError = useCallback(() => {
    console.log(`Logo failed to load: ${currentSource} for company: ${company.name}`);
    if (currentSourceIndex < logoSources.length - 1) {
      setCurrentSourceIndex(prev => prev + 1);
    } else {
      console.log(`All logo sources failed for company: ${company.name}, showing fallback`);
      setHasImageError(true);
    }
  }, [currentSourceIndex, logoSources.length, currentSource, company.name]);

  const handleImageLoad = useCallback(() => {
    setHasImageError(false);
  }, []);

  // If all sources failed or no sources available, show letter fallback
  if (hasImageError || !currentSource || logoSources.length === 0) {
    const initial = company.name.charAt(0).toUpperCase();
    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ];
    const color = colors[company.name.length % colors.length];

    return (
      <div 
        className={`${fallbackClassName || 'bg-blue-100 rounded-lg flex items-center justify-center'} ${className || ''}`}
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color + '20',
          border: `2px solid ${color}40`
        }}
      >
        <span 
          className="font-bold text-white"
          style={{ 
            fontSize: Math.max(size / 3, 12),
            color: color
          }}
        >
          {initial}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSource}
      alt={`${company.name} logo`}
      className={className || 'object-contain rounded'}
      style={{ width: size, height: size }}
      onError={handleImageError}
      onLoad={handleImageLoad}
      loading="lazy"
    />
  );
}
