'use client'

import { useState } from 'react'
import {
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  StarIcon,
  PlayIcon,
  PauseIcon,
  FlagIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAccessibility } from '@/components/providers/theme-provider'

interface PendingTestimonial {
  id: string
  type: 'text' | 'audio' | 'video'
  content: string
  audioUrl?: string
  videoUrl?: string
  clientName: string
  clientEmail: string
  rating: number
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  featured: boolean
  moderatorNotes?: string
}

export function TestimonialModerationPanel() {
  const [testimonials, setTestimonials] = useState<PendingTestimonial[]>([
    {
      id: '1',
      type: 'text',
      content: 'KAL\'s Consulting completely changed my life. After years of struggling with the VA system, Kevin and his team helped me get the benefits I deserved. The process was smooth and professional.',
      clientName: 'Michael Rodriguez',
      clientEmail: 'michael.r@email.com',
      rating: 5,
      submittedDate: '2024-10-15',
      status: 'pending',
      featured: false
    },
    {
      id: '2',
      type: 'audio',
      content: '',
      audioUrl: '/testimonials/pending/audio-2.mp3',
      clientName: 'Jennifer Thompson',
      clientEmail: 'jen.thompson@email.com',
      rating: 5,
      submittedDate: '2024-10-14',
      status: 'pending',
      featured: false
    },
    {
      id: '3',
      type: 'video',
      content: '',
      videoUrl: '/testimonials/pending/video-3.mp4',
      clientName: 'David Park',
      clientEmail: 'david.park@email.com',
      rating: 4,
      submittedDate: '2024-10-13',
      status: 'pending',
      featured: false
    }
  ])

  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const { announceToScreenReader } = useAccessibility()

  const handleApprove = (id: string, featured: boolean = false) => {
    setTestimonials(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'approved' as const, featured } : t
    ))
    announceToScreenReader(`Testimonial ${featured ? 'approved and featured' : 'approved'}`)
  }

  const handleReject = (id: string, reason?: string) => {
    setTestimonials(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'rejected' as const, moderatorNotes: reason } : t
    ))
    announceToScreenReader('Testimonial rejected')
  }

  const handleToggleFeatured = (id: string) => {
    setTestimonials(prev => prev.map(t => 
      t.id === id ? { ...t, featured: !t.featured } : t
    ))
    announceToScreenReader('Featured status toggled')
  }

  const filteredTestimonials = testimonials.filter(t => 
    filter === 'all' || t.status === filter
  )

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonial Moderation</h1>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <Badge variant="secondary" className="ml-2">
                {status === 'all' ? testimonials.length : testimonials.filter(t => t.status === status).length}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Testimonials List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredTestimonials.map(testimonial => (
            <Card key={testimonial.id} className={`cursor-pointer transition-all ${
              selectedTestimonial === testimonial.id ? 'ring-2 ring-primary-500' : ''
            }`}>
              <CardHeader 
                className="pb-3"
                onClick={() => setSelectedTestimonial(testimonial.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{testimonial.clientName}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(testimonial.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {testimonial.featured && (
                      <HeartIcon className="h-4 w-4 text-red-500" />
                    )}
                    <Badge className={getStatusBadge(testimonial.status)}>
                      {testimonial.status}
                    </Badge>
                    <Badge variant="outline">
                      {testimonial.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {testimonial.type === 'text' && (
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                )}
                
                {testimonial.type === 'audio' && (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <PlayIcon className="h-4 w-4" />
                    <span>Audio testimonial</span>
                  </div>
                )}
                
                {testimonial.type === 'video' && (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <PlayIcon className="h-4 w-4" />
                    <span>Video testimonial</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {testimonial.clientEmail}
                  </span>
                  
                  {testimonial.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(testimonial.id)}
                      >
                        <XMarkIcon className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(testimonial.id)}
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-1">
          {selectedTestimonial && (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Testimonial Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const testimonial = testimonials.find(t => t.id === selectedTestimonial)
                  if (!testimonial) return null

                  return (
                    <>
                      <div>
                        <h3 className="font-medium mb-2">Client Information</h3>
                        <div className="text-sm space-y-1">
                          <div><strong>Name:</strong> {testimonial.clientName}</div>
                          <div><strong>Email:</strong> {testimonial.clientEmail}</div>
                          <div><strong>Rating:</strong> {testimonial.rating}/5 stars</div>
                          <div><strong>Submitted:</strong> {new Date(testimonial.submittedDate).toLocaleDateString()}</div>
                          <div><strong>Type:</strong> {testimonial.type}</div>
                        </div>
                      </div>

                      {testimonial.type === 'text' && (
                        <div>
                          <h3 className="font-medium mb-2">Content</h3>
                          <div className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                            "{testimonial.content}"
                          </div>
                        </div>
                      )}

                      {testimonial.type === 'audio' && (
                        <div>
                          <h3 className="font-medium mb-2">Audio Preview</h3>
                          <audio controls className="w-full">
                            <source src={testimonial.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}

                      {testimonial.type === 'video' && (
                        <div>
                          <h3 className="font-medium mb-2">Video Preview</h3>
                          <video controls className="w-full rounded">
                            <source src={testimonial.videoUrl} type="video/mp4" />
                            Your browser does not support the video element.
                          </video>
                        </div>
                      )}

                      {testimonial.status === 'pending' && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Moderation Actions</h3>
                          
                          <Button
                            className="w-full"
                            onClick={() => handleApprove(testimonial.id, true)}
                          >
                            <HeartIcon className="h-4 w-4 mr-2" />
                            Approve & Feature
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleApprove(testimonial.id, false)}
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleReject(testimonial.id, 'Content does not meet guidelines')}
                          >
                            <XMarkIcon className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {testimonial.status === 'approved' && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Manage Testimonial</h3>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleToggleFeatured(testimonial.id)}
                          >
                            <HeartIcon className="h-4 w-4 mr-2" />
                            {testimonial.featured ? 'Remove from Featured' : 'Add to Featured'}
                          </Button>
                        </div>
                      )}
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}