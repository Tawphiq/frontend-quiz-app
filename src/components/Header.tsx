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

  console.log("currentQuiz:", currentQuiz);
  console.log("currentQuiz icon:", currentQuiz?.icon);

  return (
    <header className="flex justify-between items-center p-5 md:py-8 md:px-20">
      <div className="flex items-center">
        {currentQuiz && (
          <div className="flex items-center">
            <div className={`w-8 h-8 md:w-12 md:h-12 grid justify-center items-center rounded-lg ${
              currentQuiz.title === "HTML" ? 'bg-orange-100'
              : currentQuiz.title === "CSS" ? 'bg-teal-100'
              : currentQuiz.title === "JavaScript" ? 'bg-blue-100'
              : 'bg-fuchsia-100'
              }`}>
              <img src={currentQuiz.icon} alt={currentQuiz.title} className="w-8 h-8" />
            </div>
            <span className="font-bold text-[#3B4D66] dark:text-white text-xl md:text-2xl ml-2">{currentQuiz.title}</span>
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

