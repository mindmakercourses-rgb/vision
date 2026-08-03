"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Search,
  Plus,
  User,
  Building2,
  Tag,
  Clock,
  Trash2,
  Edit3,
  RefreshCw,
  Shield,
  Database,
  Network,
  Layers,
  Filter,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Eye,
  Lock,
} from "lucide-react"

const MEMORY_TYPES = ["All", "Contact", "Company", "Preference", "Behavior", "Context", "System"]
const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  stale: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  sensitive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const MOCK_MEMORIES = [
  {
    id: "m1", type: "Contact", entity: "Ahmed Hassan", key: "preferred_language",
    value: "Arabic (Formal)", confidence: 98, status: "active",
    source: "Conversation history", updated: "2 hours ago", agent: "Sara AI",
    tags: ["language", "preference"],
  },
  {
    id: "m2", type: "Company", entity: "TechCorp Egypt", key: "decision_maker",
    value: "CTO approves deals over $50K", confidence: 95, status: "active",
    source: "CRM enrichment", updated: "1 day ago", agent: "System",
    tags: ["sales", "hierarchy"],
  },
  {
    id: "m3", type: "Contact", entity: "Sara Mohammed", key: "communication_style",
    value: "Prefers voice calls, not email. Best time: 10am–12pm", confidence: 89, status: "active",
    source: "Interaction pattern", updated: "3 days ago", agent: "Omar Support",
    tags: ["communication", "scheduling"],
  },
  {
    id: "m4", type: "Behavior", entity: "Gulf Trading LLC", key: "payment_behavior",
    value: "Typically delays payment by 15–20 days past due", confidence: 92, status: "sensitive",
    source: "Finance records", updated: "1 week ago", agent: "Finance AI",
    tags: ["payment", "risk"],
  },
  {
    id: "m5", type: "Context", entity: "Global", key: "ramadan_mode",
    value: "Shorter working hours, avoid calls after 2pm during Ramadan", confidence: 100, status: "active",
    source: "Cultural context engine", updated: "2 months ago", agent: "i18n Engine",
    tags: ["culture", "scheduling"],
  },
  {
    id: "m6", type: "Preference", entity: "Omar Khalil", key: "product_interest",
    value: "Interested in AI Voice features, requested demo 3 times", confidence: 97, status: "active",
    source: "Sales conversations", updated: "5 hours ago", agent: "Lead AI",
    tags: ["product", "interest"],
  },
  {
    id: "m7", type: "System", entity: "Workspace", key: "peak_usage_hours",
    value: "9am–11am & 2pm–4pm Cairo time", confidence: 94, status: "stale",
    source: "Usage analytics", updated: "3 weeks ago", agent: "Analytics AI",
    tags: ["performance", "system"],
  },
  {
    id: "m8", type: "Behavior", entity: "Nile Logistics", key: "churn_signals",
    value: "Reduced WhatsApp engagement by 60% over 30 days", confidence: 88, status: "sensitive",
    source: "Churn AI", updated: "6 hours ago", agent: "CS AI",
    tags: ["churn", "risk"],
  },
]

const MEMORY_GRAPHS = [
  { entity: "Ahmed Hassan", connections: 14, memories: 38, category: "VIP Contact" },
  { entity: "TechCorp Egypt", connections: 22, memories: 67, category: "Enterprise Customer" },
  { entity: "Sara Mohammed", connections: 9, memories: 21, category: "Active Lead" },
  { entity: "Gulf Trading LLC", connections: 11, memories: 29, category: "Customer" },
]

const AI_AGENTS_MEMORY = [
  { agent: "Sara AI (Sales)", memories: 1840, active: true, lastSync: "2 min ago", coverage: 96 },
  { agent: "Omar Support", memories: 2310, active: true, lastSync: "5 min ago", coverage: 98 },
  { agent: "Lead Qualifier AI", memories: 920, active: true, lastSync: "12 min ago", coverage: 87 },
  { agent: "Finance AI", memories: 440, active: false, lastSync: "2 hours ago", coverage: 72 },
  { agent: "Analytics AI", memories: 310, active: true, lastSync: "30 min ago", coverage: 81 },
]

