"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bot, Plus, Search, Play, Pause, Settings, Copy, MoreHorizontal,
  MessageSquare, Mail, Phone, Globe, Brain, Zap, Star, CheckCircle2,
  Clock, Sparkles, FlaskConical, TrendingUp, ShieldAlert, BookOpen,
  Wrench, BarChart3, Activity, Users, DollarSign, ChevronRight,
  Store, ArrowUpRight, AlertTriangle, Eye, Layers,
} from "lucide-react"

// ── Tabs ─────────────────────────────────────────────────────────
type Tab = "agents" | "create" | "monitoring" | "marketplace"

// ── Mock data ────────────────────────────────────────────────────
const AI_AGENTS = [
  {
    id: "1", name: "Sara", role: "Sales Agent", avatar: "S",
    dept: "Sales", status: "active", model: "GPT-4o", version: "2.4",
    personality: "Professional & Sales-Oriented",
    channels: ["whatsapp", "email", "voice"],
    purpose: "Sales",
    description: "Handles lead qualification, demos, proposals, and deal closing.",
    knowledge: ["Product Catalog", "Pricing Guide", "Objection Handling"],
    tools: ["CRM Update", "Calendar Booking", "Invoice Generator"],
    stats: { conversations: 1240, resolved: "88%", satisfaction: 4.8, revenue: "$124K", escalations: "4%", tokens: "2.4M" },
  },
  {
    id: "2", name: "Omar", role: "Support Agent", avatar: "O",
    dept: "Customer Support", status: "active", model: "Claude 3.5", version: "1.8",
    personality: "Empathetic & Support-Oriented",
    channels: ["whatsapp", "email", "chat"],
    purpose: "Customer Support",
    description: "Resolves customer issues, manages tickets, and escalates when needed.",
    knowledge: ["FAQ Database", "Product Manuals", "Refund Policy"],
    tools: ["Ticket Creator", "Customer Lookup", "Refund Action"],
    stats: { conversations: 3420, resolved: "91%", satisfaction: 4.9, revenue: "$0", escalations: "3%", tokens: "5.1M" },
  },
  {
    id: "3", name: "Lina", role: "Billing Agent", avatar: "L",
    dept: "Finance", status: "active", model: "GPT-4o", version: "1.2",
    personality: "Formal & Professional",
    channels: ["email", "whatsapp"],
    purpose: "Finance",
    description: "Handles invoice queries, payment follow-ups, and billing disputes.",
    knowledge: ["Invoice Database", "Payment Terms", "Tax Regulations"],
    tools: ["Invoice Lookup", "Payment Gateway", "Report Generator"],
    stats: { conversations: 540, resolved: "94%", satisfaction: 4.7, revenue: "$0", escalations: "2%", tokens: "0.9M" },
  },
  {
    id: "4", name: "Karim", role: "CEO Assistant", avatar: "K",
    dept: "Executive", status: "paused", model: "GPT-4o", version: "1.0",
    personality: "Executive & Formal",
    channels: ["email", "voice"],
    purpose: "Executive Assistant",
    description: "Manages executive communications, scheduling, and briefings.",
    knowledge: ["Company Policies", "Board Reports", "KPI Dashboard"],
    tools: ["Calendar Manager", "Report Generator", "Email Composer"],
    stats: { conversations: 180, resolved: "96%", satisfaction: 4.9, revenue: "$0", escalations: "1%", tokens: "0.3M" },
  },
  {
    id: "5", name: "Hana", role: "Marketing Agent", avatar: "H",
    dept: "Marketing", status: "draft", model: "GPT-4o Mini", version: "0.1",
    personality: "Friendly & Creative",
    channels: ["email", "whatsapp"],
    purpose: "Marketing",
    description: "Generates campaign content, manages social responses, qualifies marketing leads.",
    knowledge: [], tools: [],
    stats: { conversations: 0, resolved: "—", satisfaction: 0, revenue: "$0", escalations: "—", tokens: "0" },
  },
  {
    id: "6", name: "Rami", role: "HR Agent", avatar: "R",
    dept: "HR", status: "training", model: "GPT-4o", version: "0.3",
    personality: "Friendly & Supportive",
    channels: ["email", "chat"],
    purpose: "HR",
    description: "Handles onboarding, leave requests, policy questions, and recruitment screening.",
    knowledge: ["HR Policies", "Employee Handbook"], tools: ["Leave System", "Calendar Booking"],
    stats: { conversations: 24, resolved: "82%", satisfaction: 4.3, revenue: "$0", escalations: "8%", tokens: "42K" },
  },
]

