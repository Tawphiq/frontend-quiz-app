import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import { QuizProvider } from './context/QuizContext';
import './index.css'; // Ensure Tailwind CSS is imported

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
};

export default App;
