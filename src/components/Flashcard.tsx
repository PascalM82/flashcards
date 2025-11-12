import { useState } from "react";
import type { Flashcard as FlashcardType } from "../data/flashcards";
import { UI_TEXT } from "../constants/uiConstants";
import "../styles/Flashcard.css";

interface FlashcardProps {
  card: FlashcardType;
  onAnswer: (isCorrect: boolean) => void;
}

/**
 * Flashcard component that displays a Spanish word on the front
 * and English translation on the back with flip animation
 */
const Flashcard = ({ card, onAnswer }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * Handles the card flip interaction
   * Only allows flipping from front to back
   */
  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  /**
   * Handles answer submission and resets the card state
   * @param isCorrect - Whether the user answered correctly
   */
  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    setIsFlipped(false);
  };

  return (
    <div className="flashcard-container">
      <div className="flashcard-wrapper">
        <div 
          className={`flashcard ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          <div className="flashcard-front">
            <div className="flashcard-content">
              <h2 className="flashcard-text">{card.spanish}</h2>
              <p className="flashcard-hint">{UI_TEXT.FLASHCARD_CLICK_TO_FLIP}</p>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-content">
              <h2 className="flashcard-text">{card.english}</h2>
              <p className="flashcard-hint">{UI_TEXT.FLASHCARD_ENGLISH_TRANSLATION}</p>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flashcard-actions">
          <button
            className="answer-button answer-button-correct"
            onClick={() => handleAnswer(true)}
            aria-label="Mark as correct"
          >
            {UI_TEXT.FLASHCARD_BUTTON_CORRECT}
          </button>
          <button
            className="answer-button answer-button-incorrect"
            onClick={() => handleAnswer(false)}
            aria-label="Mark as incorrect"
          >
            {UI_TEXT.FLASHCARD_BUTTON_INCORRECT}
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;