const WIZARD_STEPS = [
  "Identity", "Purpose & Model", "Personality & Style",
  "Knowledge", "Tools & Actions", "Permissions & Safety", "Test & Publish",
]

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  whatsapp: <MessageSquare className="size-3.5 text-green-500" />,
  email: <Mail className="size-3.5 text-blue-500" />,
  voice: <Phone className="size-3.5 text-purple-500" />,
  chat: <Globe className="size-3.5 text-orange-500" />,
}

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  active:   { badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",   dot: "bg-green-500" },
  paused:   { badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400", dot: "bg-yellow-500" },
  draft:    { badge: "bg-muted text-muted-foreground",  dot: "bg-muted-foreground" },
  training: { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",    dot: "bg-blue-500 animate-pulse" },
}

const MARKETPLACE_AGENTS = [
  { name: "Legal Advisor AI", category: "Legal", rating: 4.9, installs: 312, model: "GPT-4o" },
  { name: "Recruitment Screener", category: "HR", rating: 4.7, installs: 248, model: "Claude 3.5" },
  { name: "Financial Analyst", category: "Finance", rating: 4.8, installs: 189, model: "GPT-4o" },
  { name: "IT Helpdesk Bot", category: "IT", rating: 4.6, installs: 567, model: "GPT-4o Mini" },
  { name: "Supply Chain Advisor", category: "Operations", rating: 4.5, installs: 134, model: "GPT-4o" },
  { name: "Compliance Monitor", category: "Legal", rating: 4.9, installs: 98, model: "Claude 3.5" },
]

export default function AIAgentsPage() {
  const [tab, setTab] = useState<Tab>("agents")
  const [search, setSearch] = useState("")
  const [wizardStep, setWizardStep] = useState(0)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const filtered = AI_AGENTS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.dept.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  )

  const kpis = [
    { label: "Total Agents", value: AI_AGENTS.length, icon: Bot, color: "text-primary" },
    { label: "Active", value: AI_AGENTS.filter((a) => a.status === "active").length, icon: CheckCircle2, color: "text-green-500" },
    { label: "Conversations Today", value: "4,820", icon: MessageSquare, color: "text-blue-500" },
    { label: "Avg. Satisfaction", value: "4.8 / 5", icon: Star, color: "text-yellow-500" },
    { label: "AI Resolution Rate", value: "88%", icon: TrendingUp, color: "text-green-500" },
    { label: "Escalation Rate", value: "3.2%", icon: AlertTriangle, color: "text-orange-500" },
    { label: "Monthly Tokens", value: "8.7M", icon: Brain, color: "text-purple-500" },
    { label: "AI Cost / Month", value: "$124", icon: DollarSign, color: "text-primary" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Agents Studio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No-code platform to create, train, test, and deploy intelligent AI employees.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setTab("marketplace")}>
            <Store className="size-4" />Agent Marketplace
          </Button>
          <Button onClick={() => setTab("create")}>
            <Plus className="size-4" />Create Agent
          </Button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        {(["agents", "create", "monitoring", "marketplace"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "create" ? "Create Wizard" : t === "monitoring" ? "Monitoring" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── AGENTS TAB ── */}
      {tab === "agents" && (
        <>
          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardContent className="p-3 space-y-1">
                  <k.icon className={`size-4 ${k.color}`} />
                  <p className="text-lg font-semibold leading-none">{k.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{k.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search + filter */}
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent px-0 focus-visible:ring-0"
              />
            </div>
            <Button variant="outline" size="sm">All Departments</Button>
            <Button variant="outline" size="sm">All Status</Button>
          </div>

          {/* Agent cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((agent) => {
              const ss = STATUS_STYLES[agent.status]
              return (
                <Card key={agent.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAgent(agent.id)}>
                  <CardContent className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                            {agent.avatar}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${ss.dot}`} />
                        </div>
                        <div>
                          <p className="font-semibold">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.role}</p>
                          <p className="text-xs text-muted-foreground">{agent.dept}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge className={`text-xs ${ss.badge}`}>{agent.status}</Badge>
                        <button onClick={(e) => e.stopPropagation()} className="rounded p-1 hover:bg-muted">
                          <MoreHorizontal className="size-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>

                    {/* Channels */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Channels:</span>
                      <div className="flex gap-1.5">
                        {agent.channels.map((ch) => (
                          <div key={ch} className="flex items-center justify-center rounded-md bg-muted p-1">
                            {CHANNEL_ICONS[ch]}
                          </div>
                        ))}
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">v{agent.version}</span>
                    </div>

                    {/* Stats */}
                    {agent.status !== "draft" && (
                      <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Convos</p>
                          <p className="font-semibold text-sm">{agent.stats.conversations > 0 ? agent.stats.conversations.toLocaleString() : "—"}</p>
                        </div>
                        <div className="text-center border-x border-border">
                          <p className="text-xs text-muted-foreground">Resolved</p>
                          <p className="font-semibold text-sm text-green-600">{agent.stats.resolved}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">CSAT</p>
                          <p className="font-semibold text-sm">{agent.stats.satisfaction > 0 ? `${agent.stats.satisfaction}` : "—"}</p>
                        </div>
                      </div>
                    )}

                    {/* Knowledge + Tools */}
                    {agent.knowledge.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {agent.knowledge.slice(0, 2).map((k) => (
                          <span key={k} className="flex items-center gap-1 rounded-md bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 text-xs text-blue-700 dark:text-blue-400">
                            <BookOpen className="size-3" />{k}
                          </span>
                        ))}
                        {agent.knowledge.length > 2 && (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{agent.knowledge.length - 2}</span>
                        )}
                      </div>
                    )}

                    {/* Model */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Brain className="size-3.5" />
                        <span>{agent.model}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Activity className="size-3.5" />
                        <span>{agent.stats.tokens} tokens</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={(e) => e.stopPropagation()}>
                        <Settings className="size-3.5" />Configure
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
                        <FlaskConical className="size-3.5" />Test
                      </Button>
                      {agent.status === "active" ? (
                        <Button variant="outline" size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
                          <Pause className="size-3.5" />
                        </Button>
                      ) : agent.status === "draft" || agent.status === "training" ? (
                        <Button size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
                          <Sparkles className="size-3.5" />Deploy
                        </Button>
                      ) : (
                        <Button size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
                          <Play className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Create new CTA */}
            <Card
              className="flex min-h-64 cursor-pointer items-center justify-center border-2 border-dashed transition-colors hover:border-primary hover:bg-primary/5"
              onClick={() => setTab("create")}
            >
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                  <Plus className="size-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Create New Agent</p>
                  <p className="mt-1 text-xs text-muted-foreground">Build a custom AI employee for your organization</p>
                </div>
                <Button size="sm"><Bot className="size-4" />New Agent</Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* ── CREATE WIZARD TAB ── */}
      {tab === "create" && (
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Steps sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Creation Wizard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-3">
              {WIZARD_STEPS.map((step, i) => (
                <button
                  key={step}
                  onClick={() => setWizardStep(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    wizardStep === i
                      ? "bg-primary text-primary-foreground"
                      : i < wizardStep
                      ? "text-green-600 hover:bg-muted"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <div className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    wizardStep === i ? "bg-primary-foreground/20" : i < wizardStep ? "bg-green-100 text-green-700" : "bg-muted"
                  }`}>
                    {i < wizardStep ? "✓" : i + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Step content */}
          <div className="lg:col-span-3 space-y-4">
            {wizardStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 1 — Agent Identity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Agent Name</label>
                      <Input placeholder="e.g. Sara — Sales Agent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input placeholder="e.g. Sales, Support, Finance" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="Describe what this AI agent does..." />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Agent Icon</label>
                      <div className="flex gap-2 flex-wrap">
                        {["S","O","L","K","H","R"].map((l) => (
                          <div key={l} className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors">{l}</div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags</label>
                      <Input placeholder="sales, ai, crm..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Version</label>
                      <Input placeholder="1.0" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 2 — Purpose & AI Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Agent Purpose</label>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {["Sales", "Marketing", "Customer Support", "HR", "Finance", "Accounting", "Operations", "CRM", "Project Management", "Executive Assistant", "Recruitment", "Legal", "Custom"].map((p) => (
                        <button key={p} className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:border-primary hover:bg-primary/5 transition-colors text-left">{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Model</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { name: "GPT-4o", provider: "OpenAI", badge: "Recommended", speed: "Fast", cost: "$$" },
                        { name: "Claude 3.5 Sonnet", provider: "Anthropic", badge: "Best Quality", speed: "Medium", cost: "$$$" },
                        { name: "GPT-4o Mini", provider: "OpenAI", badge: "Low Cost", speed: "Very Fast", cost: "$" },
                        { name: "Gemini 1.5 Pro", provider: "Google", badge: "Multimodal", speed: "Fast", cost: "$$" },
                      ].map((m) => (
                        <div key={m.name} className="flex items-start gap-3 rounded-xl border border-border p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Brain className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{m.name}</span>
                              <Badge className="bg-green-100 text-green-700 text-xs">{m.badge}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{m.provider} · Speed: {m.speed} · Cost: {m.cost}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Model</label>
                      <Input placeholder="Primary model selection" defaultValue="GPT-4o" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fallback Model</label>
                      <Input placeholder="Fallback if primary unavailable" defaultValue="GPT-4o Mini" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 3 — Personality & Communication Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personality Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Professional", "Friendly", "Formal", "Consultant", "Sales Expert", "Technical Expert", "Trainer", "Creative", "Custom"].map((p) => (
                        <button key={p} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${p === "Professional" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary hover:bg-primary/5"}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Communication Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Short & Concise", "Detailed", "Business", "Technical", "Casual", "Arabic", "English", "Multilingual"].map((s) => (
                        <button key={s} className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:border-primary hover:bg-primary/5 transition-colors">{s}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">System Prompt Preview</label>
                    <div className="rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                      {"You are Sara, a professional sales AI agent for {{organization_name}}. Your goal is to qualify leads, schedule demos, and close deals. You are professional, persuasive, and always focus on customer value. Current date: {{current_date}}. You have access to the product catalog, pricing guide, and objection handling scripts."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 4 — Knowledge Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { name: "Product Catalog 2024", type: "PDF", size: "2.4 MB", attached: true },
                      { name: "Pricing Guide", type: "Excel", size: "145 KB", attached: true },
                      { name: "Objection Handling Scripts", type: "Word", size: "380 KB", attached: true },
                      { name: "Customer Case Studies", type: "PDF", size: "5.1 MB", attached: false },
                      { name: "Company FAQ", type: "Web", size: "Live", attached: false },
                      { name: "Competitor Analysis", type: "PDF", size: "1.2 MB", attached: false },
                    ].map((doc) => (
                      <div key={doc.name} className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${doc.attached ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/40 cursor-pointer"}`}>
                        <BookOpen className={`size-4 shrink-0 ${doc.attached ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} · {doc.size}</p>
                        </div>
                        {doc.attached ? (
                          <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                        ) : (
                          <Plus className="size-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full"><Plus className="size-4" />Add Knowledge Source</Button>
                </CardContent>
              </Card>
            )}

            {wizardStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 5 — Tools & Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { name: "CRM Record Lookup", category: "CRM", enabled: true },
                      { name: "Create / Update Lead", category: "CRM", enabled: true },
                      { name: "Calendar Booking", category: "Scheduling", enabled: true },
                      { name: "Send WhatsApp Message", category: "Communication", enabled: true },
                      { name: "Send Email", category: "Communication", enabled: false },
                      { name: "Generate Invoice", category: "Finance", enabled: false },
                      { name: "Run Workflow", category: "Automation", enabled: false },
                      { name: "Search Knowledge Base", category: "Knowledge", enabled: true },
                      { name: "Create Support Ticket", category: "Support", enabled: false },
                      { name: "Fetch REST API", category: "Integration", enabled: false },
                    ].map((tool) => (
                      <div key={tool.name} className={`flex items-center gap-3 rounded-lg border p-3 ${tool.enabled ? "border-primary/40 bg-primary/5" : "border-border"}`}>
                        <Wrench className={`size-4 shrink-0 ${tool.enabled ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{tool.name}</p>
                          <p className="text-xs text-muted-foreground">{tool.category}</p>
                        </div>
                        <div className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${tool.enabled ? "bg-primary" : "bg-muted"}`}>
                          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow-sm ${tool.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 6 — Permissions & AI Safety</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Permissions</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {["Read CRM", "Create Records", "Update Records", "Delete Records", "Export Data", "Run Workflows"].map((p) => (
                        <label key={p} className="flex items-center gap-2 rounded-lg border border-border p-2.5 cursor-pointer hover:bg-muted">
                          <input type="checkbox" className="rounded" defaultChecked={["Read CRM", "Update Records"].includes(p)} />
                          <span className="text-xs font-medium">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Safety Controls</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Sensitive Data Detection", enabled: true },
                        { label: "Prompt Injection Protection", enabled: true },
                        { label: "Rate Limiting", enabled: true },
                        { label: "Confidence Threshold (70%)", enabled: true },
                        { label: "Escalation Rules", enabled: true },
                        { label: "Topic Restrictions", enabled: false },
                      ].map((s) => (
                        <div key={s.label} className={`flex items-center gap-3 rounded-lg border p-3 ${s.enabled ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20" : "border-border"}`}>
                          <ShieldAlert className={`size-4 ${s.enabled ? "text-green-600" : "text-muted-foreground"}`} />
                          <span className="text-sm font-medium flex-1">{s.label}</span>
                          {s.enabled && <CheckCircle2 className="size-4 text-green-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 6 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 7 — Test & Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                    <p className="text-sm font-semibold">Test Playground</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <div className="flex justify-end">
                        <div className="rounded-xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground max-w-[80%]">
                          Hi, I saw your product demo online. I am interested in Vision CRM for my team of 50 people.
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="rounded-xl rounded-tl-sm bg-card border border-border px-4 py-2.5 text-sm max-w-[80%]">
                          Hi! I am Sara, your Vision CRM sales advisor. Great to hear you are interested! A team of 50 is a perfect fit for our Professional plan. May I ask — what is your primary pain point with your current CRM?
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Type a test message..." className="flex-1 text-sm" />
                      <Button size="sm"><Play className="size-4" />Send</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Response Quality", value: "92%" },
                      { label: "Avg Latency", value: "1.2s" },
                      { label: "Token Usage", value: "342" },
                      { label: "Safety Score", value: "100%" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg border border-border p-3 text-center">
                        <p className="text-lg font-semibold">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">Save as Draft</Button>
                    <Button variant="outline" className="flex-1"><Eye className="size-4" />Submit for Review</Button>
                    <Button className="flex-1"><Sparkles className="size-4" />Publish Agent</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>
                Back
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Step {wizardStep + 1} of {WIZARD_STEPS.length}
              </div>
              <Button onClick={() => setWizardStep(Math.min(WIZARD_STEPS.length - 1, wizardStep + 1))} disabled={wizardStep === WIZARD_STEPS.length - 1}>
                Next <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MONITORING TAB ── */}
      {tab === "monitoring" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Active Conversations", value: "284", trend: "+12%", icon: MessageSquare },
              { label: "Avg Response Time", value: "1.4s", trend: "-0.3s", icon: Clock },
              { label: "Total Token Cost (MTD)", value: "$124", trend: "+8%", icon: DollarSign },
              { label: "Escalations Today", value: "14", trend: "-3", icon: AlertTriangle },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="p-4 flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="mt-1 text-2xl font-semibold">{m.value}</p>
                    <p className="text-xs text-green-600 mt-0.5">{m.trend} vs yesterday</p>
                  </div>
                  <m.icon className="size-5 text-muted-foreground mt-0.5" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Agent Performance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Agent</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Convos</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Resolution</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">CSAT</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Escalations</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Tokens</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {AI_AGENTS.filter((a) => a.status !== "draft").map((agent) => {
                      const ss = STATUS_STYLES[agent.status]
                      return (
                        <tr key={agent.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">{agent.avatar}</div>
                              <div>
                                <p className="font-medium">{agent.name}</p>
                                <p className="text-xs text-muted-foreground">{agent.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-right font-medium">{agent.stats.conversations > 0 ? agent.stats.conversations.toLocaleString() : "—"}</td>
                          <td className="py-3 text-right text-green-600 font-medium">{agent.stats.resolved}</td>
                          <td className="py-3 text-right">{agent.stats.satisfaction > 0 ? `${agent.stats.satisfaction}/5` : "—"}</td>
                          <td className="py-3 text-right text-orange-500">{agent.stats.escalations}</td>
                          <td className="py-3 text-right text-muted-foreground">{agent.stats.tokens}</td>
                          <td className="py-3 text-right">
                            <Badge className={`text-xs ${ss.badge}`}>{agent.status}</Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Execution History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { agent: "Sara", event: "Lead qualified — score 84", time: "2m ago", type: "success" },
                  { agent: "Omar", event: "Ticket #1247 resolved", time: "4m ago", type: "success" },
                  { agent: "Omar", event: "Escalated to human — billing dispute", time: "7m ago", type: "warning" },
                  { agent: "Lina", event: "Invoice INV-0082 follow-up sent", time: "12m ago", type: "success" },
                  { agent: "Sara", event: "Demo booked for Gulf Trading LLC", time: "18m ago", type: "success" },
                  { agent: "Rami", event: "Model confidence too low — skipped", time: "25m ago", type: "error" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                    <div className={`size-2 shrink-0 rounded-full ${item.type === "success" ? "bg-green-500" : item.type === "warning" ? "bg-yellow-500" : "bg-red-500"}`} />
                    <span className="font-medium w-12 shrink-0">{item.agent}</span>
                    <span className="flex-1 text-muted-foreground truncate">{item.event}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Token & Cost Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {AI_AGENTS.filter((a) => a.stats.conversations > 0).map((agent) => {
                  const pct = Math.round((agent.stats.conversations / 5384) * 100)
                  return (
                    <div key={agent.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{agent.name}</span>
                        <span className="text-muted-foreground">{agent.stats.tokens}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── MARKETPLACE TAB ── */}
      {tab === "marketplace" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input placeholder="Search marketplace agents..." className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Categories</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETPLACE_AGENTS.map((agent) => (
              <Card key={agent.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                        {agent.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{agent.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Brain className="size-3.5" />{agent.model}</div>
                    <div className="flex items-center gap-1.5"><Users className="size-3.5" />{agent.installs} installs</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs"><Eye className="size-3.5" />Preview</Button>
                    <Button size="sm" className="flex-1 text-xs"><ArrowUpRight className="size-3.5" />Install</Button>
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
