/**
 * Category validation and utility functions
 */

// Valid category types
export type CategoryType = "animals" | "food" | "verbs";

// Array of valid categories for iteration
export const VALID_CATEGORIES: readonly CategoryType[] = ["animals", "food", "verbs"] as const;

/**
 * Type guard to check if a string is a valid category
 * @param value - The value to check
 * @returns True if the value is a valid category
 */
export const isValidCategory = (value: unknown): value is CategoryType => {
  return typeof value === "string" && VALID_CATEGORIES.includes(value as CategoryType);
};

/**
 * Validates and returns a category, or undefined if invalid
 * @param category - The category to validate
 * @returns The validated category or undefined
 */
export const validateCategory = (category: string | undefined): CategoryType | undefined => {
  return category && isValidCategory(category) ? category : undefined;
};

