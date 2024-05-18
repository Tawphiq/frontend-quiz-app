import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import { QuizProvider } from './context/QuizContext';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const backgroundClass = () => {
    if (theme === 'dark') {
      return 'bg-mobile-dark bg-darkbg text-white md:bg-tablet-dark lg:bg-desktop-dark';
    }
    return 'bg-mobile-light bg-lightbg md:bg-tablet-light lg:bg-desktop-light';
  };

  return (
    <QuizProvider>
      <Router>
        <div className={`min-h-screen bg-cover bg-center ${backgroundClass()}`}>
          <header className="p-4 grid justify-end">
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

