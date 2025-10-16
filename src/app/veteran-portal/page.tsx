'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  HeartIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { Progress } from '@/components/ui/progress'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function VeteranPortalPage() {
  const [claims] = useState([
    {
      id: 1,
      type: 'PTSD Claim',
      status: 'In Review',
      progress: 65,
      lastUpdate: '2 days ago',
      nextStep: 'Medical examination scheduled',
      priority: 'high'
    },
    {
      id: 2,
      type: 'Hearing Loss',
      status: 'Evidence Collection',
      progress: 45,
      lastUpdate: '1 week ago',
      nextStep: 'Submit audiogram results',
      priority: 'medium'
    }
  ])

  const [notifications] = useState([
    { id: 1, message: 'Medical examination reminder for tomorrow at 2:00 PM', time: '2 hours ago', type: 'urgent' },
    { id: 2, message: 'New document uploaded by your consultant', time: '1 day ago', type: 'info' },
    { id: 3, message: 'Claim status updated: PTSD Claim moved to Review stage', time: '3 days ago', type: 'success' }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="KAL's Consulting Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Veteran Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, John</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="relative p-2 text-gray-400 hover:text-gray-600"
                title="View notifications"
                aria-label="View notifications"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Settings"
                aria-label="Settings"
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <QuickActionCard
            icon={<ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />}
            title="Claim Status"
            description="Track your claims"
            href="/veteran-portal/claims"
          />
          <QuickActionCard
            icon={<ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600" />}
            title="Messages"
            description="Chat with consultant"
            href="/veteran-portal/messages"
            badge="2"
          />
          <QuickActionCard
            icon={<BookOpenIcon className="h-8 w-8 text-purple-600" />}
            title="Knowledge Hub"
            description="Resources & guides"
            href="/veteran-portal/knowledge"
          />
          <QuickActionCard
            icon={<HeartIcon className="h-8 w-8 text-red-600" />}
            title="Wellness Check"
            description="Mental health support"
            href="/veteran-portal/wellness"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Claims */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Claims</CardTitle>
                <CardDescription>Track the progress of your current claims</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {claims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} />
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Claims
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
                
                <Button variant="ghost" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Medical Examination</p>
                    <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                    <p className="text-xs text-gray-500">VA Medical Center</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Consultant Meeting</p>
                    <p className="text-sm text-gray-600">Friday, 10:00 AM</p>
                    <p className="text-xs text-gray-500">Video Call</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BookOpenIcon className="mr-2 h-4 w-4" />
                  FAQ
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <HeartIcon className="mr-2 h-4 w-4" />
                  Crisis Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({ 
  icon, 
  title, 
  description, 
  href, 
  badge 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  href: string
  badge?: string
}) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-3 relative">
            {icon}
            {badge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {badge}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function ClaimCard({ claim }: { claim: any }) {
  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50'
  }

  return (
    <div className={`border-l-4 rounded-lg p-4 ${priorityColors[claim.priority as keyof typeof priorityColors]}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{claim.type}</h3>
          <p className="text-sm text-gray-600">{claim.status}</p>
        </div>
        <span className="text-sm font-medium text-gray-700">{claim.progress}%</span>
      </div>
      
      <Progress value={claim.progress} className="mb-3" />
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Updated {claim.lastUpdate}</span>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </div>
      
      <div className="mt-2 p-2 bg-white rounded border-l-2 border-l-blue-400">
        <p className="text-sm font-medium">Next Step:</p>
        <p className="text-sm text-gray-600">{claim.nextStep}</p>
      </div>
    </div>
  )
}

function NotificationItem({ notification }: { notification: any }) {
  const typeColors = {
    urgent: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="flex items-start space-x-3">
      <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'urgent' ? 'bg-red-500' : notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
      </div>
    </div>
  )
}