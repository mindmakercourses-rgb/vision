import Link from "next/link"
import { getActiveOrg, getCurrentUser } from "@/lib/orgs"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ROLE_LABELS } from "@/lib/types"
import {
  Users, Building2, Handshake, Sparkles, ArrowRight, UserPlus,
  MessageSquare, Phone, Mail, Bot, Zap, TrendingUp, Target,
  DollarSign, CheckCircle2, AlertTriangle, Clock, BarChart3,
  Flame, ArrowUpRight, Activity,
} from "lucide-react"

// ── Mini SVG sparkline ─────────────────────────────────────────────
function Sparkline({ data, color = "#0066ff" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80
  const h = 28
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  )
}

// ── Micro bar chart ────────────────────────────────────────────────
function MicroBars({ data, color = "bg-primary" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-0.5" style={{ height: 28 }}>
      {data.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${color} opacity-70`}
          style={{ height: `${(v / max) * 28}px` }}
        />
      ))}
    </div>
  )
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const { active } = await getActiveOrg()
  if (!active) return null

  const supabase = await createClient()
  const { count: memberCount } = await supabase
    .from("organization_members")
    .select("*", { count: "exact", head: true })
    .eq("org_id", active.id)

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single()
  const firstName = (profile?.full_name ?? "").split(" ")[0] || "there"
  const canManage = active.role === "owner" || active.role === "admin"

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening in{" "}
            <span className="font-medium text-foreground">{active.name}</span> today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <span className="inline-flex size-1.5 rounded-full bg-green-500 animate-pulse" />
            All systems operational
          </div>
          <Badge variant="secondary" className="gap-1.5">
            <span className="inline-flex size-1.5 rounded-full bg-primary" />
            {ROLE_LABELS[active.role]}
          </Badge>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Pipeline Value",
            value: "$1.03M",
            sub: "5 open deals",
            icon: DollarSign,
            trend: "+18%",
            trendUp: true,
            data: [42, 55, 48, 70, 65, 88, 95, 103],
            color: "#0066ff",
          },
          {
            label: "Active Leads",
            value: "284",
            sub: "12 hot this week",
            icon: Flame,
            trend: "+12%",
            trendUp: true,
            data: [180, 200, 185, 220, 240, 260, 275, 284],
            color: "#ef4444",
          },
          {
            label: "AI Conversations",
            value: "4,820",
            sub: "88% resolved by AI",
            icon: Bot,
            trend: "+34%",
            trendUp: true,
            data: [280, 320, 290, 380, 360, 420, 460, 482],
            color: "#8b5cf6",
          },
          {
            label: "Team Members",
            value: memberCount ?? 1,
            sub: `${active.name} workspace`,
            icon: Users,
            trend: null,
            trendUp: true,
            data: [1, 1, 1, 2, 2, 3, 3, memberCount ?? 1],
            color: "#0066ff",
          },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{kpi.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{kpi.sub}</p>
                </div>
                <kpi.icon className="size-5 text-muted-foreground mt-0.5" />
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <Sparkline data={kpi.data} color={kpi.color} />
                {kpi.trend && (
                  <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <ArrowUpRight className="size-3.5" />
                    {kpi.trend}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Main content grid ── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left: Activity + Quick actions */}
        <div className="space-y-4 lg:col-span-2">
          {/* Quick navigation modules */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {[
                  { href: "/app/whatsapp", label: "WhatsApp AI", icon: MessageSquare, color: "bg-green-500" },
                  { href: "/app/email", label: "Email AI", icon: Mail, color: "bg-blue-500" },
                  { href: "/app/voice", label: "Voice AI", icon: Phone, color: "bg-purple-500" },
                  { href: "/app/ai-agents", label: "AI Agents", icon: Bot, color: "bg-primary" },
                  { href: "/app/workflows", label: "Workflows", icon: Zap, color: "bg-yellow-500" },
                  { href: "/app/analytics", label: "Analytics", icon: BarChart3, color: "bg-orange-500" },
                  { href: "/app/leads", label: "Leads", icon: Target, color: "bg-red-500" },
                  { href: "/app/deals", label: "Deals", icon: Handshake, color: "bg-teal-500" },
                  { href: "/app/ai-os", label: "AI Command", icon: Sparkles, color: "bg-indigo-500" },
                  { href: "/app/inbox", label: "Inbox", icon: MessageSquare, color: "bg-cyan-500" },
                  { href: "/app/reports", label: "Reports", icon: TrendingUp, color: "bg-rose-500" },
                  { href: "/app/companies", label: "Companies", icon: Building2, color: "bg-slate-500" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 text-center text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                  >
                    <div className={`flex size-9 items-center justify-center rounded-lg ${item.color}`}>
                      <item.icon className="size-5 text-white" />
                    </div>
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue trend chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">Revenue Trend</CardTitle>
              <Badge variant="outline" className="text-xs">Last 8 months</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end gap-1.5" style={{ height: 96 }}>
                  {[68, 75, 62, 89, 95, 78, 112, 124].map((v, i) => {
                    const max = 124
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                          style={{ height: `${(v / max) * 88}px` }}
                          title={`${months[i]}: $${v}K`}
                        />
                        <span className="text-xs text-muted-foreground">{months[i]}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/40 p-3 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">YTD Revenue</p>
                    <p className="font-semibold">$703K</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Annual Target</p>
                    <p className="font-semibold">$1.5M</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Attainment</p>
                    <p className="font-semibold text-primary">47%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Best Month</p>
                    <p className="font-semibold">Aug ($124K)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Activity Feed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Activity className="size-4 text-muted-foreground" />
                Live Activity
              </CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Real-time
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { text: "Sara AI closed deal with TechCorp — $180K", time: "2m ago", icon: DollarSign, color: "text-green-600 bg-green-100" },
                { text: "47 new WhatsApp conversations started today", time: "5m ago", icon: MessageSquare, color: "text-green-600 bg-green-100" },
                { text: "Lead qualification workflow executed × 12", time: "8m ago", icon: Zap, color: "text-yellow-600 bg-yellow-100" },
                { text: "Omar Support Agent resolved 8 support tickets", time: "15m ago", icon: CheckCircle2, color: "text-blue-600 bg-blue-100" },
                { text: "Smart Buildings Co contract uploaded to system", time: "22m ago", icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
                { text: "3 leads escalated to human agents via WhatsApp", time: "31m ago", icon: AlertTriangle, color: "text-orange-600 bg-orange-100" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm">
                  <div className={`flex size-7 shrink-0 items-center justify-center rounded-md ${item.color.split(" ")[1]}`}>
                    <item.icon className={`size-3.5 ${item.color.split(" ")[0]}`} />
                  </div>
                  <span className="flex-1 text-muted-foreground">{item.text}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Workspace info + channel stats */}
        <div className="space-y-4">
          {/* Workspace card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Workspace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted/40 p-3 space-y-2 text-sm">
                <InfoRow label="Name" value={active.name} />
                <InfoRow label="Slug" value={active.slug} mono />
                <InfoRow label="Your role" value={ROLE_LABELS[active.role]} />
                <InfoRow label="Members" value={String(memberCount ?? 1)} />
              </div>
              {canManage && (
                <Button asChild variant="outline" size="sm" className="w-full justify-between">
                  <Link href="/app/settings/members">
                    <UserPlus className="size-4" />
                    Manage members
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Channel performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Channel Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { channel: "WhatsApp AI", pct: 42, count: "2,840 chats", color: "bg-green-500", data: [30, 38, 35, 42, 40, 48, 44, 42] },
                { channel: "Email AI", pct: 28, count: "1,120 emails", color: "bg-blue-500", data: [20, 22, 25, 28, 26, 30, 27, 28] },
                { channel: "Voice AI", pct: 18, count: "480 calls", color: "bg-purple-500", data: [14, 16, 15, 18, 17, 20, 19, 18] },
                { channel: "Live Chat", pct: 12, count: "380 sessions", color: "bg-orange-500", data: [8, 10, 9, 11, 12, 13, 11, 12] },
              ].map((ch) => (
                <div key={ch.channel} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{ch.channel}</span>
                    <span className="text-muted-foreground">{ch.count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${ch.color}`} style={{ width: `${ch.pct}%` }} />
                    </div>
                    <span className="text-xs font-medium tabular-nums w-7 text-right">{ch.pct}%</span>
                  </div>
                  <MicroBars data={ch.data} color={ch.color} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Get started checklist */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <StepRow
                title="Workspace ready"
                desc={`${active.name} is live`}
                done
              />
              {canManage && (
                <StepRow
                  title="Invite your team"
                  desc="Add teammates to collaborate."
                  action={
                    <Button asChild size="sm" variant="outline" className="shrink-0 bg-transparent">
                      <Link href="/app/settings/members">
                        <UserPlus className="size-3.5" />
                        Invite
                      </Link>
                    </Button>
                  }
                />
              )}
              <StepRow
                title="Configure AI agents"
                desc="Set up your AI employees."
                action={
                  <Button asChild size="sm" variant="outline" className="shrink-0 bg-transparent">
                    <Link href="/app/ai-agents">
                      <Bot className="size-3.5" />
                      Setup
                    </Link>
                  </Button>
                }
              />
              <StepRow
                title="Connect channels"
                desc="WhatsApp, Email, Voice."
                action={
                  <Button asChild size="sm" variant="outline" className="shrink-0 bg-transparent">
                    <Link href="/app/inbox">
                      <MessageSquare className="size-3.5" />
                      Connect
                    </Link>
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StepRow({
  title,
  desc,
  action,
  done,
}: {
  title: string
  desc: string
  action?: React.ReactNode
  done?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-2.5">
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`flex size-5 shrink-0 items-center justify-center rounded-full text-xs ${
            done
              ? "bg-primary text-primary-foreground"
              : "border border-border text-muted-foreground"
          }`}
        >
          {done ? "✓" : ""}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground truncate">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  )
}

function InfoRow({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={mono ? "font-mono text-xs" : "text-xs font-medium"}>{value}</span>
    </div>
  )
}
