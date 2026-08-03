"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileCode, Plus, Search, Copy, Archive, Star, TrendingUp, BarChart3,
  CheckCircle2, Clock, AlertTriangle, Zap, Brain, DollarSign, Activity,
  Settings, Play, Eye, MoreHorizontal, GitBranch, Layers, Sparkles,
  ChevronRight, Users, Globe, SplitSquareHorizontal, BookOpen, Wrench,
  ArrowUpRight, MessageSquare, FileText,
} from "lucide-react"

type Tab = "library" | "editor" | "testing" | "versioning" | "analytics" | "marketplace"

const PROMPTS = [
  {
    id: "1", name: "Lead Qualification Prompt", category: "Sales", type: "AI Agent Prompt",
    status: "published", version: "2.4", owner: "Sara Agent", language: "English",
    model: "GPT-4o", rating: 4.8, uses: 1240, tokens: 480, cost: "$0.014",
    latency: "1.2s", successRate: "91%", lastUpdated: "3d ago",
    description: "Qualifies incoming leads by scoring them based on company size, budget, and intent signals.",
  },
  {
    id: "2", name: "Customer Support Handler", category: "Customer Support", type: "System Prompt",
    status: "published", version: "1.8", owner: "Omar Agent", language: "Arabic/English",
    model: "Claude 3.5", rating: 4.9, uses: 3420, tokens: 620, cost: "$0.021",
    latency: "1.5s", successRate: "94%", lastUpdated: "1w ago",
    description: "Handles customer service conversations with empathy, policy awareness, and escalation logic.",
  },
  {
    id: "3", name: "Invoice Follow-up Message", category: "Finance", type: "User Prompt",
    status: "published", version: "1.2", owner: "Lina Agent", language: "Arabic",
    model: "GPT-4o", rating: 4.7, uses: 540, tokens: 210, cost: "$0.006",
    latency: "0.8s", successRate: "96%", lastUpdated: "2w ago",
    description: "Generates polite but firm invoice follow-up messages tailored to customer payment history.",
  },
  {
    id: "4", name: "Meeting Summary Generator", category: "CRM", type: "Workflow Prompt",
    status: "published", version: "1.0", owner: "Admin", language: "Multilingual",
    model: "GPT-4o", rating: 4.6, uses: 284, tokens: 890, cost: "$0.027",
    latency: "2.1s", successRate: "89%", lastUpdated: "1w ago",
    description: "Summarizes call and meeting transcripts into structured action items and CRM notes.",
  },
  {
    id: "5", name: "Marketing Campaign Advisor", category: "Marketing", type: "AI Agent Prompt",
    status: "draft", version: "0.2", owner: "Hana Agent", language: "English",
    model: "GPT-4o Mini", rating: 0, uses: 0, tokens: 380, cost: "$0.001",
    latency: "—", successRate: "—", lastUpdated: "Today",
    description: "Generates and optimizes digital marketing campaign copy across channels.",
  },
  {
    id: "6", name: "Sentiment Classifier", category: "Classification", type: "Knowledge Prompt",
    status: "review", version: "1.1", owner: "Admin", language: "Multilingual",
    model: "GPT-4o Mini", rating: 4.4, uses: 120, tokens: 150, cost: "$0.0004",
    latency: "0.5s", successRate: "93%", lastUpdated: "5d ago",
    description: "Classifies customer message sentiment as positive, neutral, or negative with confidence score.",
  },
]

const PROMPT_CATEGORIES = [
  "All", "Sales", "Marketing", "CRM", "Customer Support", "Finance",
  "HR", "Projects", "Knowledge Base", "Automation", "Workflow",
  "Translation", "Classification", "Summarization",
]

const LIBRARY_TEMPLATES = [
  { name: "Sales Assistant", category: "Sales", uses: 2840 },
  { name: "Email Generator", category: "Marketing", uses: 1920 },
  { name: "WhatsApp Response", category: "CRM", uses: 1540 },
  { name: "Proposal Writer", category: "Sales", uses: 1240 },
  { name: "Meeting Summary", category: "CRM", uses: 980 },
  { name: "Contract Review", category: "Legal", uses: 730 },
  { name: "Sentiment Analysis", category: "Classification", uses: 620 },
  { name: "Executive Report", category: "Reporting", uses: 410 },
]

