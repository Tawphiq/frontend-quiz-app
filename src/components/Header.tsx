// src/components/Header.tsx
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';
import sunlight from '../assets/images/icon-sun-light.svg';
import sundark from '../assets/images/icon-sun-dark.svg';
import moonlight from '../assets/images/icon-moon-light.svg';
import moondark from '../assets/images/icon-moon-dark.svg';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { currentQuiz } = useQuiz();

  return (
    <header className="flex justify-between items-center p-5 md:p-10">
      <div className="flex items-center">
        {currentQuiz && (
          <div className="flex items-center">
            <div className={`w-8 h-8 md:w-12 md:h-12 grid justify-center items-center ${currentQuiz.iconbg} rounded-lg`}>
              <img src={currentQuiz.icon} alt={currentQuiz.title} className="w-8 h-8" />
            </div>
            <span className="font-bold text-dark dark:text-white text-xl md:text-2xl ml-2">{currentQuiz.title}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        {theme === 'dark' ? <img src={sunlight} alt="sun icon" /> : <img src={sundark} alt="sun icon" />}
        <ThemeToggle />
        {theme === 'dark' ? <img src={moonlight} alt="moon icon" /> : <img src={moondark} alt="moon icon" />}
      </div>
    </header>
  );
};

export default Header;

