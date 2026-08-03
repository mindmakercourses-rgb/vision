"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  TrendingUp,
  TrendingDown,
  Users,
  Bot,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Star,
  Award,
  PlayCircle,
  BarChart3,
  Target,
  Zap,
  Clock,
  DollarSign,
  Activity,
} from "lucide-react"

const HEALTH_ACCOUNTS = [
  { name: "TechCorp Egypt", score: 87, trend: "up", adoption: 92, dau: 38, risk: "low", plan: "Enterprise", renewal: "Dec 2025" },
  { name: "Smart Buildings Co", score: 73, trend: "down", adoption: 68, dau: 22, risk: "medium", plan: "Growth", renewal: "Mar 2025" },
  { name: "Gulf Trading LLC", score: 91, trend: "up", adoption: 96, dau: 14, risk: "low", plan: "Professional", renewal: "Aug 2026" },
  { name: "Nile Logistics", score: 44, trend: "down", adoption: 38, dau: 4, risk: "high", plan: "Starter", renewal: "Sep 2024" },
  { name: "Digital Solutions", score: 61, trend: "up", adoption: 55, dau: 7, risk: "medium", plan: "Professional", renewal: "Jan 2026" },
]

const ADOPTION_METRICS = [
  { module: "CRM Core", pct: 94 },
  { module: "WhatsApp AI", pct: 88 },
  { module: "Workflow Builder", pct: 71 },
  { module: "AI Agents", pct: 64 },
  { module: "Analytics", pct: 58 },
  { module: "Knowledge Base", pct: 52 },
  { module: "Voice AI", pct: 41 },
  { module: "Developer API", pct: 18 },
]

const COURSES = [
  { title: "CRM Foundations", level: "Beginner", duration: "2h 30m", enrolled: 142, completed: 118, cert: true },
  { title: "AI Agents Mastery", level: "Professional", duration: "4h 15m", enrolled: 84, completed: 51, cert: true },
  { title: "Workflow Automation", level: "Professional", duration: "3h 00m", enrolled: 97, completed: 73, cert: true },
  { title: "Administrator Certification", level: "Administrator", duration: "6h 45m", enrolled: 29, completed: 14, cert: true },
  { title: "Developer Platform", level: "Developer", duration: "5h 30m", enrolled: 12, completed: 6, cert: true },
  { title: "AI Specialist Track", level: "AI Specialist", duration: "8h 00m", enrolled: 22, completed: 9, cert: true },
]

const RISK_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-600",
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444"
  return (
    <div className="relative flex size-14 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="56" height="56">
        <circle cx="28" cy="28" r="22" fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx="28" cy="28" r="22" fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${(score / 100) * 138.2} 138.2`} strokeLinecap="round" />
      </svg>
      <span className="relative text-xs font-bold tabular-nums" style={{ color }}>{score}</span>
    </div>
  )
}

export default function CustomerSuccessPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customer Success & AI Adoption</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor health scores, adoption, learning progress, and churn prevention across all accounts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><BarChart3 className="size-4" />Generate Report</Button>
          <Button><Bot className="size-4" />AI Coach</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Avg Health Score", value: "71", sub: "Across 5 accounts", icon: Heart, color: "text-rose-500" },
          { label: "AI Adoption Rate", value: "76%", sub: "+8% this month", icon: Bot, color: "text-purple-500" },
          { label: "At-Risk Accounts", value: "2", sub: "Intervention needed", icon: AlertTriangle, color: "text-red-500" },
          { label: "Renewal Probability", value: "84%", sub: "Next 90 days", icon: TrendingUp, color: "text-green-500" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
              <s.icon className={`size-5 ${s.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Account Health */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Account Health Dashboard</CardTitle>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs"><Target className="size-3.5" />Playbooks</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {HEALTH_ACCOUNTS.map((a) => (
                <div key={a.name} className="flex items-center gap-4 rounded-xl border border-border px-4 py-3">
                  <ScoreRing score={a.score} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{a.name}</p>
                      <Badge className={`${RISK_COLORS[a.risk]} border-0 text-xs`}>{a.risk} risk</Badge>
                      <Badge variant="outline" className="text-[10px]">{a.plan}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Adoption {a.adoption}% · {a.dau} DAU · Renews {a.renewal}</p>
                    <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden w-32">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${a.adoption}%` }} />
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 text-xs">
                    {a.trend === "up" ? <TrendingUp className="size-4 text-green-500" /> : <TrendingDown className="size-4 text-red-500" />}
                    <span className={a.trend === "up" ? "text-green-600" : "text-red-500"}>{a.trend === "up" ? "Improving" : "Declining"}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Academy */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2"><BookOpen className="size-4" />Vision Academy</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs">View All Courses</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {COURSES.map((c) => (
                <div key={c.title} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <PlayCircle className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{c.title}</p>
                      {c.cert && <Award className="size-3.5 text-yellow-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{c.level} · {c.duration} · {c.enrolled} enrolled</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden max-w-[80px]">
                        <div className="h-full rounded-full bg-green-500" style={{ width: `${Math.round((c.completed / c.enrolled) * 100)}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{Math.round((c.completed / c.enrolled) * 100)}% completion</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 h-7 text-xs">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Adoption + AI Coach */}
        <div className="space-y-4">
          {/* Feature Adoption */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Feature Adoption</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {ADOPTION_METRICS.map((m) => (
                <div key={m.module} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{m.module}</span>
                    <span className="font-medium">{m.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${m.pct >= 80 ? "bg-green-500" : m.pct >= 60 ? "bg-primary" : m.pct >= 40 ? "bg-yellow-500" : "bg-red-400"}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Coach */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bot className="size-4" />AI Coach Recommendations</CardTitle></CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { text: "Nile Logistics hasn't used AI Agents in 30 days. Send re-engagement email.", action: "Send", urgent: true },
                { text: "Smart Buildings Co team completed 0 academy courses. Schedule training.", action: "Schedule", urgent: false },
                { text: "TechCorp Egypt is ready for AI Specialist certification — upsell opportunity.", action: "Offer", urgent: false },
                { text: "Gulf Trading LLC usage trending up — great candidate for case study.", action: "Review", urgent: false },
              ].map((r, i) => (
                <div key={i} className={`flex items-start gap-3 rounded-lg p-3 text-xs ${r.urgent ? "border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800" : "bg-muted/40"}`}>
                  <AlertTriangle className={`size-3.5 mt-0.5 shrink-0 ${r.urgent ? "text-red-500" : "text-yellow-500"}`} />
                  <p className="flex-1 leading-snug text-muted-foreground">{r.text}</p>
                  <Button variant="outline" size="sm" className="shrink-0 h-6 text-[10px] px-2">{r.action}</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Metrics */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Zap className="size-4" />AI Adoption Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "AI Requests Today", value: "4,820" },
                { label: "Agents Used", value: "12" },
                { label: "Response Accept Rate", value: "88%" },
                { label: "Time Saved (hrs)", value: "142h" },
                { label: "Est. Cost Savings", value: "$18,400" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm">
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <span className="font-semibold">{m.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
