/**
 * UI constants and text labels used throughout the application
 */

export const UI_TEXT = {
  // Flashcard component
  FLASHCARD_CLICK_TO_FLIP: "Click to flip",
  FLASHCARD_ENGLISH_TRANSLATION: "English translation",
  FLASHCARD_BUTTON_CORRECT: "✅ I got it right",
  FLASHCARD_BUTTON_INCORRECT: "❌ I got it wrong",

  // Study page
  STUDY_MODE_TITLE_SUFFIX: "Study Mode",
  STUDY_COMPLETE_TITLE: "Study Complete! 🎉",
  STUDY_LOADING: "Loading...",
  
  // Redo mode
  REDO_MODE_TITLE_SUFFIX: "Redo Mode",
  REDO_BUTTON: "🔄 Redo Wrong Cards",
  REDO_COMPLETE_TITLE: "Redo Complete! 🎉",
  CLEAR_WRONG_CARDS: "Clear Wrong Cards",
  NO_WRONG_CARDS: "No wrong cards to review",
  
  // Navigation
  BACK_TO_CATEGORIES: "← Back to Categories",
  BACK_TO_HOME: "← Back to Home",
  
  // Messages
  MODE_LABEL: "Mode:",
} as const;

export const ROUTES = {
  HOME: "/",
  STUDY: "/study",
  QUIZ: "/quiz",
  STATS: "/stats",
  REDO: "/redo",
} as const;

