import React from 'react';
import { motion } from 'framer-motion';
import { themes, Theme } from '../types/resume';
import { cn } from '../utils/cn';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
}

export const ThemeSelector = ({ selectedTheme, onThemeSelect }: ThemeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Choose Theme</h3>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme, index) => (
          <motion.button
            key={theme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onThemeSelect(theme.id)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all duration-200",
              "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              selectedTheme === theme.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-200"
            )}
          >
            <div className={cn("text-lg font-semibold mb-2", theme.primaryColor)}>
              {theme.name}
            </div>
            <div className={cn("text-sm", theme.secondaryColor)}>
              Sample Text
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};