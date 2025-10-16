'use client'

import { useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from 'react-share'
import {
  ShareIcon,
  HeartIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAccessibility } from '@/components/providers/theme-provider'

interface Testimonial {
  id: string
  type: 'text' | 'audio' | 'video'
  content: string
  audioUrl?: string
  videoUrl?: string
  clientName: string
  rating: number
  date: string
  featured: boolean
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { announceToScreenReader } = useAccessibility()

  const shareUrl = `${window.location.origin}/testimonials/${testimonial.id}`
  const shareTitle = `Check out this testimonial for KAL's Consulting from ${testimonial.clientName}`
  const shareDescription = testimonial.type === 'text' 
    ? testimonial.content.substring(0, 100) + '...'
    : `${testimonial.clientName} shared their experience with KAL's Consulting`

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    announceToScreenReader(isPlaying ? 'Paused testimonial' : 'Playing testimonial')
  }

  const handleShare = (platform: string) => {
    announceToScreenReader(`Sharing testimonial on ${platform}`)
    setShowShareMenu(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        aria-hidden="true"
      >
        ⭐
      </span>
    ))
  }

  return (
    <Card className={`${testimonial.featured ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}`}>
      <CardContent className="p-6">
        {testimonial.featured && (
          <div className="flex items-center mb-4 text-primary-600 dark:text-primary-400">
            <HeartIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Featured Testimonial</span>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{testimonial.clientName}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                {renderStars(testimonial.rating)}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(testimonial.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareMenu(!showShareMenu)}
              aria-label="Share testimonial"
            >
              <ShareIcon className="h-4 w-4" />
            </Button>
            
            {showShareMenu && (
              <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-10 min-w-[200px]">
                <div className="text-sm font-medium mb-2">Share this testimonial:</div>
                <div className="flex space-x-2">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    onClick={() => handleShare('Facebook')}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  
                  <TwitterShareButton
                    url={shareUrl}
                    title={shareTitle}
                    onClick={() => handleShare('Twitter')}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  
                  <LinkedinShareButton
                    url={shareUrl}
                    title={shareTitle}
                    summary={shareDescription}
                    onClick={() => handleShare('LinkedIn')}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  
                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    onClick={() => handleShare('WhatsApp')}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          {testimonial.type === 'text' && (
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              "{testimonial.content}"
            </div>
          )}

          {testimonial.type === 'audio' && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause audio testimonial' : 'Play audio testimonial'}
              >
                {isPlaying ? (
                  <PauseIcon className="h-4 w-4" />
                ) : (
                  <PlayIcon className="h-4 w-4" />
                )}
              </Button>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <SpeakerWaveIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Audio Testimonial
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-primary-600 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
              <audio
                src={testimonial.audioUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
          )}

          {testimonial.type === 'video' && (
            <div className="relative rounded-lg overflow-hidden bg-gray-900">
              <video
                src={testimonial.videoUrl}
                controls
                className="w-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                poster="/api/video-thumbnail"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 dark:text-gray-400 border-t pt-3">
          Thank you for sharing your experience with KAL's Consulting
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsDisplay() {
  const [testimonials] = useState<Testimonial[]>([
    {
      id: '1',
      type: 'text',
      content: 'KAL\'s Consulting helped me navigate the complex VA benefits system with such professionalism and care. Kevin and his team were there every step of the way, ensuring I got the compensation I deserved. I cannot recommend them highly enough to my fellow veterans.',
      clientName: 'John D.',
      rating: 5,
      date: '2024-10-01',
      featured: true
    },
    {
      id: '2',
      type: 'text',
      content: 'After struggling for years with my PTSD claim, KAL\'s Consulting stepped in and turned everything around. Their expertise and dedication made all the difference. I finally received the benefits I earned through my service.',
      clientName: 'Sarah M.',
      rating: 5,
      date: '2024-09-28',
      featured: false
    },
    {
      id: '3',
      type: 'audio',
      content: '',
      audioUrl: '/testimonials/audio/testimonial-3.mp3',
      clientName: 'Robert L.',
      rating: 5,
      date: '2024-09-25',
      featured: false
    }
  ])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Veterans Say
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Real stories from veterans who have successfully navigated their benefits with our help
        </p>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Button size="lg" asChild>
          <a href="/testimonials/submit">Share Your Experience</a>
        </Button>
      </div>
    </div>
  )
}