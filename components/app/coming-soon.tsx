import { Card, CardContent } from "@/components/ui/card"

export function ComingSoon({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Icon className="size-6" />
          </div>
          <p className="text-sm font-medium">Coming soon</p>
          <p className="max-w-sm text-sm text-muted-foreground text-pretty">
            This module is part of the Vision roadmap. The multi-tenant foundation, auth, and roles are ready — {title}{" "}
            builds on top of it next.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
