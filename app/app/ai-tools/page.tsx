"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Wrench, Plus, Search, Settings, Copy, MoreHorizontal, CheckCircle2,
  Clock, Activity, DollarSign, AlertTriangle, Play, Eye, Star, Zap,
  Globe, Database, FileText, Mail, MessageSquare, Phone, Brain,
  ShieldCheck, ChevronRight, ArrowUpRight, Code, Layers, GitBranch,
  BarChart3, Users, ArrowRight, TrendingUp, Store,
} from "lucide-react"

type Tab = "tools" | "create" | "testing" | "analytics" | "marketplace"

const TOOLS = [
  {
    id: "1", name: "CRM Customer Lookup", category: "CRM", type: "Internal Action",
    status: "published", version: "1.4", owner: "System",
    description: "Fetches full customer profile including contact info, deal history, and support tickets.",
    method: "GET", endpoint: "/api/crm/customers/{id}",
    inputs: ["customer_id: String"], outputs: ["customer_profile: Object"],
    stats: { calls: 4820, successRate: "99.2%", avgTime: "0.3s", cost: "$0.0001" },
    lastUsed: "2m ago",
  },
  {
    id: "2", name: "Send WhatsApp Message", category: "Communication", type: "WhatsApp Action",
    status: "published", version: "2.1", owner: "System",
    description: "Sends a WhatsApp message to a customer using pre-approved templates or AI-generated content.",
    method: "POST", endpoint: "/api/whatsapp/send",
    inputs: ["phone: String", "message: String", "template_id: String?"],
    outputs: ["message_id: String", "status: String"],
    stats: { calls: 3240, successRate: "97.8%", avgTime: "0.8s", cost: "$0.006" },
    lastUsed: "5m ago",
  },
  {
    id: "3", name: "Generate Invoice PDF", category: "Finance", type: "File Generator",
    status: "published", version: "1.2", owner: "Finance Team",
    description: "Generates a branded PDF invoice from deal and customer data.",
    method: "POST", endpoint: "/api/invoices/generate",
    inputs: ["deal_id: String", "customer_id: String", "items: Array"],
    outputs: ["pdf_url: String", "invoice_id: String"],
    stats: { calls: 840, successRate: "98.4%", avgTime: "2.1s", cost: "$0.02" },
    lastUsed: "1h ago",
  },
  {
    id: "4", name: "Calendar Booking", category: "Scheduling", type: "Internal Action",
    status: "published", version: "1.0", owner: "System",
    description: "Books a calendar appointment and sends invitations to all participants.",
    method: "POST", endpoint: "/api/calendar/book",
    inputs: ["attendees: Array", "date: String", "duration: Number", "title: String"],
    outputs: ["event_id: String", "meeting_link: String"],
    stats: { calls: 1240, successRate: "96.1%", avgTime: "1.4s", cost: "$0.003" },
    lastUsed: "30m ago",
  },
  {
    id: "5", name: "Check Unpaid Invoices", category: "Finance", type: "Database Query",
    status: "published", version: "1.1", owner: "Finance Team",
    description: "Returns all unpaid invoices for a customer with total outstanding balance.",
    method: "GET", endpoint: "/api/finance/unpaid/{customer_id}",
    inputs: ["customer_id: String"],
    outputs: ["invoices: Array", "total_outstanding: Number"],
    stats: { calls: 640, successRate: "99.8%", avgTime: "0.5s", cost: "$0.0002" },
    lastUsed: "15m ago",
  },
  {
    id: "6", name: "Lead Score Calculator", category: "Sales", type: "JavaScript Function",
    status: "draft", version: "0.3", owner: "Sales Team",
    description: "Calculates a lead quality score based on company size, budget, industry, and engagement signals.",
    method: "POST", endpoint: "internal://lead-scorer",
    inputs: ["lead_data: Object"], outputs: ["score: Number", "breakdown: Object"],
    stats: { calls: 0, successRate: "—", avgTime: "—", cost: "—" },
    lastUsed: "Never",
  },
]

const TOOL_CATEGORIES = [
  "All", "CRM", "Communication", "Finance", "Scheduling", "Sales",
  "HR", "Knowledge", "Automation", "Integration", "File", "Data",
]

