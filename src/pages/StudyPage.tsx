import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardsByCategory } from "../data/flashcards";
import type { Flashcard as FlashcardType } from "../data/flashcards";
import Flashcard from "../components/Flashcard";
import "../styles/StudyPage.css";

const StudyPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<FlashcardType[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (category && (category === "animals" || category === "food" || category === "verbs")) {
      const categoryCards = getCardsByCategory(category);
      setCards(categoryCards);
    } else {
      navigate("/study");
    }
  }, [category, navigate]);

  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = cards[currentIndex];
    
    if (!isCorrect) {
      setWrongAnswers((prev) => [...prev, currentCard]);
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBackToCategories = () => {
    navigate("/study");
  };

  if (isComplete) {
    return (
      <div className="study-page">
        <div className="study-complete">
          <h1>Study Complete! 🎉</h1>
          <p className="completion-message">
            You've finished studying all {cards.length} cards in the {category || "selected"} category.
          </p>
          {wrongAnswers.length > 0 && (
            <p className="wrong-answers-count">
              You got {wrongAnswers.length} card{wrongAnswers.length !== 1 ? "s" : ""} wrong.
            </p>
          )}
          <button onClick={handleBackToCategories} className="back-button">
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="study-page">
        <div className="study-loading">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="study-page">
      <div className="study-header">
        <h1>{(category?.charAt(0).toUpperCase() || "") + (category?.slice(1) || "")} - Study Mode</h1>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      <Flashcard card={currentCard} onAnswer={handleAnswer} />

      <button onClick={handleBackToCategories} className="back-button">
        ← Back to Categories
      </button>
    </div>
  );
};

export default StudyPage;

