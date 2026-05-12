"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 text-slate-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
