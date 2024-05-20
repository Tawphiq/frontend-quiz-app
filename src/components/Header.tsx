// src/components/Header.tsx
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="flex justify-end items-center p-5 md:p-10">
      <ThemeToggle />
    </header>
  );
};

export default Header;
