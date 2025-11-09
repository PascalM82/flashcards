import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Spanish Flashcards</h1>
      <p className="welcome-message">Welcome! Choose a mode to start learning Spanish vocabulary.</p>
      
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

