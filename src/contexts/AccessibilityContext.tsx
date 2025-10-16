'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
  fontSize: 'normal' | 'large' | 'xl'
  contrast: 'normal' | 'high'
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  setFontSize: (size: 'normal' | 'large' | 'xl') => void
  setContrast: (contrast: 'normal' | 'high') => void
  setReducedMotion: (reduced: boolean) => void
  setScreenReader: (enabled: boolean) => void
  setKeyboardNavigation: (enabled: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal')
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [keyboardNavigation, setKeyboardNavigation] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'normal' | 'large' | 'xl'
    const savedContrast = localStorage.getItem('accessibility-contrast') as 'normal' | 'high'
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true'
    const savedScreenReader = localStorage.getItem('accessibility-screen-reader') === 'true'
    const savedKeyboardNavigation = localStorage.getItem('accessibility-keyboard-navigation') === 'true'

    if (savedFontSize) setFontSize(savedFontSize)
    if (savedContrast) setContrast(savedContrast)
    if (savedReducedMotion) setReducedMotion(savedReducedMotion)
    if (savedScreenReader) setScreenReader(savedScreenReader)
    if (savedKeyboardNavigation) setKeyboardNavigation(savedKeyboardNavigation)

    // Detect system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true)
    }
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setContrast('high')
    }
  }, [])

  useEffect(() => {
    // Apply font size to document
    document.documentElement.classList.remove('text-normal', 'text-large', 'text-xl')
    document.documentElement.classList.add(`text-${fontSize}`)
    localStorage.setItem('accessibility-font-size', fontSize)
  }, [fontSize])

  useEffect(() => {
    // Apply contrast to document
    document.documentElement.classList.toggle('high-contrast', contrast === 'high')
    localStorage.setItem('accessibility-contrast', contrast)
  }, [contrast])

  useEffect(() => {
    // Apply reduced motion
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
    localStorage.setItem('accessibility-reduced-motion', reducedMotion.toString())
  }, [reducedMotion])

  useEffect(() => {
    // Apply screen reader optimizations
    document.documentElement.classList.toggle('screen-reader', screenReader)
    localStorage.setItem('accessibility-screen-reader', screenReader.toString())
  }, [screenReader])

  useEffect(() => {
    // Apply keyboard navigation
    document.documentElement.classList.toggle('keyboard-navigation', keyboardNavigation)
    localStorage.setItem('accessibility-keyboard-navigation', keyboardNavigation.toString())
  }, [keyboardNavigation])

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      contrast,
      reducedMotion,
      screenReader,
      keyboardNavigation,
      setFontSize,
      setContrast,
      setReducedMotion,
      setScreenReader,
      setKeyboardNavigation,
    }}>
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

export { AccessibilityContext }