import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hasWrongCards, getWrongCards, clearWrongCards } from "../utils/wrongCardsStorage";
import { UI_TEXT, ROUTES } from "../constants/uiConstants";
import { pluralize } from "../utils/stringUtils";
import "../styles/HomePage.css";

/**
 * Home page component - main entry point of the application
 * Displays navigation to different modes and redo option if wrong cards exist
 */
const HomePage = () => {
  const [showRedo, setShowRedo] = useState(false);
  const [wrongCardsCount, setWrongCardsCount] = useState(0);

  /**
   * Check for wrong cards on component mount and update state
   */
  useEffect(() => {
    const hasWrong = hasWrongCards();
    setShowRedo(hasWrong);
    if (hasWrong) {
      setWrongCardsCount(getWrongCards().length);
    }
  }, []);

  /**
   * Handles clearing all wrong cards
   */
  const handleClearWrongCards = () => {
    clearWrongCards();
    setShowRedo(false);
    setWrongCardsCount(0);
  };

  return (
    <div className="home-page">
      <h1>Spanish Flashcards</h1>
      <p className="welcome-message">Welcome! Choose a mode to start learning Spanish vocabulary.</p>
      
      {showRedo && (
        <div className="redo-section">
          <p className="redo-message">
            You have {wrongCardsCount} {pluralize(wrongCardsCount, "card")} to review
          </p>
          <div className="redo-buttons">
            <Link to={ROUTES.REDO} className="nav-button redo-button">
              {UI_TEXT.REDO_BUTTON}
            </Link>
            <button onClick={handleClearWrongCards} className="clear-button-small">
              {UI_TEXT.CLEAR_WRONG_CARDS}
            </button>
          </div>
        </div>
      )}
      
      <div className="navigation-buttons">
        <Link to="/study" className="nav-button study-button">
          📚 Study Mode
        </Link>
        <Link to="/quiz" className="nav-button quiz-button">
          📝 Quiz Mode
        </Link>
        <Link to="/stats" className="nav-button stats-button">
          📊 Stats Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

