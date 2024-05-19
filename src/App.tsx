import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import { QuizProvider } from './context/QuizContext';
import { useTheme } from './context/ThemeContext';
import Header from './components/Header';

const App: React.FC = () => {
  const { theme} = useTheme();

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
          <Header />
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

