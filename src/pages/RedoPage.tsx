import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Flashcard as FlashcardType } from "../data/flashcards";
import { getWrongCards, clearWrongCards, removeWrongCards } from "../utils/wrongCardsStorage";
import { UI_TEXT, ROUTES } from "../constants/uiConstants";
import { pluralize } from "../utils/stringUtils";
import Flashcard from "../components/Flashcard";
import "../styles/StudyPage.css";

/**
 * Redo page component that displays only cards marked as wrong
 * Allows users to review and practice cards they got incorrect
 */
const RedoPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<FlashcardType[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  /**
   * Load wrong cards from localStorage on component mount
   */
  useEffect(() => {
    const wrongCards = getWrongCards();
    if (wrongCards.length === 0) {
      // No wrong cards to review, redirect to home
      navigate(ROUTES.HOME);
    } else {
      setCards(wrongCards);
    }
  }, [navigate]);

  /**
   * Handles user's answer to a flashcard
   * Tracks correct answers to remove from wrong cards list
   * @param isCorrect - Whether the user answered correctly
   */
  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = cards[currentIndex];
    
    // Track cards that are now correct (to remove from wrong list)
    if (isCorrect) {
      setCorrectAnswers((prev) => [...prev, currentCard]);
    }

    // Advance to next card or complete the session
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
      // Remove correctly answered cards from wrong cards list
      if (correctAnswers.length > 0 || isCorrect) {
        const cardsToRemove = isCorrect 
          ? [...correctAnswers, currentCard] 
          : correctAnswers;
        removeWrongCards(cardsToRemove);
      }
    }
  };

  /**
   * Navigates back to home page
   */
  const handleBackToHome = () => {
    navigate(ROUTES.HOME);
  };

  /**
   * Clears all wrong cards and returns to home
   */
  const handleClearWrongCards = () => {
    clearWrongCards();
    navigate(ROUTES.HOME);
  };

  // Render completion screen
  if (isComplete) {
    const stillWrong = cards.length - correctAnswers.length;
    
    return (
      <div className="study-page">
        <div className="study-complete">
          <h1>{UI_TEXT.REDO_COMPLETE_TITLE}</h1>
          <p className="completion-message">
            You've finished reviewing all {cards.length} {pluralize(cards.length, "card")}.
          </p>
          <p className="completion-stats">
            ✅ Got right this time: {correctAnswers.length} {pluralize(correctAnswers.length, "card")}
          </p>
          {stillWrong > 0 && (
            <>
              <p className="wrong-answers-count">
                ❌ Still need practice: {stillWrong} {pluralize(stillWrong, "card")}
              </p>
              <button onClick={() => window.location.reload()} className="back-button redo-again-button">
                {UI_TEXT.REDO_BUTTON}
              </button>
            </>
          )}
          {stillWrong === 0 && (
            <p className="success-message">
              🎉 Perfect! You got all cards right!
            </p>
          )}
          <button onClick={handleClearWrongCards} className="back-button clear-button">
            {UI_TEXT.CLEAR_WRONG_CARDS}
          </button>
          <button onClick={handleBackToHome} className="back-button">
            {UI_TEXT.BACK_TO_HOME}
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

  // Render active redo session
  return (
    <div className="study-page">
      <div className="study-header">
        <h1>{UI_TEXT.REDO_MODE_TITLE_SUFFIX}</h1>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      <Flashcard card={currentCard} onAnswer={handleAnswer} />

      <button onClick={handleBackToHome} className="back-button">
        {UI_TEXT.BACK_TO_HOME}
      </button>
    </div>
  );
};

export default RedoPage;

