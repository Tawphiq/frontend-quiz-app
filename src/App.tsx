import React from 'react';
import AppRouter from './router/Router';
import { QuizProvider } from './context/QuizContext';
import { useTheme } from './context/ThemeContext';


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
        <div className={`min-h-screen bg-cover bg-center font-rubik ${backgroundClass()}`}>
          <AppRouter />
        </div>
    </QuizProvider>
  );
};

export default App;

