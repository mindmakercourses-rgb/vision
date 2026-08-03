import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { VisionLogo } from "@/components/vision-logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Building2, LineChart } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect("/app")

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 lg:px-10">
        <VisionLogo compact withText />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/sign-up">Get started</Link>
          </Button>
        </div>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          AI-first customer relationships
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          The intelligent CRM for modern revenue teams
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
          Vision unifies customers, companies, and deals in one workspace — with multi-tenant workspaces, roles, and AI
          built in from day one.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/auth/sign-up">
              Start for free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent">
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>

        <div className="mt-16 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          <Feature icon={Users} title="Contacts" desc="Every relationship in one intelligent timeline." />
          <Feature icon={Building2} title="Companies" desc="Account hierarchies and org structures." />
          <Feature icon={LineChart} title="Pipeline" desc="Forecast deals with AI-assisted insights." />
        </div>
      </main>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-left">
      <div className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground text-pretty">{desc}</p>
    </div>
  )
}
