"use client";

import react from "react";
import{ createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider ({ children}){
    const [darkMode, setDarkMode] = useState(false);



    useEffect(()=> {
        const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
    }
}, []);


    const toggleTheme = () => {
        
        const newTheme = !darkMode;
        
        
        setDarkMode(newTheme);

        if (newTheme){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else{ 
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        
    };


    return(
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );

}

export const useTheme = () =>useContext(ThemeContext);
