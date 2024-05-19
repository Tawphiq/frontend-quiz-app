import React from 'react';
import { useTheme } from '../context/ThemeContext';


const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return(
        <header className="p-4 grid justify-end">
           <button
              onClick={toggleTheme}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </header>
    )

}


export default Header;