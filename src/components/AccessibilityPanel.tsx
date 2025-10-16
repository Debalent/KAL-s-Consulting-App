'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { 
  SunIcon, 
  MoonIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  SpeakerWaveIcon,
  KeyboardIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { useAccessibility } from '@/contexts/AccessibilityContext'

interface AccessibilityPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const {
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
  } = useAccessibility()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Accessibility Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close accessibility panel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="flex items-center justify-center"
                >
                  <SunIcon className="w-4 h-4 mr-1" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="flex items-center justify-center"
                >
                  <MoonIcon className="w-4 h-4 mr-1" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                  className="flex items-center justify-center"
                >
                  System
                </Button>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Font Size</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={fontSize === 'normal' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('normal')}
                >
                  Normal
                </Button>
                <Button
                  variant={fontSize === 'large' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('large')}
                >
                  Large
                </Button>
                <Button
                  variant={fontSize === 'xl' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize('xl')}
                >
                  Extra Large
                </Button>
              </div>
            </div>

            {/* Contrast */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Contrast</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={contrast === 'normal' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setContrast('normal')}
                >
                  Normal
                </Button>
                <Button
                  variant={contrast === 'high' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setContrast('high')}
                >
                  High Contrast
                </Button>
              </div>
            </div>

            {/* Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <label className="text-gray-900 dark:text-white font-medium">
                  Reduce Motion
                </label>
              </div>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  reducedMotion ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                aria-label="Toggle reduced motion"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Screen Reader */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SpeakerWaveIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <label className="text-gray-900 dark:text-white font-medium">
                  Screen Reader Mode
                </label>
              </div>
              <button
                onClick={() => setScreenReader(!screenReader)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  screenReader ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                aria-label="Toggle screen reader mode"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    screenReader ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Keyboard Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <KeyboardIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <label className="text-gray-900 dark:text-white font-medium">
                  Enhanced Keyboard Navigation
                </label>
              </div>
              <button
                onClick={() => setKeyboardNavigation(!keyboardNavigation)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  keyboardNavigation ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                aria-label="Toggle enhanced keyboard navigation"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              These settings will be saved to your device and applied across all pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AccessibilityToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <EyeIcon className="w-6 h-6" />
      </button>
      
      <AccessibilityPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}