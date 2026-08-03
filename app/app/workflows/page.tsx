"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Workflow, Plus, Search, Play, Pause, Settings, Copy, MoreHorizontal,
  CheckCircle2, XCircle, Clock, Zap, Bot, TrendingUp, AlertTriangle,
  GitBranch, Timer, Mail, MessageSquare, Phone, FileText, RefreshCw,
  BarChart3, Activity, ArrowRight, Layers, Store, Eye, Undo2, Redo2,
  Trash2, MousePointer2, Grid3X3, Minimize2, Maximize2, Database,
  Globe, Brain, SplitSquareHorizontal, Code, Calendar, Users, DollarSign,
} from "lucide-react"

type Tab = "workflows" | "canvas" | "monitoring" | "marketplace"

const WORKFLOWS = [
  {
    id: "1", name: "Lead Qualification Pipeline", trigger: "New Lead Created", status: "active",
    executions: 1240, successRate: 94, avgDuration: "2.3s", nodes: 8,
    lastRun: "2m ago", category: "Sales", lastEdited: "3d ago",
    description: "AI-scores leads, assigns reps, sends WhatsApp welcome, creates follow-up tasks.",
  },
  {
    id: "2", name: "Customer Onboarding Sequence", trigger: "Deal Won", status: "active",
    executions: 342, successRate: 98, avgDuration: "1.1s", nodes: 12,
    lastRun: "1h ago", category: "CRM", lastEdited: "1w ago",
    description: "Sends welcome emails, creates onboarding tasks, schedules kickoff call.",
  },
  {
    id: "3", name: "Invoice Payment Reminder", trigger: "Invoice Overdue +3d", status: "active",
    executions: 87, successRate: 91, avgDuration: "0.8s", nodes: 5,
    lastRun: "6h ago", category: "Finance", lastEdited: "2w ago",
    description: "Escalating WhatsApp + email reminders for overdue invoices.",
  },
  {
    id: "4", name: "AI Escalation Handler", trigger: "AI Confidence < 70%", status: "active",
    executions: 234, successRate: 99, avgDuration: "0.5s", nodes: 4,
    lastRun: "12m ago", category: "AI", lastEdited: "5d ago",
    description: "Routes low-confidence AI conversations to the correct human agent queue.",
  },
  {
    id: "5", name: "Contract Renewal Alert", trigger: "Contract Expires in 30d", status: "paused",
    executions: 56, successRate: 88, avgDuration: "1.5s", nodes: 7,
    lastRun: "2d ago", category: "Sales", lastEdited: "3w ago",
    description: "Notifies account managers and initiates renewal conversation.",
  },
  {
    id: "6", name: "Support Ticket Escalation", trigger: "Ticket Unresolved 24h", status: "active",
    executions: 145, successRate: 97, avgDuration: "0.4s", nodes: 6,
    lastRun: "45m ago", category: "Support", lastEdited: "1w ago",
    description: "Escalates unresolved tickets to team leads, updates customer via WhatsApp.",
  },
  {
    id: "7", name: "Employee Onboarding Flow", trigger: "New Employee Added", status: "draft",
    executions: 0, successRate: 0, avgDuration: "—", nodes: 14,
    lastRun: "Never", category: "HR", lastEdited: "Today",
    description: "Automates IT provisioning, training schedule, welcome messages, and manager intros.",
  },
]

const NODE_PALETTE = [
  { group: "Core", nodes: [
    { label: "Start / Trigger", icon: Zap, color: "bg-yellow-500", desc: "Workflow entry point" },
    { label: "Condition / If", icon: GitBranch, color: "bg-blue-500", desc: "Branch on logic" },
    { label: "Wait / Delay", icon: Timer, color: "bg-slate-500", desc: "Pause execution" },
    { label: "Loop / For Each", icon: RefreshCw, color: "bg-indigo-500", desc: "Iterate over list" },
    { label: "End", icon: CheckCircle2, color: "bg-green-500", desc: "Workflow end" },
    { label: "Error Handler", icon: XCircle, color: "bg-red-500", desc: "Catch & handle errors" },
  ]},
  { group: "AI", nodes: [
    { label: "AI Agent", icon: Bot, color: "bg-primary", desc: "Run an AI agent" },
    { label: "AI Classify", icon: Brain, color: "bg-purple-500", desc: "Classify text" },
    { label: "AI Summary", icon: FileText, color: "bg-violet-500", desc: "Summarize content" },
    { label: "AI Translation", icon: Globe, color: "bg-teal-500", desc: "Translate text" },
  ]},
  { group: "Communication", nodes: [
    { label: "Send Email", icon: Mail, color: "bg-blue-600", desc: "Send an email" },
    { label: "WhatsApp", icon: MessageSquare, color: "bg-emerald-500", desc: "Send WhatsApp" },
    { label: "SMS", icon: Phone, color: "bg-purple-600", desc: "Send SMS" },
  ]},
  { group: "CRM", nodes: [
    { label: "CRM Update", icon: RefreshCw, color: "bg-orange-500", desc: "Update CRM record" },
    { label: "Create Task", icon: CheckCircle2, color: "bg-green-600", desc: "Create CRM task" },
    { label: "Assign Rep", icon: Users, color: "bg-pink-500", desc: "Assign to team member" },
  ]},
  { group: "Data", nodes: [
    { label: "Database Query", icon: Database, color: "bg-cyan-600", desc: "Query DB" },
    { label: "REST API", icon: Globe, color: "bg-sky-500", desc: "Call external API" },
    { label: "Generate PDF", icon: FileText, color: "bg-rose-500", desc: "Create PDF document" },
  ]},
]

