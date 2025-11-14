import type { Flashcard } from "../data/flashcards";

/**
 * Utility functions for managing wrong cards in localStorage
 * Provides persistent storage for cards marked as incorrect during study sessions
 */

const STORAGE_KEY = "flashcards_wrong_cards";

/**
 * Retrieves all wrong cards from localStorage
 * @returns Array of flashcards marked as wrong
 */
export const getWrongCards = (): Flashcard[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading wrong cards from storage:", error);
    return [];
  }
};

/**
 * Adds new wrong cards to localStorage
 * Prevents duplicates by checking if card already exists
 * @param cards - Array of flashcards to add to wrong cards list
 */
export const addWrongCards = (cards: Flashcard[]): void => {
  try {
    const existing = getWrongCards();
    const combined = [...existing];
    
    // Add only unique cards (check by spanish word as unique identifier)
    cards.forEach((card) => {
      const isDuplicate = existing.some(
        (existingCard) => 
          existingCard.spanish === card.spanish && 
          existingCard.category === card.category
      );
      if (!isDuplicate) {
        combined.push(card);
      }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  } catch (error) {
    console.error("Error saving wrong cards to storage:", error);
  }
};

/**
 * Clears all wrong cards from localStorage
 * Used when user wants to reset their wrong cards list
 */
export const clearWrongCards = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing wrong cards from storage:", error);
  }
};

/**
 * Removes specific cards from the wrong cards list
 * @param cardsToRemove - Array of flashcards to remove
 */
export const removeWrongCards = (cardsToRemove: Flashcard[]): void => {
  try {
    const existing = getWrongCards();
    const filtered = existing.filter((card) => 
      !cardsToRemove.some(
        (removeCard) => 
          removeCard.spanish === card.spanish && 
          removeCard.category === card.category
      )
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing wrong cards from storage:", error);
  }
};

/**
 * Checks if there are any wrong cards stored
 * @returns True if wrong cards exist, false otherwise
 */
export const hasWrongCards = (): boolean => {
  return getWrongCards().length > 0;
};

