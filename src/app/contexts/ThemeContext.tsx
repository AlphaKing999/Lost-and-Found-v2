import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'deuteranopia' | 'protanopia' | 'tritanopia';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  getColor: (colorKey: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color configurations for each theme
const themeColors = {
  light: {
    // Backgrounds
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    // Text
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    // Borders
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Accent colors
    accent1: '#7C9885',
    accent1Light: '#A4C2AD',
    accent1Dark: '#6B8774',
    
    accent2: '#E09F7D',
    accent2Light: '#F0B896',
    accent2Dark: '#D88C64',
    
    accent3: '#B4A5C5',
    accent3Light: '#D4C5E0',
    accent3Dark: '#9D8DB5',
  },
  dark: {
    // Backgrounds
    bgPrimary: '#0f0f0f',
    bgSecondary: '#1a1a1a',
    bgTertiary: '#2D3436',
    bgCard: 'rgba(26, 26, 26, 0.95)',
    bgCardHover: 'rgba(45, 52, 54, 0.95)',
    
    // Text
    textPrimary: '#ffffff',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    textLight: 'white',
    
    // Borders
    border: '#374151',
    borderHover: '#4b5563',
    
    // Accent colors (same as light for consistency)
    accent1: '#7C9885',
    accent1Light: '#A4C2AD',
    accent1Dark: '#6B8774',
    
    accent2: '#E09F7D',
    accent2Light: '#F0B896',
    accent2Dark: '#D88C64',
    
    accent3: '#B4A5C5',
    accent3Light: '#D4C5E0',
    accent3Dark: '#9D8DB5',
  },
  // Deuteranopia (red-green colorblind) - use blue/yellow/orange
  deuteranopia: {
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Blue as primary
    accent1: '#3b82f6',
    accent1Light: '#60a5fa',
    accent1Dark: '#2563eb',
    
    // Orange as secondary
    accent2: '#f59e0b',
    accent2Light: '#fbbf24',
    accent2Dark: '#d97706',
    
    // Yellow as tertiary
    accent3: '#eab308',
    accent3Light: '#facc15',
    accent3Dark: '#ca8a04',
  },
  // Protanopia (red-blind) - use blue/yellow/teal
  protanopia: {
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Teal as primary
    accent1: '#14b8a6',
    accent1Light: '#5eead4',
    accent1Dark: '#0d9488',
    
    // Blue as secondary
    accent2: '#3b82f6',
    accent2Light: '#60a5fa',
    accent2Dark: '#2563eb',
    
    // Yellow as tertiary
    accent3: '#eab308',
    accent3Light: '#facc15',
    accent3Dark: '#ca8a04',
  },
  // Tritanopia (blue-yellow colorblind) - use red/pink/cyan
  tritanopia: {
    bgPrimary: '#FDFCFA',
    bgSecondary: '#F7F6F3',
    bgTertiary: '#F0EDE8',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: 'rgba(255, 255, 255, 0.95)',
    
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
    textTertiary: '#95A5A6',
    textLight: 'white',
    
    border: '#E8E5E0',
    borderHover: '#D4D0CB',
    
    // Cyan as primary
    accent1: '#06b6d4',
    accent1Light: '#22d3ee',
    accent1Dark: '#0891b2',
    
    // Pink as secondary
    accent2: '#ec4899',
    accent2Light: '#f472b6',
    accent2Dark: '#db2777',
    
    // Red as tertiary
    accent3: '#ef4444',
    accent3Light: '#f87171',
    accent3Dark: '#dc2626',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Update document class for global styles
    document.documentElement.className = theme;
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const getColor = (colorKey: string): string => {
    return themeColors[theme][colorKey as keyof typeof themeColors.light] || colorKey;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
