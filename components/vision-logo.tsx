import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VisionLogoProps {
  className?: string
  compact?: boolean
  withText?: boolean
}

export function VisionLogo({ className, compact = false, withText = false }: VisionLogoProps) {
  if (compact) {
    // Compact logo icon with optional text
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Image
          src="/vision-logo.png"
          alt="Vision CRM"
          width={48}
          height={48}
          priority
          className="h-12 w-12 object-contain"
        />
        {withText && (
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-foreground">Vision CRM</span>
            <span className="text-xs text-muted-foreground">AI SaaS Platform</span>
          </div>
        )}
      </div>
    )
  }

  // Full logo image
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/vision-logo.png"
        alt="Vision CRM - AI SaaS Platform"
        width={240}
        height={96}
        priority
        className="h-10 w-auto object-contain"
      />
    </div>
  )
}