export default function AIMemoryStudioPage() {
  const [activeType, setActiveType] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null)

  const filtered = MOCK_MEMORIES.filter((m) => {
    const matchType = activeType === "All" || m.type === activeType
    const matchSearch =
      search === "" ||
      m.entity.toLowerCase().includes(search.toLowerCase()) ||
      m.key.toLowerCase().includes(search.toLowerCase()) ||
      m.value.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const totalMemories = AI_AGENTS_MEMORY.reduce((s, a) => s + a.memories, 0)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600">
              <Brain className="size-4 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">AI Memory Studio</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, audit, and control what every AI agent remembers across contacts, companies, and contexts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Upload className="size-4" />Import</Button>
          <Button variant="outline" size="sm"><Download className="size-4" />Export</Button>
          <Button size="sm"><Plus className="size-4" />Add Memory</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Memories", value: totalMemories.toLocaleString(), icon: Database, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
          { label: "Active Agents", value: `${AI_AGENTS_MEMORY.filter((a) => a.active).length} / ${AI_AGENTS_MEMORY.length}`, icon: Brain, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
          { label: "Memory Graphs", value: "4 entities", icon: Network, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
          { label: "Sensitive Records", value: MOCK_MEMORIES.filter((m) => m.status === "sensitive").length, icon: Shield, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex size-10 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`size-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-semibold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Memory Browser — left 2 cols */}
        <div className="space-y-4 lg:col-span-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input
                placeholder="Search memories by entity, key, or value..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent px-0 focus-visible:ring-0"
              />
            </div>
            <Button variant="outline" size="sm"><Filter className="size-4" />Filter</Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MEMORY_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeType === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Memory cards */}
          <div className="space-y-2">
            {filtered.map((mem) => (
              <Card
                key={mem.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedMemory === mem.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedMemory(mem.id === selectedMemory ? null : mem.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Entity icon */}
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                      {mem.type === "Contact" ? (
                        <User className="size-4 text-muted-foreground" />
                      ) : mem.type === "Company" ? (
                        <Building2 className="size-4 text-muted-foreground" />
                      ) : mem.type === "Behavior" ? (
                        <Layers className="size-4 text-muted-foreground" />
                      ) : mem.type === "System" ? (
                        <Database className="size-4 text-muted-foreground" />
                      ) : (
                        <Brain className="size-4 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{mem.entity}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{mem.key}</code>
                        <Badge className={`text-xs ${STATUS_COLORS[mem.status]}`}>{mem.status}</Badge>
                        {mem.status === "sensitive" && <Lock className="size-3 text-red-500" />}
                      </div>
                      <p className="mt-1 text-sm text-foreground">{mem.value}</p>

                      {selectedMemory === mem.id && (
                        <div className="mt-3 space-y-2 border-t border-border pt-3">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div><span className="text-muted-foreground">Source:</span> <span>{mem.source}</span></div>
                            <div><span className="text-muted-foreground">Agent:</span> <span>{mem.agent}</span></div>
                            <div><span className="text-muted-foreground">Confidence:</span> <span className="font-semibold text-primary">{mem.confidence}%</span></div>
                            <div><span className="text-muted-foreground">Updated:</span> <span>{mem.updated}</span></div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {mem.tags.map((tag) => (
                              <span key={tag} className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                                <Tag className="size-2.5" />{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="size-3" />{mem.updated}</span>
                        <span className="flex items-center gap-1"><Sparkles className="size-3" />{mem.agent}</span>
                        <span className="flex items-center gap-1"><Eye className="size-3" />{mem.confidence}% confidence</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button className="rounded p-1.5 hover:bg-muted transition-colors"><Edit3 className="size-3.5 text-muted-foreground" /></button>
                      <button className="rounded p-1.5 hover:bg-muted transition-colors"><RefreshCw className="size-3.5 text-muted-foreground" /></button>
                      <button className="rounded p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="size-3.5 text-red-500" /></button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No memories match your search criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Agent memory coverage */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Agent Memory Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {AI_AGENTS_MEMORY.map((a) => (
                <div key={a.agent} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`size-1.5 rounded-full inline-block ${a.active ? "bg-green-500" : "bg-gray-400"}`} />
                      <span className="font-medium truncate max-w-[120px]">{a.agent}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{a.memories.toLocaleString()}</span>
                      <span className="font-semibold text-foreground">{a.coverage}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${a.coverage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Synced {a.lastSync}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Entity memory graphs */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Memory Graphs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MEMORY_GRAPHS.map((g) => (
                <div key={g.entity} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/40 cursor-pointer transition-colors">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Network className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{g.entity}</p>
                    <p className="text-xs text-muted-foreground">{g.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold">{g.memories}</p>
                    <p className="text-xs text-muted-foreground">{g.connections} links</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Memory health */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Memory Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Active & accurate", count: 5, icon: CheckCircle2, color: "text-green-600" },
                { label: "Stale (needs refresh)", count: 1, icon: AlertTriangle, color: "text-yellow-600" },
                { label: "Sensitive (access control)", count: 2, icon: Shield, color: "text-red-600" },
              ].map((h) => (
                <div key={h.label} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <h.icon className={`size-3.5 ${h.color}`} />
                    <span>{h.label}</span>
                  </div>
                  <span className="text-xs font-semibold">{h.count}</span>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full mt-2">
                <RefreshCw className="size-3.5" />
                Run Memory Audit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
