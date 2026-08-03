"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MessageSquare, Search, Send, Bot, User, Phone, Clock, CheckCheck,
  Check, MoreVertical, Paperclip, Smile, Mic, RefreshCw, Star, Archive,
  Filter, Plus, Image as ImageIcon, FileText, Settings,
} from "lucide-react"

const CONVERSATIONS = [
  { id: "1", name: "Ahmed Hassan", phone: "+20 100 123 4567", lastMessage: "When can we schedule a demo?", time: "2m ago", unread: 2, status: "ai", sentiment: "interested", avatar: "A" },
  { id: "2", name: "Layla Ibrahim", phone: "+20 112 987 6543", lastMessage: "Thank you for the quick response!", time: "15m ago", unread: 0, status: "human", sentiment: "positive", avatar: "L" },
  { id: "3", name: "Mohamed Ali", phone: "+971 50 123 4567", lastMessage: "I need more details about pricing", time: "1h ago", unread: 1, status: "ai", sentiment: "neutral", avatar: "M" },
  { id: "4", name: "Fatima Al-Rashid", phone: "+966 55 111 2233", lastMessage: "Please call me back urgently", time: "2h ago", unread: 3, status: "escalated", sentiment: "urgent", avatar: "F" },
  { id: "5", name: "Khaled Mansour", phone: "+20 100 555 7788", lastMessage: "Deal confirmed! Let's proceed.", time: "3h ago", unread: 0, status: "human", sentiment: "positive", avatar: "K" },
]

const MESSAGES = [
  { id: "1", from: "customer", text: "Hello, I'm interested in your CRM platform.", time: "10:22 AM", status: "read" },
  { id: "2", from: "ai", text: "Hello Ahmed! Thank you for reaching out to Vision CRM. I'm your AI assistant. I'd be happy to tell you about our platform. What specific features are you most interested in?", time: "10:22 AM", status: "read" },
  { id: "3", from: "customer", text: "We need a solution for managing our sales team of 50 people and automating follow-ups.", time: "10:24 AM", status: "read" },
  { id: "4", from: "ai", text: "That's a great use case! Vision CRM handles teams of all sizes with:\n• AI-powered lead scoring\n• Automated follow-up workflows\n• Team performance dashboards\n• WhatsApp & Email integration\n\nWould you like me to schedule a live demo for your team?", time: "10:25 AM", status: "read" },
  { id: "5", from: "customer", text: "When can we schedule a demo?", time: "10:28 AM", status: "delivered" },
]

const STATUS_COLORS: Record<string, string> = {
  ai: "bg-blue-100 text-blue-700",
  human: "bg-green-100 text-green-700",
  escalated: "bg-red-100 text-red-700",
  resolved: "bg-gray-100 text-gray-600",
}

const SENTIMENT_COLORS: Record<string, string> = {
  positive: "text-green-500",
  interested: "text-blue-500",
  neutral: "text-gray-400",
  urgent: "text-red-500",
  negative: "text-red-400",
}

export default function WhatsAppPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0])
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  const filtered = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: "Active Chats", value: 47, sub: "+8 today" },
    { label: "AI Handled", value: "84%", sub: "Resolution rate" },
    { label: "Avg Response", value: "< 2s", sub: "AI response time" },
    { label: "Human Queue", value: 3, sub: "Waiting agents" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">WhatsApp AI Platform</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage AI-powered WhatsApp conversations at scale.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Settings className="size-4" />Configure</Button>
          <Button size="sm"><Plus className="size-4" />New Broadcast</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 h-[580px]">
        {/* Conversation List */}
        <Card className="w-80 shrink-0 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5">
                <Search className="size-3.5 text-muted-foreground shrink-0" />
                <input
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button className="rounded-md p-1.5 hover:bg-muted"><Filter className="size-4 text-muted-foreground" /></button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {filtered.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-border hover:bg-muted/40 ${selected.id === conv.id ? "bg-accent" : ""}`}
              >
                <div className="relative shrink-0">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {conv.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${conv.status === "ai" ? "bg-blue-500" : conv.status === "escalated" ? "bg-red-500" : "bg-green-500"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-medium truncate">{conv.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground mt-0.5">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge className={`text-xs py-0 ${STATUS_COLORS[conv.status]}`}>{conv.status}</Badge>
                    {conv.unread > 0 && (
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-1 flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {selected.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={STATUS_COLORS[selected.status]}>{selected.status} mode</Badge>
              <Button variant="outline" size="sm" className="text-xs">
                <RefreshCw className="size-3.5" />
                Handoff
              </Button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Phone className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Star className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Archive className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><MoreVertical className="size-4 text-muted-foreground" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.from === "customer" ? "justify-start" : "justify-end"}`}>
                {msg.from !== "customer" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-1">
                    <Bot className="size-3.5 text-primary" />
                  </div>
                )}
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${msg.from === "customer" ? "bg-muted rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"}`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs ${msg.from === "customer" ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                    <span>{msg.time}</span>
                    {msg.from !== "customer" && (
                      msg.status === "read" ? <CheckCheck className="size-3" /> : <Check className="size-3" />
                    )}
                  </div>
                </div>
                {msg.from === "customer" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted mt-1">
                    <User className="size-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Suggestion Bar */}
          <div className="border-t border-border bg-accent/30 px-4 py-2">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground flex-1">AI Suggestion: <span className="text-foreground font-medium">"I can schedule a demo for you. What time works best — tomorrow morning or afternoon?"</span></p>
              <button className="text-xs font-medium text-primary hover:underline shrink-0">Use</button>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-end gap-2">
              <div className="flex gap-1">
                <button className="rounded-md p-2 hover:bg-muted"><Paperclip className="size-4 text-muted-foreground" /></button>
                <button className="rounded-md p-2 hover:bg-muted"><ImageIcon className="size-4 text-muted-foreground" /></button>
                <button className="rounded-md p-2 hover:bg-muted"><FileText className="size-4 text-muted-foreground" /></button>
              </div>
              <div className="flex-1 rounded-xl border border-border bg-muted/30 px-3 py-2">
                <input
                  placeholder="Type a message or let AI reply..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button className="rounded-md p-2 hover:bg-muted"><Smile className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-2 hover:bg-muted"><Mic className="size-4 text-muted-foreground" /></button>
              <Button size="sm" className="shrink-0">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Panel — Contact Info */}
        <Card className="hidden xl:flex w-64 shrink-0 flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4 text-sm">
            <div className="text-center py-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                {selected.avatar}
              </div>
              <p className="mt-2 font-semibold">{selected.name}</p>
              <p className="text-xs text-muted-foreground">{selected.phone}</p>
              <Badge className={`mt-2 ${SENTIMENT_COLORS[selected.sentiment] ? "" : ""}`}>{selected.sentiment}</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-medium text-muted-foreground uppercase tracking-wider">CRM Status</p>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span className="text-muted-foreground">Stage</span><span className="font-medium">Qualified</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Score</span><span className="font-medium">92/100</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Value</span><span className="font-medium">$45,000</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Owner</span><span className="font-medium">Sara M.</span></div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-medium text-muted-foreground uppercase tracking-wider">AI Memory</p>
              <p className="text-muted-foreground leading-relaxed">Interested in enterprise plan. Needs demo. Has 50-person sales team. Evaluating competitors.</p>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</p>
              <div className="space-y-1">
                {["Create Lead", "Schedule Demo", "Send Proposal", "Assign Agent"].map((action) => (
                  <button key={action} className="w-full rounded-md border border-border px-3 py-1.5 text-left hover:bg-muted transition-colors">{action}</button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
