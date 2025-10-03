"use client";

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDebug: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <h3 className="text-black dark:text-white font-bold mb-2">Theme Debug</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Current theme: <span className="font-mono text-green-600 dark:text-green-400">{theme}</span>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
        HTML class: <span className="font-mono">{typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</span>
      </p>
      <button
        onClick={toggleTheme}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeDebug;

