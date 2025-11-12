import { useNavigate, useLocation } from "react-router-dom";
import { categories } from "../data/flashcards";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import { UI_TEXT, ROUTES } from "../constants/uiConstants";
import "../styles/CategorySelectionPage.css";

/**
 * Category selection page component
 * Allows users to choose a category for either study or quiz mode
 */
const CategorySelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine current mode based on URL path
  const mode = location.pathname === ROUTES.QUIZ ? "quiz" : "study";
  const modeLabel = capitalizeFirstLetter(mode);

  /**
   * Handles category selection and navigates to the appropriate page
   * @param category - The selected category
   */
  const handleCategorySelect = (category: string) => {
    if (mode === "study") {
      navigate(`${ROUTES.STUDY}/${category}`);
    } else if (mode === "quiz") {
      navigate(`${ROUTES.QUIZ}/${category}`);
    }
  };

  return (
    <div className={`category-selection-page ${mode}-mode`}>
      <h1>Select a Category</h1>
      <p className="mode-indicator">
        {UI_TEXT.MODE_LABEL} <strong>{modeLabel}</strong>
      </p>
      
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`category-button ${mode}-mode-button`}
            aria-label={`Select ${category} category`}
          >
            {capitalizeFirstLetter(category)}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => navigate(ROUTES.HOME)} 
        className="back-button"
        aria-label="Go back to home page"
      >
        {UI_TEXT.BACK_TO_HOME}
      </button>
    </div>
  );
};

export default CategorySelectionPage;

