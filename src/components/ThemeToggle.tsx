import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    // Set data-theme attribute
    root.setAttribute("data-theme", theme);

    // Also set class for compatibility
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-3 rounded-full bg-background border border-border transition-all duration-300 hover:shadow-lg"
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 180 : 0,
          scale: theme === "light" ? 1 : 0.9,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-6 h-6 flex items-center justify-center"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {theme === "light" ? (
            <FiSun className="w-6 h-6 text-yellow-500" />
          ) : (
            <FiMoon className="w-6 h-6 text-primary" />
          )}
        </div>
      </motion.div>
    </motion.button>
  );
};
