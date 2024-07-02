import React from 'react';
import AppRouter from './router/Router';
import { useTheme } from './context/ThemeContext';


const App: React.FC = () => {
  const { theme} = useTheme();

  const backgroundClass = () => {
    if (theme === 'dark') {
      return 'bg-mobile-dark bg-[#313E51] text-white md:bg-tablet-dark lg:bg-desktop-dark';
    }
    return 'bg-mobile-light bg-[#F4F6FA] md:bg-tablet-light lg:bg-desktop-light';
  };

  return (
        <div className={`min-h-screen bg-cover bg-center font-rubik ${backgroundClass()}`}>
          <AppRouter />
        </div>
  );
};

export default App;

