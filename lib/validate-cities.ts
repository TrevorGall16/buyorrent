/**
 * Simple schema validation for cities.json
 * Ensures data integrity without external dependencies
 */

import { CountryCode } from './types';

interface CityData {
  slug: string;
  name: string;
  state: string | null;
  country_code: CountryCode;
  currency_symbol: string;
  data_updated: string;
  defaults: {
    avg_home_price: number;
    avg_rent: number;
    closing_cost_rate: number;
    property_tax_rate: number;
  };
}

/**
 * Validate a single city data entry
 */
function validateCityData(city: any, index: number): city is CityData {
  const errors: string[] = [];

  // Check required string fields
  if (!city.slug || typeof city.slug !== 'string') {
    errors.push(`City ${index}: Missing or invalid 'slug'`);
  }
  if (!city.name || typeof city.name !== 'string') {
    errors.push(`City ${index}: Missing or invalid 'name'`);
  }
  if (city.state !== null && typeof city.state !== 'string') {
    errors.push(`City ${index}: Invalid 'state' (must be string or null)`);
  }

  // Check country_code
  const validCountryCodes: CountryCode[] = ['US', 'FR', 'DE', 'GB'];
  if (!validCountryCodes.includes(city.country_code)) {
    errors.push(`City ${index} (${city.name}): Invalid 'country_code' (must be US, FR, DE, or GB)`);
  }

  // Check currency symbol
  if (!city.currency_symbol || typeof city.currency_symbol !== 'string') {
    errors.push(`City ${index} (${city.name}): Missing or invalid 'currency_symbol'`);
  }

  // Check data_updated
  if (!city.data_updated || typeof city.data_updated !== 'string') {
    errors.push(`City ${index} (${city.name}): Missing or invalid 'data_updated'`);
  }

  // Check defaults object
  if (!city.defaults || typeof city.defaults !== 'object') {
    errors.push(`City ${index} (${city.name}): Missing or invalid 'defaults' object`);
  } else {
    // Validate numeric fields in defaults
    const numericFields = [
      'avg_home_price',
      'avg_rent',
      'closing_cost_rate',
      'property_tax_rate',
    ];

    numericFields.forEach((field) => {
      const value = city.defaults[field];
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        errors.push(`City ${index} (${city.name}): Invalid '${field}' (must be a finite number)`);
      }
      if (value < 0) {
        errors.push(`City ${index} (${city.name}): '${field}' cannot be negative`);
      }
    });

    // Check reasonable ranges
    if (city.defaults.avg_home_price > 0 && city.defaults.avg_home_price < 10000) {
      errors.push(`City ${index} (${city.name}): 'avg_home_price' seems too low (${city.defaults.avg_home_price})`);
    }
    if (city.defaults.avg_rent > 0 && city.defaults.avg_rent < 100) {
      errors.push(`City ${index} (${city.name}): 'avg_rent' seems too low (${city.defaults.avg_rent})`);
    }
    if (city.defaults.closing_cost_rate > 0.5) {
      errors.push(`City ${index} (${city.name}): 'closing_cost_rate' seems too high (${city.defaults.closing_cost_rate * 100}%)`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`City data validation failed:\n${errors.join('\n')}`);
  }

  return true;
}

/**
 * Validate all cities data
 */
export function validateCitiesData(cities: any[]): cities is CityData[] {
  if (!Array.isArray(cities)) {
    throw new Error('Cities data must be an array');
  }

  if (cities.length === 0) {
    throw new Error('Cities data cannot be empty');
  }

  // Check for duplicate slugs
  const slugs = cities.map((c) => c.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    throw new Error(`Duplicate city slugs found: ${duplicateSlugs.join(', ')}`);
  }

  // Validate each city
  cities.forEach((city, index) => {
    validateCityData(city, index);
  });

  return true;
}
