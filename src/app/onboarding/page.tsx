'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { UserIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<'veteran' | 'consultant' | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="KAL's Consulting Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to KAL Claims Companion
          </h1>
          <p className="text-lg text-gray-600">
            Let's get you started with the right experience for your needs
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Veteran Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRole === 'veteran' 
                ? 'ring-2 ring-primary-500 border-primary-500' 
                : 'hover:border-primary-300'
            }`}
            onClick={() => setSelectedRole('veteran')}
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <UserIcon className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              
              <CardTitle className="text-xl mb-3">I'm a Veteran</CardTitle>
              <CardDescription className="text-base mb-6">
                Get help with your VA claims, track progress, and access resources for your benefits journey.
              </CardDescription>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Track your claims in real-time</span>
                </div>
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Secure messaging with consultants</span>
                </div>
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Educational resources and guides</span>
                </div>
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Mental health support tools</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consultant Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRole === 'consultant' 
                ? 'ring-2 ring-primary-500 border-primary-500' 
                : 'hover:border-primary-300'
            }`}
            onClick={() => setSelectedRole('consultant')}
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <UserGroupIcon className="h-12 w-12 text-green-600" />
                </div>
              </div>
              
              <CardTitle className="text-xl mb-3">I'm a Consultant</CardTitle>
              <CardDescription className="text-base mb-6">
                Manage your veteran clients, streamline case workflows, and access professional tools.
              </CardDescription>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Client management dashboard</span>
                </div>
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>AI-powered case analysis</span>
                </div>
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Document templates and tools</span>
                </div>
                <div className="flex items-center justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Performance analytics</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="text-center">
            <Link href={selectedRole === 'veteran' ? '/onboarding/veteran' : '/onboarding/consultant'}>
              <Button size="lg" className="px-8">
                Continue as {selectedRole === 'veteran' ? 'Veteran' : 'Consultant'}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        )}

        {/* Features Preview */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Why Choose KAL Claims Companion?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">$2.8M+</div>
              <div className="text-gray-600">Benefits Secured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">500+</div>
              <div className="text-gray-600">Veterans Served</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}