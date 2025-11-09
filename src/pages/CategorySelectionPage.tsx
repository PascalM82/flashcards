import { useNavigate, useLocation } from "react-router-dom";
import { categories } from "../data/flashcards";
import "../styles/CategorySelectionPage.css";

const CategorySelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname === "/quiz" ? "quiz" : "study";

  const handleCategorySelect = (category: string) => {
    if (mode === "study") {
      navigate(`/study/${category}`);
    } else if (mode === "quiz") {
      navigate(`/quiz/${category}`);
    }
  };

  return (
    <div className={`category-selection-page ${mode}-mode`}>
      <h1>Select a Category</h1>
      <p className="mode-indicator">Mode: <strong>{mode === "study" ? "Study" : "Quiz"}</strong></p>
      
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`category-button ${mode}-mode-button`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <button onClick={() => navigate("/")} className="back-button">
        ← Back to Home
      </button>
    </div>
  );
};

export default CategorySelectionPage;

