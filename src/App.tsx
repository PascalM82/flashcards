import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategorySelectionPage from "./pages/CategorySelectionPage";
import StatsPage from "./pages/StatsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<CategorySelectionPage />} />
        <Route path="/quiz" element={<CategorySelectionPage />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* Placeholder routes for future implementation */}
        <Route path="/study/:category" element={<div>Study Mode - Coming in Phase 2</div>} />
        <Route path="/quiz/:category" element={<div>Quiz Mode - Coming in Phase 4</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
