'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ConsultantDashboardPage() {
  const [clients] = useState([
    {
      id: 1,
      name: 'John Smith',
      claims: 2,
      lastActivity: '2 hours ago',
      status: 'active',
      priority: 'high',
      completionRate: 85
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      claims: 1,
      lastActivity: '1 day ago',
      status: 'pending',
      priority: 'medium',
      completionRate: 60
    },
    {
      id: 3,
      name: 'Michael Brown',
      claims: 3,
      lastActivity: '3 days ago',
      status: 'review',
      priority: 'low',
      completionRate: 95
    }
  ])

  const [recentActivity] = useState([
    { id: 1, action: 'Evidence submitted for John Smith - PTSD Claim', time: '30 min ago', type: 'document' },
    { id: 2, action: 'Medical exam scheduled for Sarah Johnson', time: '2 hours ago', type: 'appointment' },
    { id: 3, action: 'New client intake: Michael Brown', time: '1 day ago', type: 'client' },
    { id: 4, action: 'Claim approved: Robert Davis - Hearing Loss', time: '2 days ago', type: 'success' }
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
                <h1 className="text-lg font-bold text-gray-900">Consultant Dashboard</h1>
                <p className="text-sm text-gray-600">KAL Claims Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                New Intake
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Clients"
            value="24"
            change="+12%"
            changeType="positive"
            icon={<UserGroupIcon className="h-8 w-8 text-blue-600" />}
          />
          <StatsCard
            title="Claims In Progress"
            value="47"
            change="+8%"
            changeType="positive"
            icon={<DocumentTextIcon className="h-8 w-8 text-yellow-600" />}
          />
          <StatsCard
            title="Success Rate"
            value="94%"
            change="+2%"
            changeType="positive"
            icon={<ChartBarIcon className="h-8 w-8 text-green-600" />}
          />
          <StatsCard
            title="Avg. Resolution"
            value="32 days"
            change="-5 days"
            changeType="positive"
            icon={<ClockIcon className="h-8 w-8 text-purple-600" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Client Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription>Manage your active clients and their claims</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search clients..."
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Clients</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <DocumentTextIcon className="mr-2 h-4 w-4" />
                  New Intake Form
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ChartBarIcon className="mr-2 h-4 w-4" />
                  Case Builder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  Timeline Generator
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DocumentTextIcon className="mr-2 h-4 w-4" />
                  Document Templates
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
                
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Priority Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Deadline Approaching</p>
                    <p className="text-sm text-gray-600">John Smith - PTSD evidence due in 2 days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Appointment Reminder</p>
                    <p className="text-sm text-gray-600">Sarah Johnson - Medical exam tomorrow</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Claim Approved</p>
                    <p className="text-sm text-gray-600">Robert Davis - Hearing Loss approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon 
}: { 
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {change} from last month
            </p>
          </div>
          <div className="flex-shrink-0">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ClientCard({ client }: { client: any }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    review: 'bg-blue-100 text-blue-800'
  }

  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500'
  }

  return (
    <div className={`border-l-4 rounded-lg p-4 bg-white border ${priorityColors[client.priority as keyof typeof priorityColors]}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.claims} active claims</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[client.status as keyof typeof statusColors]}`}>
          {client.status}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm mb-3">
        <span className="text-gray-600">Last activity: {client.lastActivity}</span>
        <span className="font-medium">Completion: {client.completionRate}%</span>
      </div>
      
      <div className="flex space-x-2">
        <Button size="sm" variant="outline">View Details</Button>
        <Button size="sm">Manage Case</Button>
      </div>
    </div>
  )
}

function ActivityItem({ activity }: { activity: any }) {
  const iconMap = {
    document: <DocumentTextIcon className="h-4 w-4" />,
    appointment: <ClockIcon className="h-4 w-4" />,
    client: <UserGroupIcon className="h-4 w-4" />,
    success: <CheckCircleIcon className="h-4 w-4" />
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1 text-gray-400">
        {iconMap[activity.type as keyof typeof iconMap]}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{activity.action}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  )
}