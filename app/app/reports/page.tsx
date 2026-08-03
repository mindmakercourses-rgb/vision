"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText, Plus, Search, Download, Calendar, Bot, BarChart3,
  TrendingUp, Users, DollarSign, MessageSquare, Star, Clock,
  RefreshCw, Mail, Share2, Eye, Filter, Sparkles,
} from "lucide-react"

const REPORTS = [
  {
    id: "1", name: "Monthly Sales Performance", category: "Sales", frequency: "Monthly",
    lastRun: "Aug 1, 2026", nextRun: "Sep 1, 2026", status: "ready",
    description: "Complete overview of deals, pipeline, revenue, and team performance.",
    icon: DollarSign, color: "bg-green-500",
  },
  {
    id: "2", name: "AI Agents Efficiency Report", category: "AI", frequency: "Weekly",
    lastRun: "Jul 28, 2026", nextRun: "Aug 4, 2026", status: "ready",
    description: "Resolution rates, satisfaction scores, escalation patterns per agent.",
    icon: Bot, color: "bg-primary",
  },
  {
    id: "3", name: "Customer Health Scorecard", category: "CRM", frequency: "Weekly",
    lastRun: "Jul 30, 2026", nextRun: "Aug 6, 2026", status: "generating",
    description: "Engagement scores, churn risk, and account health metrics.",
    icon: Users, color: "bg-blue-500",
  },
  {
    id: "4", name: "WhatsApp Campaign Analytics", category: "Communication", frequency: "On-demand",
    lastRun: "Jul 25, 2026", nextRun: "—", status: "ready",
    description: "Delivery rates, open rates, conversion, and revenue from broadcast campaigns.",
    icon: MessageSquare, color: "bg-emerald-500",
  },
  {
    id: "5", name: "Executive Business Review", category: "Executive", frequency: "Monthly",
    lastRun: "Aug 1, 2026", nextRun: "Sep 1, 2026", status: "scheduled",
    description: "Board-ready summary: KPIs, growth metrics, and strategic highlights.",
    icon: TrendingUp, color: "bg-purple-500",
  },
  {
    id: "6", name: "Lead Source Attribution", category: "Marketing", frequency: "Monthly",
    lastRun: "Jul 15, 2026", nextRun: "Aug 15, 2026", status: "ready",
    description: "Which channels generate the best quality leads and highest conversion rates.",
    icon: BarChart3, color: "bg-orange-500",
  },
  {
    id: "7", name: "Team Activity Report", category: "HR", frequency: "Weekly",
    lastRun: "Jul 28, 2026", nextRun: "Aug 4, 2026", status: "ready",
    description: "Call logs, emails sent, meetings held, and task completion per team member.",
    icon: Clock, color: "bg-slate-500",
  },
  {
    id: "8", name: "Customer Satisfaction Index", category: "Support", frequency: "Daily",
    lastRun: "Aug 3, 2026", nextRun: "Aug 4, 2026", status: "ready",
    description: "CSAT scores, NPS trend, and feedback sentiment analysis.",
    icon: Star, color: "bg-yellow-500",
  },
]

const STATUS_STYLES: Record<string, string> = {
  ready: "bg-green-100 text-green-700",
  generating: "bg-blue-100 text-blue-700 animate-pulse",
  scheduled: "bg-gray-100 text-gray-600",
  failed: "bg-red-100 text-red-700",
}

const CATEGORIES = ["All", "Sales", "AI", "CRM", "Communication", "Executive", "Marketing", "HR", "Support"]

export default function ReportsPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = REPORTS.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === "All" || r.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">Scheduled and on-demand reports across your entire platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Sparkles className="size-4" />AI Report</Button>
          <Button><Plus className="size-4" />New Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Reports", value: REPORTS.length, icon: FileText },
          { label: "Scheduled", value: REPORTS.filter((r) => r.frequency !== "On-demand").length, icon: Calendar },
          { label: "Ready to View", value: REPORTS.filter((r) => r.status === "ready").length, icon: Eye },
          { label: "Generating", value: REPORTS.filter((r) => r.status === "generating").length, icon: RefreshCw },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
              </div>
              <s.icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Report Generator */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <Bot className="size-6 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold">AI Report Generator</p>
            <p className="text-xs text-muted-foreground">Describe any report in natural language and AI will generate it instantly.</p>
          </div>
          <Input placeholder='e.g. "Show me top 10 customers by revenue this quarter"' className="flex-1 max-w-md" />
          <Button size="sm"><Sparkles className="size-4" />Generate</Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${report.color}`}>
                  <report.icon className="size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-semibold text-sm leading-tight">{report.name}</p>
                    <Badge className={`text-xs shrink-0 ml-1 ${STATUS_STYLES[report.status]}`}>{report.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="size-3.5" />
                  {report.frequency}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {report.lastRun}
                </div>
              </div>

              {report.nextRun !== "—" && (
                <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  Next scheduled: <span className="font-medium text-foreground">{report.nextRun}</span>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Eye className="size-3.5" />View
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  <Download className="size-3.5" />Download
                </Button>
                <button className="rounded-md border border-border p-1.5 hover:bg-muted transition-colors">
                  <Mail className="size-3.5 text-muted-foreground" />
                </button>
                <button className="rounded-md border border-border p-1.5 hover:bg-muted transition-colors">
                  <Share2 className="size-3.5 text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
