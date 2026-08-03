"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Workflow, Plus, Search, Play, Pause, Copy, Trash2,
  CheckCircle2, XCircle, Clock, Zap, Bot, TrendingUp,
  Settings, MoreHorizontal, ArrowRight, GitBranch, Timer,
  Mail, MessageSquare, Phone, FileText, RefreshCw,
} from "lucide-react"

const WORKFLOWS = [
  {
    id: "1", name: "Lead Qualification Pipeline", trigger: "New Lead", status: "active",
    executions: 1240, successRate: 94, avgDuration: "2.3s",
    nodes: 8, lastRun: "2m ago", category: "Sales",
    description: "Auto-qualifies leads using AI scoring, assigns reps, sends WhatsApp welcome message.",
  },
  {
    id: "2", name: "Customer Onboarding Sequence", trigger: "Deal Won", status: "active",
    executions: 342, successRate: 98, avgDuration: "1.1s",
    nodes: 12, lastRun: "1h ago", category: "CRM",
    description: "Sends welcome emails, creates onboarding tasks, schedules kickoff call.",
  },
  {
    id: "3", name: "Invoice Payment Reminder", trigger: "Invoice Overdue (3d)", status: "active",
    executions: 87, successRate: 91, avgDuration: "0.8s",
    nodes: 5, lastRun: "6h ago", category: "Billing",
    description: "Sends escalating WhatsApp + email reminders for overdue invoices.",
  },
  {
    id: "4", name: "AI Escalation Handler", trigger: "AI Confidence < 70%", status: "active",
    executions: 234, successRate: 99, avgDuration: "0.5s",
    nodes: 4, lastRun: "12m ago", category: "AI",
    description: "Routes low-confidence AI conversations to the correct human agent queue.",
  },
  {
    id: "5", name: "Contract Renewal Alert", trigger: "Contract Expires in 30d", status: "paused",
    executions: 56, successRate: 88, avgDuration: "1.5s",
    nodes: 7, lastRun: "2d ago", category: "Sales",
    description: "Notifies account managers and AI agent to initiate renewal conversation.",
  },
  {
    id: "6", name: "Support Ticket Escalation", trigger: "Ticket Unresolved 24h", status: "active",
    executions: 145, successRate: 97, avgDuration: "0.4s",
    nodes: 6, lastRun: "45m ago", category: "Support",
    description: "Escalates unresolved tickets to team leads and updates customer via WhatsApp.",
  },
]

const TRIGGER_ICONS: Record<string, React.ReactNode> = {
  "New Lead": <Zap className="size-3.5 text-yellow-500" />,
  "Deal Won": <CheckCircle2 className="size-3.5 text-green-500" />,
  "Invoice Overdue (3d)": <Clock className="size-3.5 text-red-500" />,
  "AI Confidence < 70%": <Bot className="size-3.5 text-primary" />,
  "Contract Expires in 30d": <Timer className="size-3.5 text-orange-500" />,
  "Ticket Unresolved 24h": <XCircle className="size-3.5 text-red-500" />,
}

const CATEGORY_COLORS: Record<string, string> = {
  Sales: "bg-blue-100 text-blue-700",
  CRM: "bg-purple-100 text-purple-700",
  Billing: "bg-green-100 text-green-700",
  AI: "bg-primary/10 text-primary",
  Support: "bg-orange-100 text-orange-700",
}

// Mini workflow canvas nodes
const NODE_TYPES = [
  { label: "Trigger", icon: Zap, color: "bg-yellow-500" },
  { label: "Condition", icon: GitBranch, color: "bg-blue-500" },
  { label: "AI Action", icon: Bot, color: "bg-primary" },
  { label: "Send Email", icon: Mail, color: "bg-green-500" },
  { label: "WhatsApp", icon: MessageSquare, color: "bg-emerald-500" },
  { label: "Voice Call", icon: Phone, color: "bg-purple-500" },
  { label: "CRM Update", icon: RefreshCw, color: "bg-orange-500" },
  { label: "Wait / Delay", icon: Timer, color: "bg-slate-500" },
  { label: "Generate Doc", icon: FileText, color: "bg-pink-500" },
]

