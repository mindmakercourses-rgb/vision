"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FlaskConical,
  Bot,
  Zap,
  BarChart3,
  CheckCircle2,
  Clock,
  PlayCircle,
  TrendingUp,
  Target,
  Star,
  GitBranch,
  Layers,
  Brain,
  ShieldCheck,
  DollarSign,
  Lightbulb,
  Rocket,
  ArrowUpRight,
  BarChart2,
  Beaker,
} from "lucide-react"

const EXPERIMENTS = [
  { id: "EXP-041", name: "GPT-4o vs Claude 3.5 — Sales Summarization", type: "Model Comparison", status: "running", accuracy: 94.2, latency: "820ms", cost: "$0.0042/req", started: "2d ago", owner: "AI Team" },
  { id: "EXP-038", name: "Multi-step Agentic Workflow — Deal Closure", type: "AI Agent", status: "completed", accuracy: 91.8, latency: "2.4s", cost: "$0.018/req", started: "5d ago", owner: "Product Team" },
  { id: "EXP-035", name: "Arabic NLP Prompt Templates v3", type: "Prompt Lab", status: "review", accuracy: 89.4, latency: "650ms", cost: "$0.0031/req", started: "8d ago", owner: "AI Team" },
  { id: "EXP-033", name: "Predictive Lead Scoring — ML Model", type: "ML Experiment", status: "running", accuracy: 82.1, latency: "95ms", cost: "$0.0008/req", started: "11d ago", owner: "Data Science" },
  { id: "EXP-029", name: "Voice AI Emotion Detection", type: "AI Agent", status: "sandbox", accuracy: null, latency: null, cost: null, started: "14d ago", owner: "Voice Team" },
]

const ROADMAP = [
  { stage: "Ideas", count: 24, color: "bg-slate-400", items: ["AI-powered contract drafting", "Predictive churn model", "Smart meeting scheduler"] },
  { stage: "Prototype", count: 8, color: "bg-yellow-400", items: ["Autonomous deal closer v2", "Multilingual voice AI"] },
  { stage: "Pilot", count: 4, color: "bg-blue-400", items: ["AI Sales Coach", "Smart document OCR"] },
  { stage: "Beta", count: 2, color: "bg-purple-400", items: ["Vision AI OS v2"] },
  { stage: "GA", count: 1, color: "bg-green-500", items: ["AI Command Center"] },
]

const MODEL_BENCH = [
  { model: "GPT-4o", provider: "OpenAI", quality: 96, latency: 820, cost: 0.0042, safety: 98, overall: 95 },
  { model: "Claude 3.5 Sonnet", provider: "Anthropic", quality: 95, latency: 750, cost: 0.0038, safety: 99, overall: 96 },
  { model: "Gemini 1.5 Pro", provider: "Google", quality: 93, latency: 680, cost: 0.0031, safety: 97, overall: 94 },
  { model: "Llama 3.1 70B", provider: "Meta", quality: 88, latency: 920, cost: 0.0009, safety: 94, overall: 90 },
]

const STATUS_BADGE: Record<string, string> = {
  running: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  review: "bg-yellow-100 text-yellow-700",
  sandbox: "bg-purple-100 text-purple-700",
}

