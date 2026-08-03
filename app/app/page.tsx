import Link from "next/link"
import { getActiveOrg, getCurrentUser } from "@/lib/orgs"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ROLE_LABELS } from "@/lib/types"
import { Users, Building2, Handshake, Sparkles, ArrowRight, UserPlus } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const { active } = await getActiveOrg()
  if (!active) return null

  const supabase = await createClient()
  const { count: memberCount } = await supabase
    .from("organization_members")
    .select("*", { count: "exact", head: true })
    .eq("org_id", active.id)

  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user!.id).single()
  const firstName = (profile?.full_name ?? "").split(" ")[0] || "there"

  const kpis = [
    { label: "Team members", value: memberCount ?? 1, icon: Users },
    { label: "Companies", value: 0, icon: Building2 },
    { label: "Open deals", value: 0, icon: Handshake },
    { label: "AI actions", value: 0, icon: Sparkles },
  ]

  const canManage = active.role === "owner" || active.role === "admin"

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {firstName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening in {active.name}.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <span className="inline-flex size-1.5 rounded-full bg-primary" />
          {ROLE_LABELS[active.role]}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Get started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <StepRow
              title="Your workspace is ready"
              desc={`${active.name} is set up with you as ${ROLE_LABELS[active.role].toLowerCase()}.`}
              done
            />
            {canManage ? (
              <StepRow
                title="Invite your team"
                desc="Add teammates and assign roles to collaborate."
                action={
                  <Button asChild size="sm" variant="outline" className="bg-transparent">
                    <Link href="/app/settings/members">
                      <UserPlus className="size-4" />
                      Invite
                    </Link>
                  </Button>
                }
              />
            ) : null}
            <StepRow title="Add your first contacts" desc="Contacts, companies, and deals are coming next." soon />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <InfoRow label="Name" value={active.name} />
            <InfoRow label="Slug" value={active.slug} mono />
            <InfoRow label="Your role" value={ROLE_LABELS[active.role]} />
            {canManage ? (
              <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                <Link href="/app/settings/members">
                  Manage members
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StepRow({
  title,
  desc,
  action,
  done,
  soon,
}: {
  title: string
  desc: string
  action?: React.ReactNode
  done?: boolean
  soon?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs ${
            done ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
          }`}
        >
          {done ? "✓" : ""}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {soon ? <Badge variant="outline">Soon</Badge> : action}
    </div>
  )
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-xs" : "font-medium"}>{value}</span>
    </div>
  )
}