const SAMPLE_PROMPT = `You are a professional sales AI assistant for {{organization_name}}.

Your role is to qualify incoming leads and determine their readiness to buy.

## Instructions

1. Greet the lead warmly and introduce yourself.
2. Ask about their current challenges with CRM.
3. Identify their team size and budget range.
4. Assess their decision-making timeline.
5. Score them from 0-100 based on:
   - Budget fit: 30 points
   - Team size match: 20 points
   - Timeline urgency: 30 points
   - Decision authority: 20 points

## Variables Available

- Customer Name: {{customer_name}}
- Company: {{company_name}}
- Lead Source: {{lead_source}}
- Deal Value: {{deal_value}}
- Current Date: {{current_date}}

## Response Format

Always respond in {{language}}. Be professional yet approachable.
Keep responses under 120 words unless the customer asks for details.`

const WIZARD_STEPS = ["Basic Info", "Prompt Type", "Language & Model", "Write Prompt", "Variables", "Test & Review"]

const STATUS_STYLES: Record<string, string> = {
  published: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  draft: "bg-muted text-muted-foreground",
  review: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  archived: "bg-orange-100 text-orange-700",
}

export default function PromptStudioPage() {
  const [tab, setTab] = useState<Tab>("library")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [wizardStep, setWizardStep] = useState(0)
  const [promptContent, setPromptContent] = useState(SAMPLE_PROMPT)
  const [testInput, setTestInput] = useState("")
  const [abMode, setAbMode] = useState(false)

  const filtered = PROMPTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === "All" || p.category === activeCategory
    return matchSearch && matchCat
  })

  const kpis = [
    { label: "Total Prompts", value: PROMPTS.length, icon: FileCode },
    { label: "Published", value: PROMPTS.filter((p) => p.status === "published").length, icon: CheckCircle2 },
    { label: "In Review", value: PROMPTS.filter((p) => p.status === "review").length, icon: Eye },
    { label: "Total Uses (MTD)", value: "5,604", icon: Activity },
    { label: "Avg Quality Score", value: "4.7", icon: Star },
    { label: "Avg Token Usage", value: "448", icon: Brain },
    { label: "Avg Cost / Call", value: "$0.012", icon: DollarSign },
    { label: "Avg Latency", value: "1.2s", icon: Clock },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Enterprise Prompt Studio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Centralized platform for designing, testing, versioning, and governing every AI prompt.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setTab("marketplace")}>
            <BookOpen className="size-4" />Prompt Library
          </Button>
          <Button onClick={() => setTab("editor")}>
            <Plus className="size-4" />New Prompt
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        {(["library", "editor", "testing", "versioning", "analytics", "marketplace"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "editor" ? "Prompt Editor" : t === "testing" ? "Testing Lab" : t === "versioning" ? "Versions" : t === "analytics" ? "Analytics" : t === "marketplace" ? "Marketplace" : "Prompt Library"}
          </button>
        ))}
      </div>

      {/* ── LIBRARY ── */}
      {tab === "library" && (
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
            {PROMPT_CATEGORIES.map((cat) => (
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
              <Input placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Types</Button>
            <Button variant="outline" size="sm">All Models</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{prompt.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{prompt.category} · {prompt.type}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge className={`text-xs ${STATUS_STYLES[prompt.status]}`}>{prompt.status}</Badge>
                      <button><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{prompt.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground"><Brain className="size-3.5" />{prompt.model}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Globe className="size-3.5" />{prompt.language}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">v{prompt.version}</span>
                  </div>

                  {/* Stats */}
                  {prompt.uses > 0 && (
                    <div className="grid grid-cols-4 gap-2 rounded-lg bg-muted/40 p-2.5 text-center text-xs">
                      <div>
                        <p className="text-muted-foreground">Uses</p>
                        <p className="font-semibold">{prompt.uses.toLocaleString()}</p>
                      </div>
                      <div className="border-x border-border">
                        <p className="text-muted-foreground">Tokens</p>
                        <p className="font-semibold">{prompt.tokens}</p>
                      </div>
                      <div className="border-r border-border">
                        <p className="text-muted-foreground">Cost</p>
                        <p className="font-semibold">{prompt.cost}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rating</p>
                        <p className="font-semibold">{prompt.rating > 0 ? prompt.rating : "—"}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setTab("editor")}>
                      <Settings className="size-3.5" />Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setTab("testing")}>
                      <Play className="size-3.5" />Test
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs"><Copy className="size-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ── EDITOR ── */}
      {tab === "editor" && (
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Wizard steps */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Prompt Wizard</CardTitle>
            </CardHeader>
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

          {/* Editor pane */}
          <div className="lg:col-span-3 space-y-4">
            {wizardStep === 0 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 1 — Basic Info</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Prompt Name</label><Input placeholder="e.g. Lead Qualification Prompt" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Category</label><Input placeholder="e.g. Sales, Support, Finance" /></div>
                  </div>
                  <div className="space-y-1.5"><label className="text-sm font-medium">Description</label><textarea className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="What does this prompt do?" /></div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Owner</label><Input placeholder="Agent or team" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Tags</label><Input placeholder="sales, qualification..." /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Status</label><Input placeholder="draft" defaultValue="draft" /></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 1 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 2 — Prompt Type</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {["System Prompt", "User Prompt", "Assistant Prompt", "Workflow Prompt", "AI Agent Prompt", "Knowledge Prompt", "Evaluation Prompt", "Custom Prompt"].map((t) => (
                      <button key={t} className={`flex items-center gap-3 rounded-xl border p-3.5 text-left hover:border-primary hover:bg-primary/5 transition-colors ${t === "AI Agent Prompt" ? "border-primary bg-primary/10" : "border-border"}`}>
                        <FileCode className={`size-5 ${t === "AI Agent Prompt" ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="text-sm font-medium">{t}</p>
                          <p className="text-xs text-muted-foreground">Configure how the model receives this prompt</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 2 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 3 — Language & Model</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <div className="flex flex-wrap gap-2">
                      {["Arabic", "English", "Multilingual"].map((l) => (
                        <button key={l} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${l === "English" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Model Compatibility</label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {["GPT-4o", "Claude 3.5 Sonnet", "GPT-4o Mini", "Gemini 1.5 Pro"].map((m) => (
                        <label key={m} className="flex items-center gap-2.5 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted">
                          <input type="checkbox" defaultChecked={["GPT-4o", "Claude 3.5 Sonnet"].includes(m)} />
                          <Brain className="size-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><label className="text-sm font-medium">Preferred Model</label><Input defaultValue="GPT-4o" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium">Fallback Model</label><Input defaultValue="GPT-4o Mini" /></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 3 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Step 4 — Prompt Editor</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-2 py-0.5">{promptContent.length} chars</span>
                      <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5">~{Math.round(promptContent.length / 4)} tokens</span>
                      <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5">Est. $0.009</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <textarea
                    className="w-full h-72 rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring leading-relaxed"
                    value={promptContent}
                    onChange={(e) => setPromptContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Sparkles className="size-4" />AI Optimize</Button>
                    <Button variant="outline" size="sm"><Layers className="size-4" />Insert Snippet</Button>
                    <Button variant="outline" size="sm"><FileText className="size-4" />Add Block</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {wizardStep === 4 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 5 — Variables</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">These variables were detected in your prompt. Configure their source and default values.</p>
                  <div className="space-y-3">
                    {[
                      { name: "organization_name", source: "Organization Profile", required: true },
                      { name: "customer_name", source: "CRM Contact", required: true },
                      { name: "company_name", source: "CRM Company", required: false },
                      { name: "lead_source", source: "CRM Lead", required: false },
                      { name: "deal_value", source: "CRM Deal", required: false },
                      { name: "current_date", source: "System Date", required: true },
                      { name: "language", source: "User Preference", required: false },
                    ].map((v) => (
                      <div key={v.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded-md text-primary w-40 shrink-0">{"{{" + v.name + "}}"}</code>
                        <span className="text-xs text-muted-foreground flex-1">{v.source}</span>
                        {v.required ? (
                          <Badge className="text-xs bg-red-100 text-red-600">Required</Badge>
                        ) : (
                          <Badge className="text-xs bg-muted text-muted-foreground">Optional</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm"><Plus className="size-4" />Add Custom Variable</Button>
                </CardContent>
              </Card>
            )}

            {wizardStep === 5 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Step 6 — Test & Review</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                    <p className="text-sm font-semibold">Live Playground</p>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-card border border-border p-3 text-xs font-mono text-muted-foreground leading-relaxed max-h-32 overflow-y-auto">
                        {SAMPLE_PROMPT.slice(0, 300)}...
                      </div>
                      <div className="flex gap-2">
                        <Input value={testInput} onChange={(e) => setTestInput(e.target.value)} placeholder="Test input: e.g. Hi, I am interested in your CRM for 80 users..." className="flex-1 text-sm" />
                        <Button size="sm"><Play className="size-4" />Run</Button>
                      </div>
                      <div className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground min-h-16">
                        {testInput ? "Running prompt..." : "Response will appear here after you test the prompt."}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Quality Score", value: "92%" },
                      { label: "Token Usage", value: "342" },
                      { label: "Est. Cost", value: "$0.011" },
                      { label: "Latency", value: "1.3s" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg border border-border p-3 text-center">
                        <p className="text-lg font-semibold">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">Save Draft</Button>
                    <Button variant="outline" className="flex-1"><Eye className="size-4" />Submit for Review</Button>
                    <Button className="flex-1"><CheckCircle2 className="size-4" />Publish Prompt</Button>
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
                  <CardTitle className="text-sm">Live Playground — Lead Qualification Prompt v2.4</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setAbMode(!abMode)}>
                      <SplitSquareHorizontal className="size-4" />{abMode ? "Single Mode" : "A/B Test"}
                    </Button>
                    <Button variant="outline" size="sm"><Copy className="size-4" />Batch Test</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className={`grid gap-4 ${abMode ? "grid-cols-2" : "grid-cols-1"}`}>
                  {[...(abMode ? ["Prompt A", "Prompt B"] : ["Prompt"])].map((label) => (
                    <div key={label} className="space-y-2">
                      {abMode && <p className="text-xs font-semibold text-muted-foreground">{label}</p>}
                      <div className="rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs leading-relaxed text-muted-foreground max-h-28 overflow-y-auto">
                        {SAMPLE_PROMPT.slice(0, 200)}...
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-end"><div className="rounded-xl rounded-tr-sm bg-primary px-3 py-2 text-xs text-primary-foreground max-w-[80%]">Hi, I want to try Vision CRM for my team of 120 people. What are the plans?</div></div>
                        <div className="flex justify-start"><div className="rounded-xl rounded-tl-sm bg-card border border-border px-3 py-2 text-xs max-w-[80%]">Hello! I am Sara. A team of 120 is a great fit for our Enterprise plan which includes unlimited contacts, AI agents, and a dedicated account manager. May I ask — are you currently using another CRM?</div></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Enter test message..." className="flex-1 text-sm" />
                  <Button size="sm"><Play className="size-4" />Send</Button>
                </div>
              </CardContent>
            </Card>

            {/* Test cases */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Test Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {[
                  { name: "Small team, low urgency", input: "Looking for CRM for 5 people, no rush", expected: "Score 30–50", result: "48", status: "pass" },
                  { name: "Large team, high budget", input: "Need enterprise CRM, 500 users, $50K budget", expected: "Score 80–100", result: "91", status: "pass" },
                  { name: "Competitor mention", input: "We use Salesforce, considering switching", expected: "Engage competitor pain points", result: "Handled", status: "pass" },
                  { name: "Off-topic query", input: "What is the weather in Dubai today?", expected: "Polite redirect", result: "Redirected", status: "pass" },
                ].map((tc, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
                    <div className={`size-2 shrink-0 rounded-full ${tc.status === "pass" ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-sm font-medium w-40 shrink-0 truncate">{tc.name}</span>
                    <span className="text-xs text-muted-foreground flex-1 truncate">{tc.input}</span>
                    <span className="text-xs text-muted-foreground w-20 shrink-0">Result: {tc.result}</span>
                    <Badge className={`text-xs ${tc.status === "pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{tc.status}</Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full"><Plus className="size-4" />Add Test Case</Button>
              </CardContent>
            </Card>
          </div>

          {/* Metrics panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Performance Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-4">
                {[
                  { label: "Accuracy", value: "92%", color: "bg-green-500" },
                  { label: "Completeness", value: "88%", color: "bg-blue-500" },
                  { label: "Relevance", value: "95%", color: "bg-purple-500" },
                  { label: "Consistency", value: "91%", color: "bg-orange-500" },
                  { label: "Hallucination Rate", value: "2%", color: "bg-red-500", invert: true },
                ].map((m) => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{m.label}</span>
                      <span className="text-muted-foreground">{m.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${m.color}`} style={{ width: m.value }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Cost & Usage</CardTitle></CardHeader>
              <CardContent className="space-y-2 p-4">
                {[
                  { label: "Tokens (avg)", value: "342" },
                  { label: "Cost (avg)", value: "$0.011" },
                  { label: "Latency (avg)", value: "1.3s" },
                  { label: "Test Runs", value: "24" },
                ].map((m) => (
                  <div key={m.label} className="flex justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <span className="text-sm font-semibold">{m.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── VERSIONING ── */}
      {tab === "versioning" && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Version History — Lead Qualification Prompt</CardTitle>
                <Button variant="outline" size="sm"><GitBranch className="size-4" />Compare Versions</Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {[
                { version: "v2.4", status: "published", date: "3d ago", author: "Admin", changes: "Improved scoring logic, added deal_value variable", tokens: 480 },
                { version: "v2.3", status: "archived", date: "2w ago", author: "Admin", changes: "Fixed Arabic language handling, reduced token count", tokens: 510 },
                { version: "v2.2", status: "archived", date: "1mo ago", author: "Team Lead", changes: "Added objection handling instructions", tokens: 560 },
                { version: "v2.1", status: "archived", date: "2mo ago", author: "Admin", changes: "Initial multilingual support", tokens: 490 },
                { version: "v2.0", status: "archived", date: "3mo ago", author: "Admin", changes: "Major rewrite — new scoring methodology", tokens: 420 },
              ].map((v) => (
                <div key={v.version} className="flex items-start gap-4 rounded-lg border border-border px-4 py-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-xs font-bold">{v.version}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-xs ${STATUS_STYLES[v.status]}`}>{v.status}</Badge>
                      <span className="text-xs text-muted-foreground">{v.author} · {v.date}</span>
                    </div>
                    <p className="text-sm mt-1">{v.changes}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.tokens} tokens avg</p>
                  </div>
                  <div className="flex gap-2">
                    {v.status === "archived" && (
                      <Button variant="outline" size="sm" className="text-xs">Restore</Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs"><Eye className="size-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="text-xs"><Copy className="size-3.5" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── ANALYTICS ── */}
      {tab === "analytics" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Prompt Calls (MTD)", value: "5,604", icon: Activity },
              { label: "Avg Quality Score", value: "4.7 / 5", icon: Star },
              { label: "Total Token Cost (MTD)", value: "$48.20", icon: DollarSign },
              { label: "Avg Latency", value: "1.2s", icon: Clock },
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
            <CardHeader className="pb-2"><CardTitle className="text-sm">Prompt Performance Table</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Prompt</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Uses</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Success</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Avg Tokens</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Avg Cost</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Rating</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {PROMPTS.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.category} · {p.model}</p>
                        </div>
                      </td>
                      <td className="py-3 text-right">{p.uses > 0 ? p.uses.toLocaleString() : "—"}</td>
                      <td className="py-3 text-right text-green-600">{p.successRate}</td>
                      <td className="py-3 text-right">{p.tokens}</td>
                      <td className="py-3 text-right">{p.cost}</td>
                      <td className="py-3 text-right">{p.rating > 0 ? `${p.rating} ★` : "—"}</td>
                      <td className="py-3 text-right"><Badge className={`text-xs ${STATUS_STYLES[p.status]}`}>{p.status}</Badge></td>
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
              <Input placeholder="Search prompt templates..." className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm">All Categories</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LIBRARY_TEMPLATES.map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <FileCode className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t.uses.toLocaleString()} uses</span>
                    <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <ArrowUpRight className="size-3.5" />Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
