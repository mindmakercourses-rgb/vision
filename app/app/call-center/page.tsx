"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone, Bot, User, Clock, Activity, Headphones,
  Radio, TrendingUp, PhoneCall, Users, Star, MessageSquare,
  Eye, Mic2, Volume2, ArrowRight,
} from "lucide-react"

const LIVE_AGENTS = [
  { id: "1", name: "Sara Mohamed", status: "on_call", callDuration: "4:21", customer: "Ahmed Hassan", queue: "Sales", sentiment: "positive", aiAssist: true },
  { id: "2", name: "Omar Khalil", status: "available", callDuration: null, customer: null, queue: "Support", sentiment: null, aiAssist: true },
  { id: "3", name: "Aya Mostafa", status: "after_call", callDuration: null, customer: null, queue: "Billing", sentiment: null, aiAssist: false },
  { id: "4", name: "Karim Hassan", status: "on_call", callDuration: "1:08", customer: "Khaled Mansour", queue: "Sales", sentiment: "neutral", aiAssist: true },
  { id: "5", name: "AI Agent 01", status: "on_call", callDuration: "2:45", customer: "Fatima Al-Rashid", queue: "Support", sentiment: "negative", aiAssist: false, isAI: true },
  { id: "6", name: "AI Agent 02", status: "on_call", callDuration: "0:52", customer: "Mohamed Ali", queue: "Sales", sentiment: "positive", aiAssist: false, isAI: true },
]

const QUEUES = [
  { name: "Sales", waiting: 2, agents: 3, avgWait: "1:24" },
  { name: "Support", waiting: 1, agents: 2, avgWait: "0:45" },
  { name: "Billing", waiting: 0, agents: 1, avgWait: "0:00" },
  { name: "VIP", waiting: 1, agents: 1, avgWait: "0:12" },
]

const STATUS_COLORS: Record<string, { dot: string; label: string; bg: string }> = {
  on_call: { dot: "bg-green-500", label: "On Call", bg: "bg-green-100 text-green-700" },
  available: { dot: "bg-blue-500", label: "Available", bg: "bg-blue-100 text-blue-700" },
  after_call: { dot: "bg-yellow-500", label: "After Call", bg: "bg-yellow-100 text-yellow-700" },
  break: { dot: "bg-gray-400", label: "Break", bg: "bg-gray-100 text-gray-600" },
  offline: { dot: "bg-gray-300", label: "Offline", bg: "bg-gray-100 text-gray-500" },
}

export default function CallCenterPage() {
  const stats = [
    { label: "Live Calls", value: LIVE_AGENTS.filter((a) => a.status === "on_call").length, icon: Radio, color: "text-green-500" },
    { label: "Available Agents", value: LIVE_AGENTS.filter((a) => a.status === "available").length, icon: Headphones, color: "text-blue-500" },
    { label: "Queue Total", value: QUEUES.reduce((s, q) => s + q.waiting, 0), icon: Users, color: "text-yellow-500" },
    { label: "AI Resolution", value: "84%", icon: Bot, color: "text-primary" },
    { label: "Calls Today", value: 112, icon: Phone, color: "text-muted-foreground" },
    { label: "Avg Handle Time", value: "3:45", icon: Clock, color: "text-muted-foreground" },
    { label: "CSAT Score", value: "4.8", icon: Star, color: "text-yellow-500" },
    { label: "FCR Rate", value: "78%", icon: TrendingUp, color: "text-green-500" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Call Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time monitoring and agent management console.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            Live Monitoring
          </Badge>
          <Button size="sm"><Activity className="size-4" />Reports</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <s.icon className={`size-5 mx-auto mb-1 ${s.color}`} />
              <p className="text-lg font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Agent Monitor */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Live Agent Monitor</CardTitle>
            <span className="text-xs text-muted-foreground">Auto-refresh every 5s</span>
          </CardHeader>
          <CardContent className="space-y-2">
            {LIVE_AGENTS.map((agent) => {
              const statusInfo = STATUS_COLORS[agent.status] ?? STATUS_COLORS.offline
              return (
                <div key={agent.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="relative shrink-0">
                    <div className={`flex size-9 items-center justify-center rounded-full font-semibold text-sm ${(agent as { isAI?: boolean }).isAI ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {(agent as { isAI?: boolean }).isAI ? <Bot className="size-5" /> : agent.name[0]}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${statusInfo.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{agent.name}</span>
                      <Badge className={`text-xs py-0 ${statusInfo.bg}`}>{statusInfo.label}</Badge>
                    </div>
                    {agent.customer && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {agent.customer} · {agent.queue} · {agent.callDuration}
                        {agent.sentiment && (
                          <span className={`ml-1.5 font-medium ${agent.sentiment === "positive" ? "text-green-600" : agent.sentiment === "negative" ? "text-red-500" : "text-muted-foreground"}`}>
                            ({agent.sentiment})
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {agent.status === "on_call" && (
                      <>
                        <button className="rounded-md p-1.5 hover:bg-muted" title="Listen"><Eye className="size-3.5 text-muted-foreground" /></button>
                        <button className="rounded-md p-1.5 hover:bg-muted" title="Whisper"><Mic2 className="size-3.5 text-muted-foreground" /></button>
                        <button className="rounded-md p-1.5 hover:bg-muted" title="Barge In"><Volume2 className="size-3.5 text-muted-foreground" /></button>
                      </>
                    )}
                    {agent.aiAssist && (
                      <span className="flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-1 text-xs text-primary font-medium">
                        <Bot className="size-3" />AI
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Queue Management */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Queue Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {QUEUES.map((queue) => (
                <div key={queue.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{queue.name}</p>
                    <p className="text-xs text-muted-foreground">{queue.agents} agents · Avg {queue.avgWait}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${queue.waiting > 0 ? "text-orange-500" : "text-green-500"}`}>{queue.waiting}</span>
                    <p className="text-xs text-muted-foreground">waiting</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Supervisor Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Listen to Live Call", icon: Eye },
                { label: "Whisper to Agent", icon: Mic2 },
                { label: "Barge Into Call", icon: Volume2 },
                { label: "Transfer Call", icon: ArrowRight },
                { label: "View Transcripts", icon: MessageSquare },
                { label: "QA & Coaching", icon: Star },
              ].map((tool) => (
                <button key={tool.label} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <div className="flex items-center gap-2">
                    <tool.icon className="size-4" />
                    {tool.label}
                  </div>
                  <PhoneCall className="size-3.5" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