export default function InnovationLabPage() {
  const [activeTab, setActiveTab] = useState<"experiments" | "models" | "roadmap" | "ab">("experiments")

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Innovation Lab</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Experiment with new AI models, agents, workflows, and features in an isolated sandbox before production.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FlaskConical className="size-4" />New Experiment</Button>
          <Button><Rocket className="size-4" />Promote to Production</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Active Experiments", value: EXPERIMENTS.filter(e => e.status === "running").length, icon: FlaskConical, color: "text-blue-500" },
          { label: "Completed This Month", value: 8, icon: CheckCircle2, color: "text-green-500" },
          { label: "Avg AI Accuracy", value: "91.4%", icon: Target, color: "text-primary" },
          { label: "Ideas in Pipeline", value: ROADMAP.reduce((s, r) => s + r.count, 0), icon: Lightbulb, color: "text-yellow-500" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
              </div>
              <s.icon className={`size-5 ${s.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1 w-fit flex-wrap">
        {(["experiments", "models", "roadmap", "ab"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {tab === "ab" ? "A/B Testing" : tab === "models" ? "Model Lab" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "experiments" && (
        <div className="space-y-3">
          {EXPERIMENTS.map((exp) => (
            <Card key={exp.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                      <FlaskConical className="size-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">{exp.name}</p>
                        <Badge className={`${STATUS_BADGE[exp.status]} border-0 text-xs`}>{exp.status}</Badge>
                        <Badge variant="outline" className="text-[10px]">{exp.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{exp.id} · {exp.owner} · Started {exp.started}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap shrink-0">
                    {exp.accuracy && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Accuracy</p>
                        <p className="font-semibold text-sm">{exp.accuracy}%</p>
                      </div>
                    )}
                    {exp.latency && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Latency</p>
                        <p className="font-semibold text-sm">{exp.latency}</p>
                      </div>
                    )}
                    {exp.cost && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Cost</p>
                        <p className="font-semibold text-sm">{exp.cost}</p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                      {exp.status === "running" ? <><BarChart3 className="size-3.5" />View</> : exp.status === "review" ? <><ShieldCheck className="size-3.5" />Approve</> : <><Rocket className="size-3.5" />Promote</>}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "models" && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Brain className="size-4" />AI Model Benchmark</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Model", "Provider", "Quality", "Latency", "Cost/Req", "Safety", "Overall"].map((h) => (
                      <th key={h} className="pb-3 pr-4 text-left text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MODEL_BENCH.sort((a, b) => b.overall - a.overall).map((m, i) => (
                    <tr key={m.model} className="border-b border-border last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          {i === 0 && <Star className="size-3.5 fill-yellow-400 text-yellow-400 shrink-0" />}
                          <span className="font-semibold">{m.model}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground text-xs">{m.provider}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${m.quality}%` }} />
                          </div>
                          <span className="text-xs font-medium">{m.quality}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs">{m.latency}ms</td>
                      <td className="py-3 pr-4 font-mono text-xs">${m.cost.toFixed(4)}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-green-500" style={{ width: `${m.safety}%` }} />
                          </div>
                          <span className="text-xs font-medium">{m.safety}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge className={`text-xs border-0 ${i === 0 ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{m.overall}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "roadmap" && (
        <div className="space-y-4">
          {/* Kanban-style roadmap */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ROADMAP.map((stage) => (
              <Card key={stage.stage}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold">{stage.stage}</CardTitle>
                    <Badge className={`${stage.color} text-white border-0 text-xs`}>{stage.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stage.items.map((item) => (
                    <div key={item} className="rounded-lg border border-border bg-muted/20 p-2.5 text-xs text-muted-foreground leading-snug">
                      {item}
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full h-7 text-xs text-muted-foreground border border-dashed border-border mt-1">+ Add</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "ab" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              name: "Pricing Page CTA — Variant B",
              type: "UI Experiment",
              traffic: "50/50",
              winner: "B",
              metric: "Conversion Rate",
              a: "3.2%",
              b: "4.7%",
              lift: "+47%",
              status: "winner-declared",
            },
            {
              name: "Lead Qualification Prompt v2 vs v3",
              type: "AI Experiment",
              traffic: "50/50",
              winner: null,
              metric: "Qualification Accuracy",
              a: "87.4%",
              b: "91.2%",
              lift: "+4.3%",
              status: "running",
            },
            {
              name: "Deal Summary — GPT-4o vs Claude",
              type: "AI Experiment",
              traffic: "50/50",
              winner: null,
              metric: "User Acceptance Rate",
              a: "82%",
              b: "88%",
              lift: "+7.3%",
              status: "running",
            },
            {
              name: "Onboarding Flow — 4-step vs 7-step",
              type: "UI Experiment",
              traffic: "50/50",
              winner: "A",
              metric: "Setup Completion",
              a: "91%",
              b: "74%",
              lift: "A wins",
              status: "winner-declared",
            },
          ].map((exp) => (
            <Card key={exp.name}>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-sm">{exp.name}</p>
                    <p className="text-xs text-muted-foreground">{exp.type} · {exp.metric}</p>
                  </div>
                  <Badge className={exp.status === "running" ? "bg-blue-100 text-blue-700 border-0 text-xs" : "bg-green-100 text-green-700 border-0 text-xs"}>
                    {exp.status === "running" ? "Running" : "Concluded"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(["a", "b"] as const).map((variant) => (
                    <div key={variant} className={`rounded-xl border p-3 text-center ${exp.winner === variant.toUpperCase() ? "border-green-400 bg-green-50 dark:bg-green-950/20" : "border-border"}`}>
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Variant {variant.toUpperCase()}</p>
                      <p className="text-xl font-bold">{exp[variant]}</p>
                      {exp.winner === variant.toUpperCase() && <CheckCircle2 className="size-4 text-green-500 mx-auto mt-1" />}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Traffic split: {exp.traffic}</span>
                  <span className="flex items-center gap-1 font-semibold text-green-600"><ArrowUpRight className="size-3.5" />{exp.lift}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