const TOOL_TYPES = [
  { label: "Internal Action", icon: Zap, color: "bg-yellow-500" },
  { label: "REST API", icon: Globe, color: "bg-blue-500" },
  { label: "Database Query", icon: Database, color: "bg-cyan-600" },
  { label: "JavaScript Function", icon: Code, color: "bg-orange-500" },
  { label: "Workflow", icon: GitBranch, color: "bg-purple-500" },
  { label: "AI Agent", icon: Brain, color: "bg-primary" },
  { label: "Email Action", icon: Mail, color: "bg-blue-600" },
  { label: "WhatsApp Action", icon: MessageSquare, color: "bg-emerald-500" },
  { label: "File Generator", icon: FileText, color: "bg-rose-500" },
  { label: "PDF Generator", icon: FileText, color: "bg-pink-500" },
  { label: "Voice Call", icon: Phone, color: "bg-purple-600" },
  { label: "Knowledge Search", icon: Layers, color: "bg-teal-500" },
]

const STATUS_STYLES: Record<string, string> = {
  published: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  draft: "bg-muted text-muted-foreground",
  review: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  disabled: "bg-red-100 text-red-600",
}

const MARKETPLACE_TOOLS = [
  { name: "Stripe Payment Check", category: "Finance", rating: 4.9, installs: 412 },
  { name: "OpenAI Image Gen", category: "AI", rating: 4.8, installs: 328 },
  { name: "Twilio SMS Sender", category: "Communication", rating: 4.7, installs: 516 },
  { name: "Google Sheets Sync", category: "Data", rating: 4.6, installs: 284 },
  { name: "Slack Notifier", category: "Communication", rating: 4.8, installs: 619 },
  { name: "HubSpot Sync", category: "CRM", rating: 4.5, installs: 198 },
]

const WIZARD_STEPS = ["Identity", "Tool Type", "API Config", "Input Parameters", "Output Parameters", "Security", "Test & Publish"]

