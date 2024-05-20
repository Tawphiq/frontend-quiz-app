// src/components/Header.tsx
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import sunlight from '../assets/images/icon-sun-light.svg';
import sundark from '../assets/images/icon-sun-dark.svg';
import moonlight from '../assets/images/icon-moon-light.svg';
import moondark from '../assets/images/icon-moon-dark.svg';

const Header: React.FC = () => {
    const { theme} = useTheme();

  return (
    <header className="flex justify-end items-center gap-1 md:gap-2 p-5 md:p-10">
      {theme === 'dark'? <img src={sunlight}/>:<img src={sundark}/>}
      <ThemeToggle />
      {theme === 'dark'? <img src={moonlight}/>:<img src={moondark}/>}
    </header>
  );
};

export default Header;
