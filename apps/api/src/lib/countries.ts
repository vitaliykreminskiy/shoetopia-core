/**
 * Country configuration with localization settings
 * Supports geo-detection, currency formatting, and regional preferences
 */

export type CountryCode = 'US' | 'AU' | 'GB' | 'CA' | 'DE' | 'FR' | 'IT' | 'NL' | 'IE' | 'AE'

export interface CountryConfig {
  code: CountryCode
  name: string
  flag: string
  currency: {
    code: string
    symbol: string
    position: 'before' | 'after'
  }
  locale: string
  dateFormat: string
  measurementSystem: 'imperial' | 'metric'
  sizeChart: 'us' | 'uk' | 'eu' | 'au'
  enabled: boolean // Whether this country has enough products to show
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: { code: 'USD', symbol: '$', position: 'before' },
    locale: 'en-US',
    dateFormat: 'MM/DD/YYYY',
    measurementSystem: 'imperial',
    sizeChart: 'us',
    enabled: true,
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: { code: 'AUD', symbol: 'A$', position: 'before' },
    locale: 'en-AU',
    dateFormat: 'DD/MM/YYYY',
    measurementSystem: 'metric',
    sizeChart: 'au',
    enabled: true,
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: { code: 'GBP', symbol: '£', position: 'before' },
    locale: 'en-GB',
    dateFormat: 'DD/MM/YYYY',
    measurementSystem: 'metric',
    sizeChart: 'uk',
    enabled: true,
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: { code: 'CAD', symbol: 'C$', position: 'before' },
    locale: 'en-CA',
    dateFormat: 'YYYY-MM-DD',
    measurementSystem: 'metric',
    sizeChart: 'us',
    enabled: true,
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    locale: 'de-DE',
    dateFormat: 'DD.MM.YYYY',
    measurementSystem: 'metric',
    sizeChart: 'eu',
    enabled: true,
  },
  FR: {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    locale: 'fr-FR',
    dateFormat: 'DD/MM/YYYY',
    measurementSystem: 'metric',
    sizeChart: 'eu',
    enabled: true,
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    locale: 'it-IT',
    dateFormat: 'DD/MM/YYYY',
    measurementSystem: 'metric',
    sizeChart: 'eu',
    enabled: true,
  },
  NL: {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    locale: 'nl-NL',
    dateFormat: 'DD-MM-YYYY',
    measurementSystem: 'metric',
    sizeChart: 'eu',
    enabled: true,
  },
  IE: {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    locale: 'en-IE',
    dateFormat: 'DD/MM/YYYY',
    measurementSystem: 'metric',
    sizeChart: 'uk',
    enabled: true,
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: { code: 'AED', symbol: 'د.إ', position: 'after' },
    locale: 'ar-AE',
    dateFormat: 'DD/MM/YYYY',
    measurementSystem: 'metric',
    sizeChart: 'eu',
    enabled: true,
  },
}

// Countries that are currently enabled for the site
export const ENABLED_COUNTRIES = Object.values(COUNTRIES).filter(c => c.enabled)

// Default country when geo-detection fails or country not supported
export const DEFAULT_COUNTRY: CountryCode = 'US'

// Cookie name for storing user's country preference
export const COUNTRY_COOKIE_NAME = 'shoetopia_country'

// Map IP country codes to our supported countries
// Vercel's x-vercel-ip-country returns ISO 3166-1 alpha-2 codes
export function mapIpCountryToSupported(ipCountry: string | null): CountryCode {
  if (!ipCountry) return DEFAULT_COUNTRY
  
  const upperCode = ipCountry.toUpperCase() as CountryCode
  
  // Check if it's a supported and enabled country
  if (COUNTRIES[upperCode]?.enabled) {
    return upperCode
  }
  
  // Fallback to default
  return DEFAULT_COUNTRY
}

// Format price according to country's currency settings
export function formatPrice(amount: number, countryCode: CountryCode = 'US'): string {
  const config = COUNTRIES[countryCode] || COUNTRIES.US
  const { currency, locale } = config
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    // Fallback formatting
    const formatted = amount.toFixed(2)
    return currency.position === 'before' 
      ? `${currency.symbol}${formatted}`
      : `${formatted} ${currency.symbol}`
  }
}

// Get country config from code, with fallback
export function getCountryConfig(code: string | null | undefined): CountryConfig {
  if (!code) return COUNTRIES[DEFAULT_COUNTRY]
  const upperCode = code.toUpperCase() as CountryCode
  return COUNTRIES[upperCode] || COUNTRIES[DEFAULT_COUNTRY]
}

// Validate if a country code is supported and enabled
export function isValidCountry(code: string | null | undefined): boolean {
  if (!code) return false
  const upperCode = code.toUpperCase() as CountryCode
  return COUNTRIES[upperCode]?.enabled ?? false
}

// Get URL prefix for country (empty for US, lowercase code for others)
export function getCountryUrlPrefix(code: CountryCode): string {
  return code === 'US' ? '' : `/${code.toLowerCase()}`
}

// Parse country from URL path
export function parseCountryFromPath(pathname: string): CountryCode {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return DEFAULT_COUNTRY
  
  const firstSegment = segments[0].toUpperCase() as CountryCode
  if (COUNTRIES[firstSegment]?.enabled) {
    return firstSegment
  }
  
  return DEFAULT_COUNTRY
}