export default function AIToolsPage() {
  const [tab, setTab] = useState<Tab>("tools")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [wizardStep, setWizardStep] = useState(0)
  const [aiPrompt, setAiPrompt] = useState("")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [testBody, setTestBody] = useState('{\n  "customer_id": "CUST-001"\n}')

  const filtered = TOOLS.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === "All" || t.category === activeCategory
    return matchSearch && matchCat
  })

  const kpis = [
    { label: "Total Tools", value: TOOLS.length, icon: Wrench },
    { label: "Published", value: TOOLS.filter((t) => t.status === "published").length, icon: CheckCircle2 },
    { label: "Executions Today", value: "2,840", icon: Activity },
    { label: "Success Rate", value: "98.4%", icon: TrendingUp },
    { label: "Failed Today", value: "8", icon: AlertTriangle },
    { label: "Avg Response", value: "0.9s", icon: Clock },
    { label: "Daily API Calls", value: "12.4K", icon: Globe },
    { label: "Monthly Cost", value: "$84", icon: DollarSign },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Enterprise AI Tools Studio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No-code platform to create, connect, secure, and manage AI tools for agents and workflows.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setTab("marketplace")}>
            <Store className="size-4" />Tool Marketplace
          </Button>
          <Button onClick={() => setTab("create")}>
            <Plus className="size-4" />Create Tool
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        {(["tools", "create", "testing", "analytics", "marketplace"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "create" ? "Tool Builder" : t === "testing" ? "Testing Lab" : t === "analytics" ? "Analytics" : t === "marketplace" ? "Marketplace" : "Tools"}
          </button>
        ))}
      </div>

      {/* ── TOOLS LIST ── */}
      {tab === "tools" && (
        <>
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

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input placeholder="Search tools..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Types</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Wrench className="size-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.category} · {tool.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge className={`text-xs shrink-0 ${STATUS_STYLES[tool.status]}`}>{tool.status}</Badge>
                      <button><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>

                  {/* Endpoint */}
                  <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5">
                    <Badge className="text-xs bg-blue-100 text-blue-700">{tool.method}</Badge>
                    <code className="text-xs font-mono text-muted-foreground truncate">{tool.endpoint}</code>
                  </div>

                  {/* I/O */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Inputs</p>
                      <div className="space-y-0.5">
                        {tool.inputs.map((inp) => (
                          <code key={inp} className="block text-xs text-foreground/70">{inp}</code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Outputs</p>
                      <div className="space-y-0.5">
                        {tool.outputs.map((out) => (
                          <code key={out} className="block text-xs text-foreground/70">{out}</code>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  {tool.stats.calls > 0 && (
                    <div className="grid grid-cols-4 gap-2 rounded-lg bg-muted/40 p-2.5 text-center text-xs">
                      <div><p className="text-muted-foreground">Calls</p><p className="font-semibold">{tool.stats.calls.toLocaleString()}</p></div>
                      <div className="border-x border-border"><p className="text-muted-foreground">Success</p><p className="font-semibold text-green-600">{tool.stats.successRate}</p></div>
                      <div className="border-r border-border"><p className="text-muted-foreground">Avg Time</p><p className="font-semibold">{tool.stats.avgTime}</p></div>
                      <div><p className="text-muted-foreground">Cost</p><p className="font-semibold">{tool.stats.cost}</p></div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>v{tool.version} · {tool.lastUsed}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setTab("testing")}>
                      <Play className="size-3.5" />Test
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs"><Settings className="size-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="text-xs"><Copy className="size-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ── TOOL BUILDER ── */}
      {tab === "create" && (
        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Tool Wizard</CardTitle></CardHeader>
            <CardContent className="space-y-1 p-3">
              {WIZARD_STEPS.map((step, i) => (
                <button
                  key={step}
                  onClick={() => setWizardStep(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    wizardStep === i ? "bg-primary text-primary-foreground" : i < wizardStep ? "text-green-600 hover:bg-muted" : "text-muted-foreground hover:bg-muted"
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

          <div className="lg:col-span-3 space-y-4">
            {/* AI Tool Builder banner */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Brain className="size-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-semibold">AI Tool Builder</p>
                  <p className="text-xs text-muted-foreground">Describe what this tool should do and we will generate inputs, outputs, configuration, and documentation automatically.</p>
                  <div className="flex gap-2">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={`e.g. "Create a tool that checks if a customer has unpaid invoices and returns the total outstanding balance"`}
                      className="flex-1 text-sm bg-card"
                    />
                    <Button size="sm"><Zap className="size-4" />Generate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {wizardStep === 0 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 1 — Tool Identity</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Tool Name</label><Input placeholder="e.g. Check Unpaid Invoices" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Category</label><Input placeholder="e.g. Finance, CRM, Communication" /></div>
                  </div>
                  <div className="space-y-1.5"><label className="text-sm font-medium">Description</label><textarea className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="What does this tool do? What data does it need and what does it return?" /></div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Department</label><Input placeholder="Finance, Sales..." /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Tags</label><Input placeholder="invoice, finance, crm" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Owner</label><Input placeholder="Team or agent" /></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 1 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 2 — Tool Type</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {TOOL_TYPES.map((t) => (
                      <button key={t.label} className="flex items-center gap-3 rounded-xl border border-border p-3 text-left hover:border-primary hover:bg-primary/5 transition-colors">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${t.color}`}>
                          <t.icon className="size-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 2 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 3 — API Configuration</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Base URL</label><Input placeholder="https://api.example.com" /></div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">HTTP Method</label>
                      <div className="flex gap-2">
                        {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                          <button key={m} className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${m === "POST" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{m}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5"><label className="text-sm font-medium">Endpoint Path</label><Input placeholder="/api/resource/{id}" /></div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Authentication</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["API Key", "Bearer Token", "OAuth2", "Basic Auth", "JWT", "No Auth"].map((a) => (
                        <button key={a} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${a === "Bearer Token" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary"}`}>{a}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Timeout (ms)</label><Input placeholder="5000" defaultValue="5000" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Retry Count</label><Input placeholder="3" defaultValue="3" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Rate Limit / min</label><Input placeholder="60" defaultValue="60" /></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 3 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 4 — Input Parameters</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: "customer_id", type: "String", required: true, desc: "The unique CRM customer ID" },
                      { name: "include_archived", type: "Boolean", required: false, desc: "Include archived invoices" },
                      { name: "date_from", type: "Date", required: false, desc: "Filter from date" },
                    ].map((p, i) => (
                      <div key={i} className="grid gap-3 rounded-xl border border-border p-3 sm:grid-cols-4">
                        <Input defaultValue={p.name} placeholder="Parameter name" className="font-mono text-sm" />
                        <Input defaultValue={p.type} placeholder="Type" />
                        <Input defaultValue={p.desc} placeholder="Description" className="sm:col-span-1" />
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1.5 text-xs">
                            <input type="checkbox" defaultChecked={p.required} />Required
                          </label>
                          <Button variant="ghost" size="sm" className="ml-auto text-red-500 h-8 w-8 p-0">×</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm"><Plus className="size-4" />Add Parameter</Button>
                </CardContent>
              </Card>
            )}

            {wizardStep === 4 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 5 — Output Parameters</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: "invoices", type: "Array", desc: "List of unpaid invoice objects" },
                      { name: "total_outstanding", type: "Number", desc: "Sum of all outstanding amounts" },
                      { name: "currency", type: "String", desc: "Currency code (e.g. USD, SAR)" },
                      { name: "oldest_invoice_date", type: "Date", desc: "Date of oldest unpaid invoice" },
                    ].map((p, i) => (
                      <div key={i} className="grid gap-3 rounded-xl border border-border p-3 sm:grid-cols-3">
                        <Input defaultValue={p.name} placeholder="Output name" className="font-mono text-sm" />
                        <Input defaultValue={p.type} placeholder="Type" />
                        <Input defaultValue={p.desc} placeholder="Description" />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm"><Plus className="size-4" />Add Output</Button>
                </CardContent>
              </Card>
            )}

            {wizardStep === 5 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 6 — Security & Permissions</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role-Based Access</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {["AI Agents (All)", "Sales Team", "Finance Team", "Admin Only", "Support Team", "All Users"].map((role) => (
                        <label key={role} className="flex items-center gap-2 rounded-lg border border-border p-2.5 cursor-pointer hover:bg-muted">
                          <input type="checkbox" defaultChecked={["AI Agents (All)", "Finance Team"].includes(role)} />
                          <span className="text-xs font-medium">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Security Controls</label>
                    <div className="space-y-2">
                      {[
                        { label: "Encrypted Secrets (API Keys)", enabled: true },
                        { label: "Execution Audit Logs", enabled: true },
                        { label: "Rate Limiting Enforced", enabled: true },
                        { label: "Sensitive Data Masking", enabled: true },
                        { label: "Execution Limit per Agent (100/day)", enabled: false },
                      ].map((s) => (
                        <div key={s.label} className={`flex items-center gap-3 rounded-lg border p-3 ${s.enabled ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20" : "border-border"}`}>
                          <ShieldCheck className={`size-4 ${s.enabled ? "text-green-600" : "text-muted-foreground"}`} />
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
                <CardHeader><CardTitle className="text-base">Step 7 — Test & Publish</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Request Body</p>
                      <textarea
                        value={testBody}
                        onChange={(e) => setTestBody(e.target.value)}
                        className="w-full h-40 rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button size="sm" className="w-full"><Play className="size-4" />Execute Test</Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Response</p>
                      <div className="h-40 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs text-muted-foreground overflow-y-auto">
                        {`{\n  "invoices": [\n    {\n      "id": "INV-0082",\n      "amount": 4500,\n      "currency": "USD",\n      "due_date": "2026-07-15"\n    }\n  ],\n  "total_outstanding": 4500,\n  "currency": "USD"\n}`}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Status", value: "200 OK" },
                      { label: "Response Time", value: "0.47s" },
                      { label: "Validation", value: "Passed" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg border border-border p-3 text-center">
                        <p className="text-sm font-semibold text-green-600">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">Save Draft</Button>
                    <Button variant="outline" className="flex-1"><Eye className="size-4" />Submit Review</Button>
                    <Button className="flex-1"><CheckCircle2 className="size-4" />Publish Tool</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>Back</Button>
              <span className="flex items-center text-sm text-muted-foreground">Step {wizardStep + 1} of {WIZARD_STEPS.length}</span>
              <Button onClick={() => setWizardStep(Math.min(WIZARD_STEPS.length - 1, wizardStep + 1))} disabled={wizardStep === WIZARD_STEPS.length - 1}>
                Next <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── TESTING LAB ── */}
      {tab === "testing" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Request Builder</CardTitle>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-100 text-blue-700">POST</Badge>
                    <code className="text-xs font-mono text-muted-foreground">/api/finance/unpaid/{"{customer_id}"}</code>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Request Body (JSON)</p>
                    <textarea
                      value={testBody}
                      onChange={(e) => setTestBody(e.target.value)}
                      className="w-full h-52 rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Response</p>
                    <div className="h-52 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs overflow-y-auto">
                      {`HTTP/1.1 200 OK\nContent-Type: application/json\nX-Response-Time: 0.47s\n\n{\n  "invoices": [\n    {\n      "id": "INV-0082",\n      "amount": 4500,\n      "currency": "USD"\n    }\n  ],\n  "total_outstanding": 4500\n}`}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm"><Play className="size-4" />Execute</Button>
                  <Button variant="outline" size="sm">Mock Data</Button>
                  <Button variant="outline" size="sm">Error Simulation</Button>
                </div>
              </CardContent>
            </Card>

            {/* Execution logs */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Execution Logs</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-4">
                {[
                  { time: "14:02:31", event: "Request received", status: "info" },
                  { time: "14:02:31", event: "Auth validation: Bearer token valid", status: "success" },
                  { time: "14:02:31", event: "Input validation: customer_id CUST-001 ✓", status: "success" },
                  { time: "14:02:31", event: "DB query executed: SELECT * FROM invoices WHERE customer_id=...", status: "info" },
                  { time: "14:02:31", event: "Query returned 1 record", status: "success" },
                  { time: "14:02:31", event: "Response serialized and returned", status: "success" },
                  { time: "14:02:31", event: "Execution completed in 0.47s", status: "success" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-muted-foreground w-16 shrink-0">{log.time}</span>
                    <div className={`size-1.5 shrink-0 rounded-full ${log.status === "success" ? "bg-green-500" : log.status === "error" ? "bg-red-500" : "bg-blue-400"}`} />
                    <span className={log.status === "success" ? "text-foreground" : "text-muted-foreground"}>{log.event}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Test Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-4">
                {[
                  { label: "Status Code", value: "200 OK", color: "text-green-600" },
                  { label: "Response Time", value: "0.47s", color: "" },
                  { label: "Payload Size", value: "248 bytes", color: "" },
                  { label: "Validation", value: "Passed", color: "text-green-600" },
                  { label: "Auth Status", value: "Valid", color: "text-green-600" },
                ].map((m) => (
                  <div key={m.label} className="flex justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <span className={`text-sm font-semibold ${m.color}`}>{m.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Performance History</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-4">
                {[
                  { run: "Run #24", time: "0.47s", status: "pass" },
                  { run: "Run #23", time: "0.51s", status: "pass" },
                  { run: "Run #22", time: "0.43s", status: "pass" },
                  { run: "Run #21", time: "2.10s", status: "fail" },
                  { run: "Run #20", time: "0.49s", status: "pass" },
                ].map((r) => (
                  <div key={r.run} className="flex items-center gap-3">
                    <div className={`size-2 rounded-full ${r.status === "pass" ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-sm flex-1">{r.run}</span>
                    <span className="text-sm text-muted-foreground">{r.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── ANALYTICS ── */}
      {tab === "analytics" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Executions (MTD)", value: "84,200", icon: Activity },
              { label: "Success Rate", value: "98.4%", icon: CheckCircle2 },
              { label: "Avg Response Time", value: "0.9s", icon: Clock },
              { label: "Total Cost (MTD)", value: "$84.20", icon: DollarSign },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="flex items-start justify-between p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="mt-1 text-2xl font-semibold">{m.value}</p>
                  </div>
                  <m.icon className="size-5 text-muted-foreground mt-0.5" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Tool Performance Table</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Tool</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Calls</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Success</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Avg Time</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Cost</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {TOOLS.map((t) => (
                    <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.category} · {t.type}</p>
                        </div>
                      </td>
                      <td className="py-3 text-right">{t.stats.calls > 0 ? t.stats.calls.toLocaleString() : "—"}</td>
                      <td className="py-3 text-right text-green-600">{t.stats.successRate}</td>
                      <td className="py-3 text-right">{t.stats.avgTime}</td>
                      <td className="py-3 text-right">{t.stats.cost}</td>
                      <td className="py-3 text-right"><Badge className={`text-xs ${STATUS_STYLES[t.status]}`}>{t.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <Input placeholder="Search marketplace tools..." className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Categories</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETPLACE_TOOLS.map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                        <Wrench className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold">{t.rating} ★</p>
                      <p className="text-xs text-muted-foreground">{t.installs} installs</p>
                    </div>
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
