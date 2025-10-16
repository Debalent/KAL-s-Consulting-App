'use client'

import { useState, useRef } from 'react'
import {
  ChatBubbleLeftIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  PhotoIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAccessibility } from '@/components/providers/theme-provider'

interface Testimonial {
  id: string
  type: 'text' | 'audio' | 'video'
  content: string
  audioUrl?: string
  videoUrl?: string
  clientName: string
  clientEmail: string
  rating: number
  date: string
  approved: boolean
  featured: boolean
}

export function TestimonialSubmission() {
  const [testimonialType, setTestimonialType] = useState<'text' | 'audio' | 'video'>('text')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    rating: 5,
    textContent: '',
    consent: false
  })
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const { announceToScreenReader } = useAccessibility()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the testimonial submission
    announceToScreenReader('Testimonial submitted successfully. It will be reviewed before publishing.')
    console.log('Testimonial submitted:', { testimonialType, formData })
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: testimonialType === 'video'
      })
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      setIsRecording(true)
      setRecordingTime(0)
      
      // Start recording timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) { // 5 minutes max
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
      
      mediaRecorder.start()
      announceToScreenReader('Recording started')
      
      mediaRecorder.ondataavailable = (event) => {
        // Handle recorded data
        console.log('Recording data available:', event.data)
      }
      
      mediaRecorder.onstop = () => {
        clearInterval(timer)
        stream.getTracks().forEach(track => track.stop())
        announceToScreenReader('Recording stopped')
      }
      
    } catch (error) {
      console.error('Error starting recording:', error)
      announceToScreenReader('Error accessing microphone or camera')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HeartIcon className="h-6 w-6 mr-2 text-red-500" />
            Share Your Experience
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Help other veterans by sharing your experience with KAL's Consulting
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium mb-1">
                  Your Name *
                </label>
                <Input
                  id="clientName"
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium mb-1">
                  Email Address *
                </label>
                <Input
                  id="clientEmail"
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Overall Rating *
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className={`text-2xl ${
                      star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                    aria-label={`Rate ${star} stars`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                How would you like to share your testimonial? *
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={testimonialType === 'text' ? 'default' : 'outline'}
                  onClick={() => setTestimonialType('text')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <ChatBubbleLeftIcon className="h-6 w-6 mb-2" />
                  <span>Written</span>
                  <span className="text-xs text-gray-500">Type your story</span>
                </Button>
                
                <Button
                  type="button"
                  variant={testimonialType === 'audio' ? 'default' : 'outline'}
                  onClick={() => setTestimonialType('audio')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <MicrophoneIcon className="h-6 w-6 mb-2" />
                  <span>Audio</span>
                  <span className="text-xs text-gray-500">Record voice</span>
                </Button>
                
                <Button
                  type="button"
                  variant={testimonialType === 'video' ? 'default' : 'outline'}
                  onClick={() => setTestimonialType('video')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <VideoCameraIcon className="h-6 w-6 mb-2" />
                  <span>Video</span>
                  <span className="text-xs text-gray-500">Record yourself</span>
                </Button>
              </div>
            </div>

            {/* Content Input Based on Type */}
            {testimonialType === 'text' && (
              <div>
                <label htmlFor="textContent" className="block text-sm font-medium mb-2">
                  Your Testimonial *
                </label>
                <textarea
                  id="textContent"
                  required
                  value={formData.textContent}
                  onChange={(e) => setFormData(prev => ({ ...prev, textContent: e.target.value }))}
                  placeholder="Share your experience with KAL's Consulting. How did they help you with your VA benefits?"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  maxLength={1000}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.textContent.length}/1000 characters
                </div>
              </div>
            )}

            {(testimonialType === 'audio' || testimonialType === 'video') && (
              <div className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  {isRecording ? (
                    <div className="space-y-4">
                      <div className="text-red-600 text-lg font-medium">
                        🔴 Recording: {formatTime(recordingTime)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Maximum duration: 5 minutes
                      </div>
                      <Button type="button" onClick={stopRecording} variant="destructive">
                        Stop Recording
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl text-gray-400">
                        {testimonialType === 'audio' ? '🎙️' : '📹'}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          Ready to record your {testimonialType} testimonial?
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Click the button below to start recording (maximum 5 minutes)
                        </p>
                      </div>
                      <Button type="button" onClick={startRecording}>
                        Start Recording
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Consent and Privacy */}
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300">
                  I consent to KAL's Consulting using my testimonial for marketing purposes. 
                  I understand that my testimonial will be reviewed before publication and 
                  may be featured on the website and social media platforms. 
                  I can request removal at any time by contacting support.
                </label>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Privacy Note:</strong> Your email will not be displayed publicly. 
                We use it only to contact you about your testimonial if needed.
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              Submit Testimonial for Review
            </Button>
            
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Your testimonial will be reviewed by our team before being published. 
              Thank you for sharing your experience!
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}