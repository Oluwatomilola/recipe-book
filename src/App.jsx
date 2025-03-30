import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter
import Home from './pages/Home';
import RecipeListPage from './pages/RecipeListPage'; // Correct import for RecipeListPage

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Home />} />
        <Route path="/recipe-list" element={<RecipeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;