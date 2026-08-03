import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VisionLogoProps {
  className?: string
  compact?: boolean
}

export function VisionLogo({ className, compact = false }: VisionLogoProps) {
  if (compact) {
    // Compact "VC" mark for sidebar
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-md',
          className
        )}
        style={{ width: '40px', height: '40px' }}
      >
        VC
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
