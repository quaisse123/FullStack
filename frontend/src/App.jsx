// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import './index.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
