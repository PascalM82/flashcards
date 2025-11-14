import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategorySelectionPage from "./pages/CategorySelectionPage";
import StudyPage from "./pages/StudyPage";
import RedoPage from "./pages/RedoPage";
import StatsPage from "./pages/StatsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<CategorySelectionPage />} />
        <Route path="/study/:category" element={<StudyPage />} />
        <Route path="/redo" element={<RedoPage />} />
        <Route path="/quiz" element={<CategorySelectionPage />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* Placeholder routes for future implementation */}
        <Route path="/quiz/:category" element={<div>Quiz Mode - Coming in Phase 4</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
