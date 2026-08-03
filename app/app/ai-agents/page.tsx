"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bot, Plus, Search, Play, Pause, Settings, Copy, Trash2,
  MessageSquare, Mail, Phone, Globe, Brain, Zap, Star,
  BarChart3, TrendingUp, CheckCircle2, Clock, MoreHorizontal,
  Sparkles, FlaskConical,
} from "lucide-react"

const AI_AGENTS = [
  {
    id: "1", name: "Sara — Sales Agent", avatar: "S", dept: "Sales", status: "active",
    model: "GPT-4o", channels: ["whatsapp", "email", "voice"],
    stats: { conversations: 1240, resolved: "88%", satisfaction: 4.8, revenue: "$124K" },
    personality: "Professional & Sales-Oriented", version: "2.4",
    description: "Handles lead qualification, demos, proposals, and deal closing.",
  },
  {
    id: "2", name: "Omar — Support Agent", avatar: "O", dept: "Customer Support", status: "active",
    model: "Claude 3.5", channels: ["whatsapp", "email", "chat"],
    stats: { conversations: 3420, resolved: "91%", satisfaction: 4.9, revenue: "$0" },
    personality: "Empathetic & Support-Oriented", version: "1.8",
    description: "Resolves customer issues, manages tickets, and escalates when needed.",
  },
  {
    id: "3", name: "Lina — Billing Agent", avatar: "L", dept: "Finance", status: "active",
    model: "GPT-4o", channels: ["email", "whatsapp"],
    stats: { conversations: 540, resolved: "94%", satisfaction: 4.7, revenue: "$0" },
    personality: "Formal & Professional", version: "1.2",
    description: "Handles invoice queries, payment follow-ups, and billing disputes.",
  },
  {
    id: "4", name: "Karim — CEO Assistant", avatar: "K", dept: "Executive", status: "paused",
    model: "GPT-4o", channels: ["email", "voice"],
    stats: { conversations: 180, resolved: "96%", satisfaction: 4.9, revenue: "$0" },
    personality: "Executive & Formal", version: "1.0",
    description: "Manages executive communications, scheduling, and briefings.",
  },
  {
    id: "5", name: "Hana — Marketing Agent", avatar: "H", dept: "Marketing", status: "draft",
    model: "GPT-4o Mini", channels: ["email", "whatsapp"],
    stats: { conversations: 0, resolved: "—", satisfaction: 0, revenue: "$0" },
    personality: "Friendly & Creative", version: "0.1",
    description: "Generates campaign content, manages social responses, qualifies marketing leads.",
  },
]

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  whatsapp: <MessageSquare className="size-3.5 text-green-500" />,
  email: <Mail className="size-3.5 text-blue-500" />,
  voice: <Phone className="size-3.5 text-purple-500" />,
  chat: <Globe className="size-3.5 text-orange-500" />,
}

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  active: { badge: "bg-green-100 text-green-700", dot: "bg-green-500" },
  paused: { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  draft: { badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  training: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500 animate-pulse" },
}

export default function AIAgentsPage() {
  const [search, setSearch] = useState("")

  const filtered = AI_AGENTS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.dept.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: "Total Agents", value: AI_AGENTS.length, icon: Bot },
    { label: "Active", value: AI_AGENTS.filter((a) => a.status === "active").length, icon: CheckCircle2 },
    { label: "Conversations Today", value: 284, icon: MessageSquare },
    { label: "Avg. Satisfaction", value: "4.8", icon: Star },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Agents Studio</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage intelligent AI employees for your organization.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FlaskConical className="size-4" />Test Lab</Button>
          <Button><Plus className="size-4" />Create Agent</Button>
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

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search agents..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
        </div>
        <Button variant="outline" size="sm">All Departments</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((agent) => {
          const statusStyle = STATUS_STYLES[agent.status]
          return (
            <Card key={agent.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                        {agent.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card ${statusStyle.dot}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.dept}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className={`text-xs ${statusStyle.badge}`}>{agent.status}</Badge>
                    <button className="rounded p-1 hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
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
                </div>

                {/* Stats */}
                {agent.status !== "draft" && (
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Conversations</p>
                      <p className="font-semibold text-sm">{agent.stats.conversations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Resolution</p>
                      <p className="font-semibold text-sm">{agent.stats.resolved}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                      <p className="font-semibold text-sm">{agent.stats.satisfaction > 0 ? `${agent.stats.satisfaction}/5` : "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-semibold text-sm">{agent.stats.revenue}</p>
                    </div>
                  </div>
                )}

                {/* Model + version */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Brain className="size-3.5" />
                    <span>{agent.model}</span>
                  </div>
                  <span>v{agent.version}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Settings className="size-3.5" />Configure
                  </Button>
                  {agent.status === "active" ? (
                    <Button variant="outline" size="sm" className="text-xs">
                      <Pause className="size-3.5" />
                    </Button>
                  ) : agent.status === "paused" ? (
                    <Button size="sm" className="text-xs">
                      <Play className="size-3.5" />
                    </Button>
                  ) : agent.status === "draft" ? (
                    <Button size="sm" className="text-xs">
                      <Sparkles className="size-3.5" />Deploy
                    </Button>
                  ) : null}
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Copy className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Create new agent card */}
        <Card className="flex items-center justify-center border-2 border-dashed cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors min-h-64">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
              <Plus className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Create New Agent</p>
              <p className="text-xs text-muted-foreground mt-1">Build a custom AI employee for your organization</p>
            </div>
            <Button size="sm">
              <Bot className="size-4" />
              New Agent
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
