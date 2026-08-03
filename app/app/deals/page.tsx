"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Handshake,
  Plus,
  Search,
  TrendingUp,
  DollarSign,
  Trophy,
  Clock,
  User,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"

const PIPELINE_STAGES = [
  { id: "discovery", label: "Discovery", color: "bg-slate-400" },
  { id: "proposal", label: "Proposal", color: "bg-blue-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-yellow-500" },
  { id: "contract", label: "Contract", color: "bg-orange-500" },
  { id: "closed_won", label: "Closed Won", color: "bg-green-500" },
]

const MOCK_DEALS = [
  { id: "1", name: "TechCorp Enterprise Suite", company: "TechCorp Egypt", stage: "negotiation", value: 180000, probability: 75, owner: "Omar K.", closeDate: "2026-09-15", daysInStage: 5 },
  { id: "2", name: "Smart Buildings AI Platform", company: "Smart Buildings Co", stage: "contract", value: 450000, probability: 90, owner: "Sara M.", closeDate: "2026-08-30", daysInStage: 2 },
  { id: "3", name: "Gulf Trading CRM", company: "Gulf Trading LLC", stage: "proposal", value: 85000, probability: 55, owner: "Omar K.", closeDate: "2026-10-01", daysInStage: 8 },
  { id: "4", name: "Riyadh Retail Automation", company: "Riyadh Retail", stage: "discovery", value: 35000, probability: 30, owner: "Sara M.", closeDate: "2026-11-15", daysInStage: 3 },
  { id: "5", name: "Nile Logistics Suite", company: "Nile Logistics", stage: "closed_won", value: 220000, probability: 100, owner: "Omar K.", closeDate: "2026-07-28", daysInStage: 0 },
  { id: "6", name: "Digital Solutions Package", company: "Digital Solutions", stage: "proposal", value: 62000, probability: 60, owner: "Sara M.", closeDate: "2026-09-20", daysInStage: 11 },
]

function ProbabilityBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-green-500" : value >= 50 ? "bg-blue-500" : "bg-yellow-500"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground">{value}%</span>
    </div>
  )
}

export default function DealsPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"pipeline" | "list">("pipeline")

  const filtered = MOCK_DEALS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.company.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = MOCK_DEALS.filter((d) => d.stage !== "closed_won").reduce((s, d) => s + d.value, 0)
  const wonValue = MOCK_DEALS.filter((d) => d.stage === "closed_won").reduce((s, d) => s + d.value, 0)
  const weightedValue = MOCK_DEALS.filter((d) => d.stage !== "closed_won").reduce((s, d) => s + d.value * d.probability / 100, 0)

  const stats = [
    { label: "Pipeline Value", value: "$" + (totalValue / 1000).toFixed(0) + "K", icon: DollarSign, sub: "Open deals" },
    { label: "Weighted Forecast", value: "$" + (weightedValue / 1000).toFixed(0) + "K", icon: TrendingUp, sub: "By probability" },
    { label: "Won This Month", value: "$" + (wonValue / 1000).toFixed(0) + "K", icon: Trophy, sub: `${MOCK_DEALS.filter(d => d.stage === "closed_won").length} deals` },
    { label: "Avg Close Time", value: "24 days", icon: Clock, sub: "This quarter" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Deals & Pipeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage your sales opportunities.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          New Deal
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-start justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
              <s.icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent px-0 focus-visible:ring-0"
          />
        </div>
        <div className="flex rounded-lg border border-border overflow-hidden">
          {(["pipeline", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "pipeline" ? (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage) => {
            const stageDeals = filtered.filter((d) => d.stage === stage.id)
            const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0)
            return (
              <div key={stage.id} className="w-72 shrink-0 space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${stage.color}`} />
                    <span className="text-sm font-semibold">{stage.label}</span>
                    <Badge variant="outline" className="text-xs">{stageDeals.length}</Badge>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">${(stageTotal / 1000).toFixed(0)}K</span>
                </div>
                <div className="space-y-2">
                  {stageDeals.map((deal) => (
                    <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow border-l-2" style={{ borderLeftColor: stage.color.replace("bg-", "").includes("green") ? "#22c55e" : stage.color.includes("blue") ? "#3b82f6" : stage.color.includes("yellow") ? "#eab308" : stage.color.includes("orange") ? "#f97316" : "#94a3b8" }}>
                      <CardContent className="p-3 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{deal.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{deal.company}</p>
                          </div>
                          <button className="shrink-0 rounded p-0.5 hover:bg-muted">
                            <MoreHorizontal className="size-4 text-muted-foreground" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-semibold">${deal.value.toLocaleString()}</span>
                          <ProbabilityBar value={deal.probability} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="size-3" />
                            {deal.owner}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {deal.daysInStage}d
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <button className="w-full rounded-lg border-2 border-dashed border-border py-3 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="mx-auto size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">Deal</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Stage</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Value</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Probability</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Owner</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Close Date</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((deal) => {
                    const stage = PIPELINE_STAGES.find((s) => s.id === deal.stage)
                    return (
                      <tr key={deal.id} className="border-b border-border hover:bg-muted/40 cursor-pointer">
                        <td className="px-4 py-3">
                          <p className="font-medium">{deal.name}</p>
                          <p className="text-xs text-muted-foreground">{deal.company}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="gap-1">
                            <div className={`size-1.5 rounded-full ${stage?.color}`} />
                            {stage?.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 font-semibold">${deal.value.toLocaleString()}</td>
                        <td className="px-4 py-3"><ProbabilityBar value={deal.probability} /></td>
                        <td className="px-4 py-3 text-muted-foreground">{deal.owner}</td>
                        <td className="px-4 py-3 text-muted-foreground">{deal.closeDate}</td>
                        <td className="px-4 py-3">
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
