"use client";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeButton() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="px-3 py-2 rounded-lg border">

            {darkMode ? "Claro" : "Escuro"}

        </button>
    );
}