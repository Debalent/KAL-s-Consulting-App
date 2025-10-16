'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useAccessibility } from '@/components/providers/theme-provider'
import {
  AdjustmentsHorizontalIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  EyeIcon,
  SpeakerWaveIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const {
    highContrast,
    reducedMotion,
    fontSize,
    screenReaderMode,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
    toggleScreenReaderMode,
    announceToScreenReader
  } = useAccessibility()

  const handleOpen = () => {
    setIsOpen(true)
    announceToScreenReader('Accessibility menu opened')
  }

  const handleClose = () => {
    setIsOpen(false)
    announceToScreenReader('Accessibility menu closed')
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    announceToScreenReader(`Theme changed to ${newTheme}`)
  }

  return (
    <>
      {/* Accessibility Menu Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpen}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open accessibility menu"
        title="Accessibility Options"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
      </Button>

      {/* Accessibility Menu Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Accessibility Options</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                aria-label="Close accessibility menu"
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div>
                <h3 className="font-semibold mb-3">Theme Preference</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleThemeChange('light')}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <SunIcon className="h-4 w-4 mb-1" />
                    <span className="text-xs">Light</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleThemeChange('dark')}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <MoonIcon className="h-4 w-4 mb-1" />
                    <span className="text-xs">Dark</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleThemeChange('system')}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <ComputerDesktopIcon className="h-4 w-4 mb-1" />
                    <span className="text-xs">System</span>
                  </Button>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <h3 className="font-semibold mb-3">Text Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
                    <Button
                      key={size}
                      variant={fontSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize(size)}
                      className="text-xs"
                    >
                      {size === 'extra-large' ? 'Extra Large' : size.charAt(0).toUpperCase() + size.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Vision Accessibility */}
              <div>
                <h3 className="font-semibold mb-3">Vision Assistance</h3>
                <div className="space-y-2">
                  <Button
                    variant={highContrast ? 'default' : 'outline'}
                    size="sm"
                    onClick={toggleHighContrast}
                    className="w-full justify-start"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    High Contrast Mode
                  </Button>
                  
                  <Button
                    variant={screenReaderMode ? 'default' : 'outline'}
                    size="sm"
                    onClick={toggleScreenReaderMode}
                    className="w-full justify-start"
                  >
                    <SpeakerWaveIcon className="h-4 w-4 mr-2" />
                    Screen Reader Mode
                  </Button>
                </div>
              </div>

              {/* Motion Preferences */}
              <div>
                <h3 className="font-semibold mb-3">Motion Preferences</h3>
                <Button
                  variant={reducedMotion ? 'default' : 'outline'}
                  size="sm"
                  onClick={toggleReducedMotion}
                  className="w-full justify-start"
                >
                  Reduce Animations
                </Button>
              </div>

              {/* Keyboard Navigation Info */}
              <div className="text-sm text-gray-600 dark:text-gray-400 border-t pt-4">
                <h4 className="font-medium mb-2">Keyboard Navigation:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Tab: Navigate forward</li>
                  <li>• Shift + Tab: Navigate backward</li>
                  <li>• Enter/Space: Activate buttons</li>
                  <li>• Escape: Close menus</li>
                  <li>• Arrow keys: Navigate lists</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}