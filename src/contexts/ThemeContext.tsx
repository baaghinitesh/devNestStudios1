import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'aurora' | 'matrix'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme
      if (stored && ['light', 'dark', 'aurora', 'matrix'].includes(stored)) {
        return stored
      }
      // Auto-detect system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'aurora', 'matrix')
    
    // Add current theme class
    if (theme === 'light') {
      // Light theme is default, no class needed
    } else {
      root.classList.add(theme)
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const colors = {
        light: '#ffffff',
        dark: '#0f0f0f',
        aurora: '#0f1419',
        matrix: '#001100'
      }
      metaThemeColor.setAttribute('content', colors[theme])
    }
  }, [theme])

  const isDark = theme !== 'light'

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme configurations for UI components
export const themes = {
  light: {
    name: 'light',
    label: 'Light',
    className: '',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#ffffff',
      foreground: '#0f172a'
    }
  },
  dark: {
    name: 'dark',
    label: 'Dark',
    className: 'dark',
    colors: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      accent: '#06b6d4',
      background: '#0f172a',
      foreground: '#f1f5f9'
    }
  },
  aurora: {
    name: 'aurora',
    label: 'Aurora',
    className: 'aurora',
    colors: {
      primary: '#10b981',
      secondary: '#6b7280',
      accent: '#06b6d4',
      background: '#0f1419',
      foreground: '#f9fafb'
    }
  },
  matrix: {
    name: 'matrix',
    label: 'Matrix',
    className: 'matrix',
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#00ff41',
      background: '#001100',
      foreground: '#00ff00'
    }
  }
} as const