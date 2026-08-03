"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp, DollarSign, Users, Bot, BarChart3, PieChart,
  Download, RefreshCw, Plus, Sparkles, ArrowUpRight, Target,
  Globe, Zap, Calendar,
} from "lucide-react"

const BI_WIDGETS = [
  { id: "revenue", title: "Revenue Overview", type: "bar", size: "large" },
  { id: "pipeline", title: "Pipeline by Stage", type: "funnel", size: "medium" },
  { id: "channels", title: "Channel Mix", type: "donut", size: "medium" },
  { id: "ai_perf", title: "AI Performance", type: "kpi", size: "small" },
]

function MiniBar({ values, color = "bg-primary" }: { values: number[]; color?: string }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-0.5 h-16">
      {values.map((v, i) => (
        <div key={i} className={`flex-1 rounded-sm ${color} opacity-80`} style={{ height: `${(v / max) * 64}px` }} />
      ))}
    </div>
  )
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  let cumulative = 0
  const radius = 36
  const cx = 50
  const cy = 50
  const segments = data.map((d) => {
    const startAngle = (cumulative / total) * 360
    const endAngle = ((cumulative + d.value) / total) * 360
    cumulative += d.value
    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180)
    const x1 = cx + radius * Math.cos(toRad(startAngle))
    const y1 = cy + radius * Math.sin(toRad(startAngle))
    const x2 = cx + radius * Math.cos(toRad(endAngle))
    const y2 = cy + radius * Math.sin(toRad(endAngle))
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z` }
  })
  return (
    <div className="flex items-center gap-6">
      <svg width="100" height="100" className="shrink-0">
        {segments.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <circle cx={cx} cy={cy} r={22} fill="var(--card)" />
      </svg>
      <div className="space-y-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <div className="size-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="ml-auto font-medium">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const CHANNEL_DATA = [
  { label: "WhatsApp", value: 42, color: "#22c55e" },
  { label: "Email", value: 28, color: "#3b82f6" },
  { label: "Voice", value: 18, color: "#a855f7" },
  { label: "Live Chat", value: 12, color: "#f97316" },
]

const EXECUTIVE_METRICS = [
  { label: "MRR", value: "$124,000", change: "+18%", icon: DollarSign, trend: "up" },
  { label: "ARR Run Rate", value: "$1.49M", change: "+18%", icon: TrendingUp, trend: "up" },
  { label: "Customer Count", value: "142", change: "+12", icon: Users, trend: "up" },
  { label: "NPS Score", value: "72", change: "+8pts", icon: Target, trend: "up" },
  { label: "AI Resolutions", value: "88%", change: "+5%", icon: Bot, trend: "up" },
  { label: "Avg Deal Size", value: "$38,500", change: "+22%", icon: Zap, trend: "up" },
]

const REGIONAL_DATA = [
  { region: "Egypt", leads: 142, revenue: "$680K", growth: "+24%", topCity: "Cairo" },
  { region: "Saudi Arabia", leads: 67, revenue: "$340K", growth: "+31%", topCity: "Riyadh" },
  { region: "UAE", leads: 48, revenue: "$245K", growth: "+19%", topCity: "Dubai" },
  { region: "Kuwait", leads: 18, revenue: "$87K", growth: "+42%", topCity: "Kuwait City" },
  { region: "Jordan", leads: 9, revenue: "$41K", growth: "+15%", topCity: "Amman" },
]

export default function BIPage() {
  const [view, setView] = useState<"executive" | "custom">("executive")

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Business Intelligence</h1>
          <p className="mt-1 text-sm text-muted-foreground">Executive dashboards, custom charts, and strategic data views.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["executive", "custom"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{v}</button>
            ))}
          </div>
          <Button variant="outline" size="sm"><Plus className="size-4" />Add Widget</Button>
          <Button variant="outline" size="sm"><Download className="size-4" />Export PDF</Button>
          <Button variant="outline" size="sm"><RefreshCw className="size-4" /></Button>
        </div>
      </div>

      {view === "executive" ? (
        <>
          {/* Executive KPI Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {EXECUTIVE_METRICS.map((m) => (
              <Card key={m.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <m.icon className="size-4 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold tabular-nums">{m.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="size-3.5 text-green-500" />
                    <span className="text-xs font-medium text-green-600">{m.change} vs last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue by Month (2026)</CardTitle>
              </CardHeader>
              <CardContent>
                <MiniBar values={[68, 75, 62, 89, 95, 78, 112, 124]} color="bg-primary" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => <span key={m}>{m}</span>)}
                </div>
                <div className="mt-4 flex items-center gap-6 text-sm">
                  <div><p className="text-muted-foreground text-xs">YTD Revenue</p><p className="font-semibold">$703K</p></div>
                  <div><p className="text-muted-foreground text-xs">Annual Target</p><p className="font-semibold">$1.5M</p></div>
                  <div><p className="text-muted-foreground text-xs">Attainment</p><p className="font-semibold text-primary">47%</p></div>
                  <div className="flex-1">
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: "47%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Channel Mix</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart data={CHANNEL_DATA} />
              </CardContent>
            </Card>
          </div>

          {/* Regional Breakdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="size-4 text-muted-foreground" />
                Regional Performance — MENA
              </CardTitle>
              <Badge variant="outline" className="text-xs">5 Markets</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 font-medium text-muted-foreground">Region</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Active Leads</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Revenue</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Growth</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Top City</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REGIONAL_DATA.map((r) => (
                      <tr key={r.region} className="border-b border-border hover:bg-muted/40">
                        <td className="px-4 py-3 font-medium">{r.region}</td>
                        <td className="px-4 py-3">{r.leads}</td>
                        <td className="px-4 py-3 font-semibold">{r.revenue}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-green-600">
                            <ArrowUpRight className="size-3.5" />
                            <span className="font-medium text-xs">{r.growth}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{r.topCity}</td>
                        <td className="px-4 py-3">
                          <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${(r.leads / 142) * 100}%` }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* AI Commentary */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex gap-4 p-5">
              <Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">AI Executive Summary — August 2026</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Revenue is tracking 18% above last month driven by 3 enterprise closes. The MENA pipeline is healthy with 5 active regions showing positive growth. Kuwait is emerging as the fastest-growing market at +42%. AI agents handled 88% of all customer conversations, reducing support costs by an estimated $28,000. Key risk: Smart Buildings Co engagement score has dropped — recommend proactive retention outreach by EOW.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Custom Dashboard Builder */
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Custom Dashboard Builder</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Reset</Button>
                <Button size="sm">Save Dashboard</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: "Drag Widget Here", empty: true },
                { title: "Drag Widget Here", empty: true },
                { title: "Drag Widget Here", empty: true },
                { title: "Drag Widget Here", empty: true },
                { title: "Drag Widget Here", empty: true },
                { title: "Drag Widget Here", empty: true },
              ].map((_, i) => (
                <div key={i} className="flex h-36 items-center justify-center rounded-xl border-2 border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <Plus className="size-6" />
                    <span>Add Widget</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Available Widgets</p>
              <div className="flex flex-wrap gap-2">
                {["Revenue Chart", "Lead Funnel", "AI Performance", "Channel Mix", "Deal Pipeline", "Top Contacts", "Activity Feed", "Regional Map", "CSAT Trend", "Team Leaderboard"].map((w) => (
                  <button key={w} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted hover:border-primary transition-colors">
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