const CATEGORY_COLORS: Record<string, string> = {
  Sales: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  CRM: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  Finance: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  AI: "bg-primary/10 text-primary",
  Support: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  HR: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400",
}

const TEMPLATE_WORKFLOWS = [
  { name: "Lead Qualification", category: "Sales", installs: 842, rating: 4.9 },
  { name: "Invoice Reminder", category: "Finance", installs: 631, rating: 4.8 },
  { name: "Customer Onboarding", category: "CRM", installs: 519, rating: 4.7 },
  { name: "Employee Onboarding", category: "HR", installs: 412, rating: 4.6 },
  { name: "Support Escalation", category: "Support", installs: 378, rating: 4.8 },
  { name: "Appointment Reminder", category: "CRM", installs: 294, rating: 4.5 },
]

export default function WorkflowsPage() {
  const [tab, setTab] = useState<Tab>("workflows")
  const [search, setSearch] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [selectedWorkflow, setSelectedWorkflow] = useState(WORKFLOWS[0])

  const filtered = WORKFLOWS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.category.toLowerCase().includes(search.toLowerCase())
  )

  const kpis = [
    { label: "Total Workflows", value: WORKFLOWS.length, icon: Workflow },
    { label: "Active", value: WORKFLOWS.filter((w) => w.status === "active").length, icon: Play },
    { label: "Executions Today", value: "847", icon: Zap },
    { label: "Success Rate", value: "95.4%", icon: TrendingUp },
    { label: "Failed Today", value: "12", icon: AlertTriangle },
    { label: "Avg Duration", value: "1.1s", icon: Clock },
    { label: "Time Saved (MTD)", value: "284h", icon: Timer },
    { label: "Monthly Cost", value: "$18", icon: DollarSign },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Visual Workflow Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No-code automation canvas — drag, connect, and deploy enterprise workflows.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setTab("marketplace")}>
            <Store className="size-4" />Templates
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTab("canvas")}>
            <Grid3X3 className="size-4" />Open Canvas
          </Button>
          <Button><Plus className="size-4" />New Workflow</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        {(["workflows", "canvas", "monitoring", "marketplace"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "canvas" ? "Canvas Builder" : t === "marketplace" ? "Marketplace" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── WORKFLOWS LIST ── */}
      {tab === "workflows" && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardContent className="p-3 space-y-1">
                  <k.icon className="size-4 text-muted-foreground" />
                  <p className="text-lg font-semibold leading-none">{k.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{k.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Generator */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="size-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-semibold">AI Workflow Generator</p>
                  <p className="text-xs text-muted-foreground">Describe a business process in plain language and we will build the workflow automatically.</p>
                  <div className="flex gap-2">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={`e.g. "When a new lead is created, score it with AI, assign to sales rep, send WhatsApp message, create follow-up task after 2 days"`}
                      className="flex-1 text-sm bg-card"
                    />
                    <Button size="sm"><Brain className="size-4" />Generate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input
                placeholder="Search workflows..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent px-0 focus-visible:ring-0"
              />
            </div>
            <Button variant="outline" size="sm">All Categories</Button>
            <Button variant="outline" size="sm">All Status</Button>
          </div>

          {/* Workflow cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((wf) => (
              <Card key={wf.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{wf.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{wf.description}</p>
                    </div>
                    <button className="ml-2 shrink-0"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                  </div>

                  {/* Trigger + category */}
                  <div className="flex items-center gap-2">
                    <Zap className="size-3.5 text-yellow-500 shrink-0" />
                    <span className="text-xs text-muted-foreground flex-1 truncate">{wf.trigger}</span>
                    <Badge className={`text-xs shrink-0 ${CATEGORY_COLORS[wf.category]}`}>{wf.category}</Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Runs</p>
                      <p className="font-semibold text-sm">{wf.executions > 0 ? wf.executions.toLocaleString() : "—"}</p>
                    </div>
                    <div className="border-x border-border">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className={`font-semibold text-sm ${wf.successRate > 90 ? "text-green-600" : "text-yellow-600"}`}>{wf.successRate > 0 ? `${wf.successRate}%` : "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Time</p>
                      <p className="font-semibold text-sm">{wf.avgDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{wf.nodes} nodes · {wf.lastRun}</span>
                    <Badge
                      className={wf.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : wf.status === "draft" ? "bg-muted text-muted-foreground" : "bg-yellow-100 text-yellow-700"}
                    >
                      {wf.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => { setSelectedWorkflow(wf); setTab("canvas") }}>
                      <Grid3X3 className="size-3.5" />Edit Canvas
                    </Button>
                    {wf.status === "active" ? (
                      <Button variant="outline" size="sm" className="text-xs"><Pause className="size-3.5" /></Button>
                    ) : (
                      <Button size="sm" className="text-xs"><Play className="size-3.5" /></Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs"><Copy className="size-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ── CANVAS BUILDER ── */}
      {tab === "canvas" && (
        <div className="space-y-3">
          {/* Canvas toolbar */}
          <Card>
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex items-center gap-2 mr-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                  <Workflow className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">{selectedWorkflow.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedWorkflow.nodes} nodes · {selectedWorkflow.status}</p>
                </div>
              </div>
              <div className="flex gap-1.5 border-x border-border px-3">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Undo2 className="size-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Redo2 className="size-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Copy className="size-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Trash2 className="size-4" /></Button>
              </div>
              <div className="flex gap-1.5 border-r border-border pr-3">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Minimize2 className="size-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Maximize2 className="size-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Grid3X3 className="size-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MousePointer2 className="size-4" /></Button>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm"><Play className="size-4" />Test Run</Button>
                <Button variant="outline" size="sm"><Eye className="size-4" />Debug</Button>
                <Button size="sm">Save & Publish</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            {/* Node Palette */}
            <Card className="w-52 shrink-0">
              <CardHeader className="pb-1 pt-3 px-3">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Node Palette</CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-3 overflow-y-auto max-h-[520px]">
                {NODE_PALETTE.map((group) => (
                  <div key={group.group}>
                    <p className="px-1 text-xs font-semibold text-muted-foreground mb-1">{group.group}</p>
                    <div className="space-y-1">
                      {group.nodes.map((node) => (
                        <div key={node.label} className="flex items-center gap-2 rounded-lg border border-border p-2 cursor-grab hover:bg-muted hover:border-primary/30 transition-colors">
                          <div className={`flex size-6 shrink-0 items-center justify-center rounded-md ${node.color}`}>
                            <node.icon className="size-3.5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate leading-none">{node.label}</p>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">{node.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card className="flex-1 overflow-hidden">
              <div
                className="relative h-[560px] overflow-hidden bg-muted/10"
                style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              >
                {/* Mini map */}
                <div className="absolute bottom-3 right-3 w-32 h-20 rounded-lg border border-border bg-card/90 p-1.5 text-xs text-center text-muted-foreground flex items-center justify-center">
                  Mini Map
                </div>

                {/* Zoom controls */}
                <div className="absolute bottom-3 left-3 flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">+</Button>
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-xs">100%</Button>
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">-</Button>
                </div>

                {/* Workflow nodes for "Lead Qualification Pipeline" */}
                {/* Row 1 — Trigger */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2">
                  <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 w-44 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-yellow-500"><Zap className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">Trigger</p><p className="text-xs text-muted-foreground">New Lead Created</p></div>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                <div className="absolute top-[112px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="h-6 w-px bg-border" />
                  <ArrowRight className="size-3 text-muted-foreground rotate-90" />
                </div>

                {/* Row 2 — AI Score */}
                <div className="absolute top-[136px] left-1/2 -translate-x-1/2">
                  <div className="rounded-xl border-2 border-primary/50 bg-primary/5 p-3 w-44 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary"><Bot className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">AI Agent</p><p className="text-xs text-muted-foreground">Lead Scoring</p></div>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                <div className="absolute top-[222px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="h-6 w-px bg-border" />
                  <ArrowRight className="size-3 text-muted-foreground rotate-90" />
                </div>

                {/* Row 3 — Condition */}
                <div className="absolute top-[248px] left-1/2 -translate-x-1/2">
                  <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 w-44 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500"><GitBranch className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">Condition</p><p className="text-xs text-muted-foreground">Score &ge; 70?</p></div>
                    </div>
                  </div>
                </div>

                {/* Branch Yes */}
                <div className="absolute top-[340px] left-[calc(50%-160px)]">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-green-600">YES</span>
                    <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-3 w-40 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500"><MessageSquare className="size-3.5 text-white" /></div>
                        <div><p className="text-xs font-semibold">WhatsApp</p><p className="text-xs text-muted-foreground">Welcome Msg</p></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch No */}
                <div className="absolute top-[340px] left-[calc(50%+80px)]">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-red-500">NO</span>
                    <div className="rounded-xl border-2 border-slate-300 bg-slate-50 dark:bg-slate-900/20 p-3 w-40 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-slate-500"><Timer className="size-3.5 text-white" /></div>
                        <div><p className="text-xs font-semibold">Wait 7 Days</p><p className="text-xs text-muted-foreground">Nurture Delay</p></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 5 — Assign Rep */}
                <div className="absolute top-[440px] left-[calc(50%-160px)]">
                  <div className="rounded-xl border-2 border-orange-400 bg-orange-50 dark:bg-orange-900/20 p-3 w-40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-orange-500"><RefreshCw className="size-3.5 text-white" /></div>
                      <div><p className="text-xs font-semibold">Assign Rep</p><p className="text-xs text-muted-foreground">CRM Update</p></div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Drag nodes from the palette to build your workflow
                </div>
              </div>

              {/* Properties panel */}
              <div className="border-t border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Selected Node — AI Agent: Lead Scoring</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Agent</label>
                    <Input className="h-8 text-xs" defaultValue="Sara — Sales Agent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Prompt Template</label>
                    <Input className="h-8 text-xs" defaultValue="Lead Qualification Prompt v2" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Output Variable</label>
                    <Input className="h-8 text-xs" defaultValue="lead_score" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── MONITORING ── */}
      {tab === "monitoring" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Executions Today", value: "847", icon: Activity, color: "text-blue-500" },
              { label: "Avg Duration", value: "1.1s", icon: Clock, color: "text-purple-500" },
              { label: "Failed Today", value: "12", icon: XCircle, color: "text-red-500" },
              { label: "Active Runs Now", value: "6", icon: Zap, color: "text-yellow-500" },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="flex items-start justify-between p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="mt-1 text-2xl font-semibold">{m.value}</p>
                  </div>
                  <m.icon className={`size-5 mt-0.5 ${m.color}`} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Execution history */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Execution History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { wf: "Lead Qualification", run: "#1247", status: "success", dur: "2.1s", ts: "2m ago", trigger: "New Lead" },
                  { wf: "Support Escalation", run: "#843", status: "success", dur: "0.4s", ts: "4m ago", trigger: "Ticket Unresolved" },
                  { wf: "Invoice Reminder", run: "#312", status: "failed", dur: "0.8s", ts: "8m ago", trigger: "Overdue Invoice" },
                  { wf: "Customer Onboarding", run: "#199", status: "success", dur: "1.2s", ts: "15m ago", trigger: "Deal Won" },
                  { wf: "AI Escalation", run: "#2181", status: "success", dur: "0.5s", ts: "18m ago", trigger: "Low Confidence" },
                  { wf: "Invoice Reminder", run: "#311", status: "success", dur: "0.9s", ts: "1h ago", trigger: "Overdue Invoice" },
                  { wf: "Lead Qualification", run: "#1246", status: "success", dur: "2.4s", ts: "1h ago", trigger: "New Lead" },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-muted/30 transition-colors">
                    <div className={`size-2 shrink-0 rounded-full ${e.status === "success" ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="font-medium w-40 shrink-0 truncate">{e.wf}</span>
                    <span className="text-muted-foreground text-xs w-16 shrink-0">{e.run}</span>
                    <span className="text-muted-foreground text-xs flex-1 truncate">{e.trigger}</span>
                    <span className="text-muted-foreground text-xs w-10 shrink-0">{e.dur}</span>
                    <Badge className={`text-xs ${e.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{e.status}</Badge>
                    <span className="text-xs text-muted-foreground w-14 shrink-0 text-right">{e.ts}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflow health */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Workflow Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {WORKFLOWS.filter((w) => w.status !== "draft").map((wf) => (
                  <div key={wf.id} className="flex items-center gap-4">
                    <span className="w-48 shrink-0 text-sm font-medium truncate">{wf.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${wf.successRate >= 95 ? "bg-green-500" : wf.successRate >= 85 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${wf.successRate}%` }} />
                    </div>
                    <span className="w-12 text-right text-sm font-medium shrink-0">{wf.successRate > 0 ? `${wf.successRate}%` : "—"}</span>
                    <Badge className={wf.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>{wf.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── MARKETPLACE ── */}
      {tab === "marketplace" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input placeholder="Search workflow templates..." className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Categories</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATE_WORKFLOWS.map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                        <Workflow className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <Badge className={`text-xs mt-0.5 ${CATEGORY_COLORS[t.category]}`}>{t.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold">{t.rating} ★</p>
                      <p className="text-xs text-muted-foreground">{t.installs} installs</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs"><Eye className="size-3.5" />Preview</Button>
                    <Button size="sm" className="flex-1 text-xs"><Plus className="size-3.5" />Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
