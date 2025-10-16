'use client'

import { useState } from 'react'
import { 
  DocumentMagnifyingGlassIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function AIReviewPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [claimStrength, setClaimStrength] = useState(78)

  const [evidenceAnalysis] = useState([
    {
      category: 'Medical Evidence',
      status: 'strong',
      completeness: 85,
      issues: [
        'Recent medical examination completed',
        'Treatment records from 2020-2025 present'
      ],
      missing: [
        'Buddy statement from service member',
        'Initial injury report from service'
      ]
    },
    {
      category: 'Service Connection',
      status: 'moderate',
      completeness: 65,
      issues: [
        'Service medical records available',
        'Deployment documentation present'
      ],
      missing: [
        'Nexus letter from medical professional',
        'Statement in support of claim'
      ]
    },
    {
      category: 'Documentation',
      status: 'weak',
      completeness: 45,
      issues: [
        'DD-214 discharge papers provided'
      ],
      missing: [
        'VA Form 21-4142 (Authorization)',
        'Private treatment records',
        'Employment impact statement'
      ]
    }
  ])

  const handleScan = () => {
    setIsScanning(true)
    // Simulate AI scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScanComplete(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Claim Review</h1>
              <p className="text-gray-600">Advanced analysis to strengthen your claim</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Evidence Scanner */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DocumentMagnifyingGlassIcon className="h-6 w-6 mr-2 text-blue-600" />
                  Evidence Scanner
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of your claim documentation to identify strengths and gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!scanComplete ? (
                  <div className="text-center py-12">
                    <div className="mb-6">
                      <DocumentMagnifyingGlassIcon className="h-16 w-16 mx-auto text-gray-400" />
                    </div>
                    {!isScanning ? (
                      <>
                        <h3 className="text-lg font-semibold mb-2">Ready to Analyze Your Claim</h3>
                        <p className="text-gray-600 mb-6">
                          Our AI will review your documents and identify areas for improvement
                        </p>
                        <Button onClick={handleScan} size="lg">
                          <SparklesIcon className="h-5 w-5 mr-2" />
                          Start AI Analysis
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold mb-2">Analyzing Your Claim...</h3>
                        <p className="text-gray-600 mb-6">Please wait while we review your documentation</p>
                        <div className="w-64 mx-auto">
                          <Progress value={65} className="mb-2" />
                          <p className="text-sm text-gray-500">Processing medical records...</p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {evidenceAnalysis.map((category, index) => (
                      <EvidenceCategory key={index} category={category} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Claim Strength Meter */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChartBarIcon className="h-6 w-6 mr-2 text-green-600" />
                  Claim Strength
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{claimStrength}%</div>
                  <div className="text-sm text-gray-600">Overall Strength Score</div>
                </div>
                
                <Progress value={claimStrength} className="mb-4" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Medical Evidence</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Connection</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Documentation</span>
                    <span className="font-medium">45%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">High Priority</p>
                    <p className="text-sm text-gray-600">Obtain nexus letter from medical professional</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <InformationCircleIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Medium Priority</p>
                    <p className="text-sm text-gray-600">Gather buddy statements from service members</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Good Progress</p>
                    <p className="text-sm text-gray-600">Medical records are comprehensive and recent</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Generate Action Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function EvidenceCategory({ category }: { category: any }) {
  const statusColors = {
    strong: 'border-green-500 bg-green-50',
    moderate: 'border-yellow-500 bg-yellow-50',
    weak: 'border-red-500 bg-red-50'
  }

  const statusIcons = {
    strong: <CheckCircleIcon className="h-5 w-5 text-green-600" />,
    moderate: <InformationCircleIcon className="h-5 w-5 text-yellow-600" />,
    weak: <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
  }

  return (
    <div className={`border-l-4 rounded-lg p-4 ${statusColors[category.status as keyof typeof statusColors]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {statusIcons[category.status as keyof typeof statusIcons]}
          <h3 className="font-semibold">{category.category}</h3>
        </div>
        <span className="text-sm font-medium">{category.completeness}% Complete</span>
      </div>
      
      <Progress value={category.completeness} className="mb-4" />
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm text-green-700 mb-2">✓ Strengths Found</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {category.issues.map((issue: string, index: number) => (
              <li key={index}>• {issue}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-red-700 mb-2">⚠ Missing Evidence</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {category.missing.map((item: string, index: number) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}