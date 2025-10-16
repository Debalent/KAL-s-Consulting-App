import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckBadgeIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
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
                <h1 className="text-xl font-bold text-gray-900">KAL's Consulting</h1>
                <p className="text-sm text-gray-600">Claims Companion</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/auth/login" className="text-gray-700 hover:text-primary-600 font-medium">
                Sign In
              </Link>
              <Link href="/onboarding" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Trusted Partner in
            <span className="text-primary-600 block">Veterans Benefits</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional advocacy and consulting services to help veterans navigate 
            the complex benefits system and secure the compensation they've earned.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/veteran-portal" className="btn-primary text-lg px-8 py-3">
              Veteran Portal
            </Link>
            <Link href="/consultant-dashboard" className="btn-secondary text-lg px-8 py-3">
              Consultant Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<CheckBadgeIcon className="h-8 w-8 text-primary-600" />}
            title="Expert Guidance"
            description="Professional consultants with deep knowledge of VA systems and regulations"
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="h-8 w-8 text-primary-600" />}
            title="Secure Platform"
            description="Bank-level security to protect your sensitive personal and medical information"
          />
          <FeatureCard
            icon={<UserGroupIcon className="h-8 w-8 text-primary-600" />}
            title="Dedicated Support"
            description="One-on-one support throughout your entire claims process"
          />
          <FeatureCard
            icon={<ChartBarIcon className="h-8 w-8 text-primary-600" />}
            title="AI-Powered Analysis"
            description="Advanced technology to strengthen your claims and identify missing evidence"
          />
          <FeatureCard
            icon={<DocumentTextIcon className="h-8 w-8 text-primary-600" />}
            title="Document Management"
            description="Organized storage and tracking of all your important claim documents"
          />
          <FeatureCard
            icon={<HeartIcon className="h-8 w-8 text-primary-600" />}
            title="Mental Health Support"
            description="Resources and check-ins to support your overall wellbeing"
          />
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatItem number="95%" label="Success Rate" />
            <StatItem number="$2.8M+" label="Benefits Secured" />
            <StatItem number="500+" label="Veterans Served" />
            <StatItem number="45 days" label="Avg. Resolution Time" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of veterans who have successfully navigated their benefits with our help.
          </p>
          <Link href="/onboarding" className="bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Begin Your Journey
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo.jpg"
                  alt="KAL's Consulting Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="font-bold">KAL's Consulting</span>
              </div>
              <p className="text-gray-400">
                Professional veterans benefits consulting and advocacy services.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Claims Review</li>
                <li>Appeals Process</li>
                <li>Evidence Gathering</li>
                <li>Medical Examinations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Knowledge Hub</li>
                <li>FAQs</li>
                <li>Contact Support</li>
                <li>Success Stories</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="text-gray-400 space-y-2">
                <p>Email: support@kalsconsulting.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KAL's Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="card text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}