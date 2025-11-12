import { useState } from "react";
import type { Flashcard as FlashcardType } from "../data/flashcards";
import "../styles/Flashcard.css";

interface FlashcardProps {
  card: FlashcardType;
  onAnswer: (isCorrect: boolean) => void;
}

const Flashcard = ({ card, onAnswer }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

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
              <p className="flashcard-hint">Click to flip</p>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-content">
              <h2 className="flashcard-text">{card.english}</h2>
              <p className="flashcard-hint">English translation</p>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flashcard-actions">
          <button
            className="answer-button answer-button-correct"
            onClick={() => handleAnswer(true)}
          >
            ✅ I got it right
          </button>
          <button
            className="answer-button answer-button-incorrect"
            onClick={() => handleAnswer(false)}
          >
            ❌ I got it wrong
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;

