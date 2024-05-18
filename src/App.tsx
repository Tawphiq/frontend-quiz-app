import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import { QuizProvider } from './context/QuizContext';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <QuizProvider>
      <Router>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <header className="p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl">Quiz App</h1>
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
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
