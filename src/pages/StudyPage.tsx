import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardsByCategory } from "../data/flashcards";
import type { Flashcard as FlashcardType } from "../data/flashcards";
import { validateCategory } from "../utils/categoryUtils";
import { capitalizeFirstLetter, pluralize } from "../utils/stringUtils";
import { UI_TEXT, ROUTES } from "../constants/uiConstants";
import Flashcard from "../components/Flashcard";
import "../styles/StudyPage.css";

/**
 * Study page component that displays flashcards for a selected category
 * Tracks progress, wrong answers, and provides navigation
 */
const StudyPage = () => {
  const { category: categoryParam } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<FlashcardType[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Validate category parameter
  const validatedCategory = useMemo(() => validateCategory(categoryParam), [categoryParam]);

  /**
   * Load flashcards for the selected category
   * Redirects to category selection if invalid category
   */
  useEffect(() => {
    if (validatedCategory) {
      const categoryCards = getCardsByCategory(validatedCategory);
      setCards(categoryCards);
    } else {
      navigate(ROUTES.STUDY);
    }
  }, [validatedCategory, navigate]);

  /**
   * Handles user's answer to a flashcard
   * Tracks wrong answers and advances to next card or completes the session
   * @param isCorrect - Whether the user answered correctly
   */
  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = cards[currentIndex];
    
    // Track incorrect answers for potential redo session
    if (!isCorrect) {
      setWrongAnswers((prev) => [...prev, currentCard]);
    }

    // Advance to next card or complete the session
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  /**
   * Navigates back to category selection page
   */
  const handleBackToCategories = () => {
    navigate(ROUTES.STUDY);
  };

  // Render completion screen
  if (isComplete) {
    return (
      <div className="study-page">
        <div className="study-complete">
          <h1>{UI_TEXT.STUDY_COMPLETE_TITLE}</h1>
          <p className="completion-message">
            You've finished studying all {cards.length} {pluralize(cards.length, "card")} in the {capitalizeFirstLetter(validatedCategory || "selected")} category.
          </p>
          {wrongAnswers.length > 0 && (
            <p className="wrong-answers-count">
              You got {wrongAnswers.length} {pluralize(wrongAnswers.length, "card")} wrong.
            </p>
          )}
          <button onClick={handleBackToCategories} className="back-button">
            {UI_TEXT.BACK_TO_CATEGORIES}
          </button>
        </div>
      </div>
    );
  }

  // Render loading state
  if (cards.length === 0) {
    return (
      <div className="study-page">
        <div className="study-loading">
          <p>{UI_TEXT.STUDY_LOADING}</p>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  // Render active study session
  return (
    <div className="study-page">
      <div className="study-header">
        <h1>{capitalizeFirstLetter(validatedCategory || "")} - {UI_TEXT.STUDY_MODE_TITLE_SUFFIX}</h1>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      <Flashcard card={currentCard} onAnswer={handleAnswer} />

      <button onClick={handleBackToCategories} className="back-button">
        {UI_TEXT.BACK_TO_CATEGORIES}
      </button>
    </div>
  );
};

export default StudyPage;

