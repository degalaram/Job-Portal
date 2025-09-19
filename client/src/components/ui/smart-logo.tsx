
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
      'accenture': 'https://logo.clearbit.com/accenture.com',
      'wipro': 'https://logo.clearbit.com/wipro.com',
      'capgemini': 'https://logo.clearbit.com/capgemini.com',
      'cognizant': 'https://logo.clearbit.com/cognizant.com',
      'deloitte': 'https://logo.clearbit.com/deloitte.com',
      'ibm': 'https://logo.clearbit.com/ibm.com',
      'oracle': 'https://logo.clearbit.com/oracle.com',
      'salesforce': 'https://logo.clearbit.com/salesforce.com',
      'adobe': 'https://logo.clearbit.com/adobe.com',
      'netflix': 'https://logo.clearbit.com/netflix.com'
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
        
        // Add reliable logo sources
        sources.push(
          `https://logo.clearbit.com/${domain}`,
          `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
        );
      } catch (error) {
        console.log('Error parsing website URL:', error);
      }
    }

    // 4. Fallback based on company name
    const cleanName = normalizedName.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '').toLowerCase();
    if (cleanName && cleanName.length > 2) {
      sources.push(
        `https://logo.clearbit.com/${cleanName}.com`
      );
    }

    // Remove duplicates
    return [...new Set(sources)];
  }, [company]);

  const logoSources = generateLogoSources();
  const currentSource = logoSources[currentSourceIndex];

  const handleImageError = useCallback(() => {
    if (currentSourceIndex < logoSources.length - 1) {
      setCurrentSourceIndex(prev => prev + 1);
    } else {
      setHasImageError(true);
    }
  }, [currentSourceIndex, logoSources.length]);

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
    const colorIndex = Math.abs(company.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
    const color = colors[colorIndex];

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
          className="font-bold"
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
