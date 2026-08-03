"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Target,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Phone,
  Mail,
  MoreHorizontal,
  Star,
  Clock,
  Building2,
  User,
  ArrowUpRight,
  Flame,
  Thermometer,
  Snowflake,
} from "lucide-react"

const MOCK_LEADS = [
  { id: "1", name: "Ahmed Hassan", company: "TechCorp Egypt", email: "ahmed@techcorp.eg", phone: "+20 100 123 4567", score: 92, stage: "qualified", source: "WhatsApp", owner: "Sara M.", value: 45000, status: "hot", lastActivity: "2h ago" },
  { id: "2", name: "Layla Ibrahim", company: "Digital Solutions", email: "layla@digital.co", phone: "+20 112 987 6543", score: 78, stage: "contacted", source: "Email", owner: "Omar K.", value: 28000, status: "warm", lastActivity: "1d ago" },
  { id: "3", name: "Mohamed Ali", company: "Gulf Trading LLC", email: "m.ali@gulftrade.ae", phone: "+971 50 123 4567", score: 65, stage: "new", source: "LinkedIn", owner: "Sara M.", value: 120000, status: "warm", lastActivity: "3d ago" },
  { id: "4", name: "Fatima Al-Rashid", company: "Riyadh Retail", email: "f.rashid@retail.sa", phone: "+966 55 111 2233", score: 45, stage: "new", source: "Web", owner: "Unassigned", value: 15000, status: "cold", lastActivity: "1w ago" },
  { id: "5", name: "Khaled Mansour", company: "Smart Buildings Co", email: "k.mansour@smart.eg", phone: "+20 100 555 7788", score: 88, stage: "proposal", source: "Referral", owner: "Omar K.", value: 200000, status: "hot", lastActivity: "30m ago" },
  { id: "6", name: "Nour El-Din", company: "Nile Logistics", email: "nour@nilelogix.com", phone: "+20 115 333 4455", score: 71, stage: "contacted", source: "WhatsApp", owner: "Sara M.", value: 55000, status: "warm", lastActivity: "5h ago" },
]

const STAGES = ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"]
const STAGE_COLORS: Record<string, string> = {
  new: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  contacted: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  qualified: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  proposal: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  negotiation: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  won: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  lost: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
}

function LeadStatusIcon({ status }: { status: string }) {
  if (status === "hot") return <Flame className="size-3.5 text-red-500" />
  if (status === "warm") return <Thermometer className="size-3.5 text-orange-500" />
  return <Snowflake className="size-3.5 text-blue-400" />
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-400"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-medium tabular-nums">{score}</span>
    </div>
  )
}

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"list" | "kanban">("list")

  const filtered = MOCK_LEADS.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()),
  )

  const stats = [
    { label: "Total Leads", value: MOCK_LEADS.length, icon: Target, trend: "+12%" },
    { label: "Hot Leads", value: MOCK_LEADS.filter((l) => l.status === "hot").length, icon: Flame, trend: "+3" },
    { label: "Pipeline Value", value: "$" + (MOCK_LEADS.reduce((s, l) => s + l.value, 0) / 1000).toFixed(0) + "K", icon: TrendingUp, trend: "+18%" },
    { label: "Avg. Score", value: Math.round(MOCK_LEADS.reduce((s, l) => s + l.score, 0) / MOCK_LEADS.length), icon: Star, trend: "+5pts" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and qualify your sales leads with AI scoring.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          New Lead
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <s.icon className="size-5 text-muted-foreground" />
                <span className="text-xs font-medium text-green-600">{s.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent px-0 focus-visible:ring-0"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Filter
        </Button>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${view === "kanban" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
          >
            Kanban
          </button>
        </div>
      </div>

      {view === "list" ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">Lead</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Company</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Stage</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">AI Score</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Value</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Source</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Owner</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Activity</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-muted/40 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <LeadStatusIcon status={lead.status} />
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="size-3.5 text-muted-foreground" />
                          {lead.company}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={STAGE_COLORS[lead.stage]}>{lead.stage}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBar score={lead.score} />
                      </td>
                      <td className="px-4 py-3 font-medium">${lead.value.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.source}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <User className="size-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">{lead.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="size-3.5" />
                          {lead.lastActivity}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="rounded p-1 hover:bg-muted">
                            <Phone className="size-3.5 text-muted-foreground" />
                          </button>
                          <button className="rounded p-1 hover:bg-muted">
                            <Mail className="size-3.5 text-muted-foreground" />
                          </button>
                          <button className="rounded p-1 hover:bg-muted">
                            <MoreHorizontal className="size-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Kanban View */
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.slice(0, 5).map((stage) => {
            const stageLeads = filtered.filter((l) => l.stage === stage)
            return (
              <div key={stage} className="w-64 shrink-0">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold capitalize">{stage}</span>
                  <Badge variant="outline" className="text-xs">{stageLeads.length}</Badge>
                </div>
                <div className="space-y-2">
                  {stageLeads.map((lead) => (
                    <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.company}</p>
                          </div>
                          <LeadStatusIcon status={lead.status} />
                        </div>
                        <ScoreBar score={lead.score} />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>${lead.value.toLocaleString()}</span>
                          <span>{lead.lastActivity}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="rounded-lg border-2 border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
