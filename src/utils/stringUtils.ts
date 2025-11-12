/**
 * String utility functions for text manipulation
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a plural word based on count
 * @param count - The count to check
 * @param singular - The singular form of the word
 * @param plural - The plural form (defaults to singular + 's')
 * @returns The correctly pluralized word
 */
export const pluralize = (count: number, singular: string, plural?: string): string => {
  return count === 1 ? singular : (plural || `${singular}s`);
};

