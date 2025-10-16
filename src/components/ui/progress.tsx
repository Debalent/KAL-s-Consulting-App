import { cn } from '@/lib/utils'

interface ProgressProps {
  value?: number
  className?: string
}

function Progress({ value = 0, className }: ProgressProps) {
  const progressValue = Math.min(Math.max(value || 0, 0), 100)
  
  return (
    <div
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-gray-200',
        className
      )}
    >
      <div
        className="h-full bg-primary-600 transition-all duration-300 ease-in-out"
        data-testid="progress-bar"
        // eslint-disable-next-line react/forbid-dom-props
        style={{ width: `${progressValue}%` }}
      />
    </div>
  )
}

export { Progress }