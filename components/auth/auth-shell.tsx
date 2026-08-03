import type { ReactNode } from "react"
import { VisionLogo } from "@/components/vision-logo"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* Form column */}
      <div className="flex flex-col p-6 lg:p-10">
        <VisionLogo compact withText />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <div className="mb-8 space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
              {subtitle ? <p className="text-sm text-muted-foreground text-pretty">{subtitle}</p> : null}
            </div>
            {children}
            {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Vision CRM</p>
      </div>

      {/* Brand column */}
      <div className="relative hidden overflow-hidden border-l border-border bg-gradient-to-br from-blue-50 via-white to-blue-50 lg:block">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex size-2 rounded-full bg-primary" />
            AI-first CRM
          </div>
          <div className="max-w-md space-y-6">
            <p className="text-2xl font-medium leading-snug tracking-tight text-balance">
              &ldquo;Vision gives our whole team a single, intelligent view of every customer relationship.&rdquo;
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Alex Rivera</p>
              <p>VP of Revenue, Northwind</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <Stat value="12k+" label="Teams" />
            <Stat value="4.2M" label="Contacts managed" />
            <Stat value="99.9%" label="Uptime" />
          </div>
        </div>
      </div>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
