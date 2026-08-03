import { cn } from "@/lib/utils"

export function VisionLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
          <path
            d="M12 4C6.5 4 2.7 8.5 1 12c1.7 3.5 5.5 8 11 8s9.3-4.5 11-8c-1.7-3.5-5.5-8-11-8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      <span className="text-[15px] font-semibold tracking-tight">Vision</span>
    </div>
  )
}