export default function WorkflowsPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"list" | "builder">("list")

  const filtered = WORKFLOWS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.category.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: "Active Workflows", value: WORKFLOWS.filter((w) => w.status === "active").length, icon: Play },
    { label: "Executions Today", value: 847, icon: Zap },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Time Saved", value: "14h", icon: Clock },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Workflow Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">No-code visual automation for every business process.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setView(view === "list" ? "builder" : "list")}>
            <Settings className="size-4" />{view === "list" ? "Open Canvas" : "Back to List"}
          </Button>
          <Button><Plus className="size-4" />New Workflow</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
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

      {view === "builder" ? (
        /* Visual Canvas */
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-base">Visual Canvas — Lead Qualification Pipeline</CardTitle>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Undo</Button>
                <Button variant="outline" size="sm">Redo</Button>
                <Button size="sm"><Play className="size-4" />Test Run</Button>
                <Button size="sm">Save & Publish</Button>
              </div>
            </div>
          </CardHeader>
          <div className="flex h-[520px]">
            {/* Node Palette */}
            <div className="w-48 shrink-0 border-r border-border p-3 overflow-y-auto">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Node Types</p>
              <div className="space-y-1.5">
                {NODE_TYPES.map((node) => (
                  <div key={node.label} className="flex items-center gap-2.5 rounded-lg border border-border p-2 cursor-grab hover:bg-muted transition-colors">
                    <div className={`flex size-6 shrink-0 items-center justify-center rounded-md ${node.color}`}>
                      <node.icon className="size-3.5 text-white" />
                    </div>
                    <span className="text-xs font-medium">{node.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-muted/20 relative overflow-hidden" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
              {/* Sample flow nodes */}
              <div className="absolute top-8 left-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 p-3 w-40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-yellow-500"><Zap className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">Trigger</p><p className="text-xs text-muted-foreground">New Lead</p></div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground rotate-90" />
                  <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-3 w-40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary"><Bot className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">AI Score</p><p className="text-xs text-muted-foreground">Lead Scoring</p></div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground rotate-90" />
                  <div className="rounded-xl border-2 border-blue-400 bg-blue-50 p-3 w-40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500"><GitBranch className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">Condition</p><p className="text-xs text-muted-foreground">Score ≥ 70?</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-52 left-56">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-3 w-40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500"><MessageSquare className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">WhatsApp</p><p className="text-xs text-muted-foreground">Welcome Msg</p></div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground rotate-90" />
                  <div className="rounded-xl border-2 border-orange-400 bg-orange-50 p-3 w-40 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-orange-500"><RefreshCw className="size-4 text-white" /></div>
                      <div><p className="text-xs font-semibold">CRM Update</p><p className="text-xs text-muted-foreground">Assign Rep</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-52 right-48">
                <div className="rounded-xl border-2 border-slate-300 bg-slate-50 p-3 w-40 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-slate-500"><Timer className="size-4 text-white" /></div>
                    <div><p className="text-xs font-semibold">Wait</p><p className="text-xs text-muted-foreground">24 hours</p></div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Drag nodes from the palette to build your workflow
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* Workflow List */
        <>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input placeholder="Search workflows..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Categories</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((wf) => (
              <Card key={wf.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{wf.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>
                    </div>
                    <button className="shrink-0 ml-2"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                  </div>

                  <div className="flex items-center gap-2">
                    {TRIGGER_ICONS[wf.trigger]}
                    <span className="text-xs text-muted-foreground">{wf.trigger}</span>
                    <Badge className={`ml-auto text-xs ${CATEGORY_COLORS[wf.category]}`}>{wf.category}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Executions</p>
                      <p className="font-semibold text-sm">{wf.executions.toLocaleString()}</p>
                    </div>
                    <div className="border-x border-border">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className="font-semibold text-sm text-green-600">{wf.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Time</p>
                      <p className="font-semibold text-sm">{wf.avgDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{wf.nodes} nodes · Last run {wf.lastRun}</span>
                    <Badge variant={wf.status === "active" ? "secondary" : "outline"} className={wf.status === "active" ? "bg-green-100 text-green-700" : ""}>{wf.status}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs"><Settings className="size-3.5" />Edit</Button>
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
    </div>
  )
}
