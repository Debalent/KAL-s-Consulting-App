'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

interface AccessibilityContextType {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  screenReaderMode: boolean
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void
  toggleScreenReaderMode: () => void
  announceToScreenReader: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'extra-large'>('medium')
  const [screenReaderMode, setScreenReaderMode] = useState(false)

  // Load preferences from localStorage
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true'
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true'
    const savedFontSize = localStorage.getItem('accessibility-font-size') as typeof fontSize || 'medium'
    const savedScreenReader = localStorage.getItem('accessibility-screen-reader') === 'true'

    setHighContrast(savedHighContrast)
    setReducedMotion(savedReducedMotion)
    setFontSize(savedFontSize)
    setScreenReaderMode(savedScreenReader)

    // Apply initial classes
    document.documentElement.classList.toggle('high-contrast', savedHighContrast)
    document.documentElement.classList.toggle('reduced-motion', savedReducedMotion)
    document.documentElement.classList.toggle('screen-reader-mode', savedScreenReader)
    document.documentElement.setAttribute('data-font-size', savedFontSize)
  }, [])

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem('accessibility-high-contrast', String(newValue))
    document.documentElement.classList.toggle('high-contrast', newValue)
    announceToScreenReader(newValue ? 'High contrast mode enabled' : 'High contrast mode disabled')
  }

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion
    setReducedMotion(newValue)
    localStorage.setItem('accessibility-reduced-motion', String(newValue))
    document.documentElement.classList.toggle('reduced-motion', newValue)
    announceToScreenReader(newValue ? 'Reduced motion enabled' : 'Reduced motion disabled')
  }

  const handleSetFontSize = (size: typeof fontSize) => {
    setFontSize(size)
    localStorage.setItem('accessibility-font-size', size)
    document.documentElement.setAttribute('data-font-size', size)
    announceToScreenReader(`Font size changed to ${size}`)
  }

  const toggleScreenReaderMode = () => {
    const newValue = !screenReaderMode
    setScreenReaderMode(newValue)
    localStorage.setItem('accessibility-screen-reader', String(newValue))
    document.documentElement.classList.toggle('screen-reader-mode', newValue)
    announceToScreenReader(newValue ? 'Screen reader mode enabled' : 'Screen reader mode disabled')
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  const value = {
    highContrast,
    reducedMotion,
    fontSize,
    screenReaderMode,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize: handleSetFontSize,
    toggleScreenReaderMode,
    announceToScreenReader
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </NextThemeProvider>
  )
}