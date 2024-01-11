import { createContext, useContext, useState } from 'react';
import Cookies from "js-cookie";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Cookies.get('theme') || 'light');

    const toggleTheme = () => {
        Cookies.set('theme', theme !== 'light' ? 'light' : 'dark', { path: '/' });
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
