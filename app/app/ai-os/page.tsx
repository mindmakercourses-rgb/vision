"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain, Sparkles, Bot, Zap, MessageSquare, Phone, Mail,
  TrendingUp, Users, DollarSign, CheckCircle2, AlertTriangle,
  ArrowRight, Mic, MicOff, Send, Target, BarChart3,
  Activity, Command,
} from "lucide-react"

const QUICK_COMMANDS = [
  "Show me today's hot leads",
  "Summarize all missed calls",
  "Draft a follow-up for Ahmed Hassan",
  "What's the pipeline health?",
  "Run lead qualification workflow",
  "Show revenue vs target",
  "Who needs follow-up today?",
  "Generate weekly sales report",
]

const AI_STATUS = [
  { name: "Sara — Sales Agent", status: "active", conversations: 14, icon: MessageSquare, color: "bg-green-500" },
  { name: "Omar — Support Agent", status: "active", conversations: 22, icon: Users, color: "bg-green-500" },
  { name: "Lina — Billing Agent", status: "active", conversations: 5, icon: DollarSign, color: "bg-green-500" },
  { name: "Karim — CEO Assistant", status: "idle", conversations: 0, icon: Brain, color: "bg-yellow-500" },
]

const AUTONOMOUS_ACTIONS = [
  { action: "Sent follow-up WhatsApp to 12 hot leads", time: "2m ago", status: "done", impact: "High" },
  { action: "Qualified 3 new leads from web form", time: "5m ago", status: "done", impact: "Medium" },
  { action: "Created payment reminder task for 4 overdue accounts", time: "12m ago", status: "done", impact: "High" },
  { action: "Escalated Fatima Al-Rashid complaint to human agent", time: "18m ago", status: "done", impact: "Urgent" },
  { action: "Updated 8 deal stages based on conversation outcomes", time: "25m ago", status: "done", impact: "Medium" },
  { action: "Generated AI summary for 34 calls from today", time: "1h ago", status: "done", impact: "Low" },
]

const IMPACT_COLORS: Record<string, string> = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-gray-100 text-gray-600",
}

type Message = { from: "user" | "ai"; text: string }

const INITIAL_MESSAGES: Message[] = [
  { from: "ai", text: "Good morning! I'm your Vision AI Command Center. I have 6 insights ready for you:\n\n• 5 hot leads need follow-up within 48h\n• Revenue is tracking 18% above last month\n• AI agents handled 284 conversations today\n• Smart Buildings Co is showing churn risk\n\nWhat would you like to do first?" },
]

export default function AIOSPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [voiceMode, setVoiceMode] = useState(false)
  const [autonomousMode, setAutonomousMode] = useState(true)

  function sendMessage(text?: string) {
    const msg = text ?? input.trim()
    if (!msg) return
    setMessages((prev) => [
      ...prev,
      { from: "user", text: msg },
      { from: "ai", text: `Processing your request: "${msg}"\n\nI've analyzed your CRM data and found 5 relevant contacts matching this query. I've also initiated the necessary workflows and will provide a full report in 30 seconds.` },
    ])
    setInput("")
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Command Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your AI operating system — command, automate, and analyze everything from one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
            <Zap className={`size-4 ${autonomousMode ? "text-green-500" : "text-muted-foreground"}`} />
            <span className="text-sm font-medium">Autonomous Mode</span>
            <button
              onClick={() => setAutonomousMode(!autonomousMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autonomousMode ? "bg-green-500" : "bg-muted"}`}
            >
              <span className={`inline-block size-3.5 transform rounded-full bg-white shadow transition-transform ${autonomousMode ? "translate-x-5" : "translate-x-1"}`} />
            </button>
          </div>
          <Badge className={autonomousMode ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
            {autonomousMode ? "Active" : "Paused"}
          </Badge>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "AI Decisions Today", value: "127", icon: Brain },
          { label: "Actions Automated", value: "84", icon: Zap },
          { label: "Revenue Influenced", value: "$48K", icon: DollarSign },
          { label: "Time Saved", value: "6.4h", icon: Activity },
        ].map((s) => (
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Chat Interface */}
        <Card className="lg:col-span-2 flex flex-col" style={{ height: "580px" }}>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-sm">Vision AI</CardTitle>
                  <p className="text-xs text-muted-foreground">GPT-4o · Thinking…</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </CardHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "ai" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground mt-0.5">
                    <Sparkles className="size-4" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.from === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Command Pills */}
          <div className="border-t border-border px-4 py-2">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {QUICK_COMMANDS.slice(0, 4).map((cmd) => (
                <button key={cmd} onClick={() => sendMessage(cmd)} className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted hover:border-primary transition-colors whitespace-nowrap">
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceMode(!voiceMode)}
                className={`flex size-9 items-center justify-center rounded-lg border transition-colors ${voiceMode ? "border-red-500 bg-red-500/10 text-red-500" : "border-border hover:bg-muted text-muted-foreground"}`}
              >
                {voiceMode ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) sendMessage() }}
                placeholder="Ask AI anything about your business…"
                className="flex-1 rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button size="sm" onClick={() => sendMessage()}>
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* AI Agents Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bot className="size-4 text-muted-foreground" />
                Agent Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {AI_STATUS.map((agent) => (
                <div key={agent.name} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <agent.icon className="size-4" />
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${agent.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.conversations} active chats</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${agent.status === "active" ? "border-green-300 text-green-700" : ""}`}>
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Autonomous Actions Feed */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="size-4 text-muted-foreground" />
                Autonomous Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {AUTONOMOUS_ACTIONS.map((a, i) => (
                <div key={i} className="flex gap-2 rounded-lg bg-muted/40 p-2.5">
                  <CheckCircle2 className="size-3.5 text-green-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                      <Badge className={`text-xs py-0 ${IMPACT_COLORS[a.impact]}`}>{a.impact}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
