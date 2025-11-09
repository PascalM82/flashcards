import { Link } from "react-router-dom";
import "../styles/StatsPage.css";

const StatsPage = () => {
  return (
    <div className="stats-page">
      <h1>Statistics</h1>
      <p className="coming-soon">Statistics tracking will be available in Phase 5.</p>
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
    </div>
  );
};

export default StatsPage;

