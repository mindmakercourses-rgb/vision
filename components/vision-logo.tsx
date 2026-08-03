import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VisionLogoProps {
  className?: string
  compact?: boolean
  withText?: boolean
}

export function VisionLogo({ className, compact = false, withText = false }: VisionLogoProps) {
  if (compact) {
    // Compact "VC" mark for sidebar with optional text
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div
          className="flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-md"
          style={{ width: '48px', height: '48px' }}
        >
          VC
        </div>
        {withText && <span className="text-lg font-bold text-foreground">Vision CRM</span>}
      </div>
    )
  }

  // Full logo with text
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/vision-logo-full.png"
        alt="Vision CRM"
        width={180}
        height={72}
        priority
        className="h-8 w-auto"
      />
    </div>
  )
}
