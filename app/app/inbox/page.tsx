"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Inbox, MessageSquare, Mail, Phone, Search, Filter, Bot,
  User, Clock, Star, Archive, Tag, MoreHorizontal, RefreshCw,
  Globe, Send, Zap, ChevronDown,
} from "lucide-react"

const ALL_CONVERSATIONS = [
  { id: "1", channel: "whatsapp", name: "Ahmed Hassan", subject: "Enterprise CRM inquiry", preview: "When can we schedule a demo?", time: "2m ago", unread: 2, status: "ai", priority: "high", assigned: "AI Agent" },
  { id: "2", channel: "email", name: "Layla Ibrahim", subject: "Re: Proposal Review", preview: "Thank you for the detailed proposal…", time: "15m ago", unread: 0, status: "human", priority: "normal", assigned: "Sara M." },
  { id: "3", channel: "voice", name: "Khaled Mansour", subject: "Missed Call → Callback", preview: "Requested callback for contract discussion", time: "22m ago", unread: 1, status: "pending", priority: "high", assigned: "Omar K." },
  { id: "4", channel: "whatsapp", name: "Fatima Al-Rashid", subject: "Billing complaint", preview: "Please call me back urgently", time: "1h ago", unread: 3, status: "escalated", priority: "urgent", assigned: "Support Team" },
  { id: "5", channel: "email", name: "Mohamed Ali", subject: "Partnership Opportunity", preview: "We are exploring expanding our CRM…", time: "2h ago", unread: 0, status: "ai", priority: "normal", assigned: "AI Agent" },
  { id: "6", channel: "chat", name: "Nour El-Din", subject: "Live Chat Session", preview: "I need help with the dashboard setup", time: "3h ago", unread: 0, status: "resolved", priority: "normal", assigned: "Sara M." },
  { id: "7", channel: "whatsapp", name: "Smart Buildings Co", subject: "Support request", preview: "The workflow isn't triggering on new leads", time: "5h ago", unread: 0, status: "resolved", priority: "normal", assigned: "AI Agent" },
]

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  whatsapp: <MessageSquare className="size-3.5 text-green-500" />,
  email: <Mail className="size-3.5 text-blue-500" />,
  voice: <Phone className="size-3.5 text-purple-500" />,
  chat: <Globe className="size-3.5 text-orange-500" />,
}

const CHANNEL_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  voice: "Voice",
  chat: "Live Chat",
}

const STATUS_COLORS: Record<string, string> = {
  ai: "bg-blue-100 text-blue-700",
  human: "bg-green-100 text-green-700",
  escalated: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  resolved: "bg-gray-100 text-gray-600",
}

const PRIORITY_COLORS: Record<string, string> = {
  urgent: "text-red-500",
  high: "text-orange-500",
  normal: "text-muted-foreground",
}

const FILTERS = ["All", "WhatsApp", "Email", "Voice", "Chat", "Unread", "Assigned to Me", "Escalated"]

export default function InboxPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [selected, setSelected] = useState(ALL_CONVERSATIONS[0])

  const filtered = ALL_CONVERSATIONS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "WhatsApp" && c.channel === "whatsapp") ||
      (activeFilter === "Email" && c.channel === "email") ||
      (activeFilter === "Voice" && c.channel === "voice") ||
      (activeFilter === "Chat" && c.channel === "chat") ||
      (activeFilter === "Unread" && c.unread > 0) ||
      (activeFilter === "Escalated" && c.status === "escalated")
    return matchSearch && matchFilter
  })

  const stats = [
    { label: "Open", value: ALL_CONVERSATIONS.filter((c) => c.status !== "resolved").length, icon: Inbox },
    { label: "AI Handling", value: ALL_CONVERSATIONS.filter((c) => c.status === "ai").length, icon: Bot },
    { label: "Escalated", value: ALL_CONVERSATIONS.filter((c) => c.status === "escalated").length, icon: Zap },
    { label: "Resolved Today", value: 34, icon: RefreshCw },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Omnichannel Unified Inbox</h1>
          <p className="mt-1 text-sm text-muted-foreground">All customer conversations in one intelligent workspace.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="size-4" />Filters</Button>
          <Button variant="outline" size="sm"><RefreshCw className="size-4" />Refresh</Button>
          <Button size="sm"><Send className="size-4" />New Message</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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

      {/* Channel filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex gap-4 h-[520px]">
        {/* Conversation List */}
        <Card className="w-96 shrink-0 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5">
                <Search className="size-3.5 text-muted-foreground shrink-0" />
                <input
                  placeholder="Search all conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {filtered.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-border transition-colors hover:bg-muted/40 ${selected.id === conv.id ? "bg-accent" : ""}`}
              >
                <div className="relative mt-0.5 shrink-0">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {conv.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-card border border-border">
                    {CHANNEL_ICONS[conv.channel]}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`text-sm font-medium truncate ${conv.unread > 0 ? "font-semibold" : ""}`}>{conv.name}</span>
                      <span className={`shrink-0 text-xs font-semibold ${PRIORITY_COLORS[conv.priority]}`}>
                        {conv.priority === "urgent" ? "!!!" : conv.priority === "high" ? "!" : ""}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs font-medium truncate">{conv.subject}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge className={`text-xs py-0 ${STATUS_COLORS[conv.status]}`}>{conv.status}</Badge>
                      <span className="text-xs text-muted-foreground">{conv.assigned}</span>
                    </div>
                    {conv.unread > 0 && (
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Conversation Detail */}
        <Card className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{selected.name}</p>
                  {CHANNEL_ICONS[selected.channel]}
                  <span className="text-xs text-muted-foreground">{CHANNEL_LABELS[selected.channel]}</span>
                </div>
                <p className="text-xs text-muted-foreground">{selected.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge className={STATUS_COLORS[selected.status]}>{selected.status}</Badge>
              <button className="rounded-md p-1.5 hover:bg-muted"><Star className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Tag className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Archive className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Unified Timeline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <span>Today</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Channel event */}
              <div className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100 mt-0.5">
                  <MessageSquare className="size-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">WhatsApp · 10:22 AM</p>
                  <div className="mt-1 rounded-xl bg-muted p-3 text-sm">{selected.preview}</div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="max-w-xs">
                    <p className="text-xs text-muted-foreground text-right">AI Agent · 10:22 AM</p>
                    <div className="mt-1 rounded-xl bg-primary text-primary-foreground p-3 text-sm">
                      Hello! Thank you for reaching out. I&apos;d be happy to schedule a demo for your team. What time works best for you?
                    </div>
                  </div>
                </div>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Bot className="size-4 text-primary" />
                </div>
              </div>

              {/* AI Summary card */}
              <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                <Bot className="size-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-primary text-xs">AI Memory Updated</p>
                  <p className="text-muted-foreground mt-0.5">Customer intent: Demo request. Lead stage updated to Qualified. Task created: Follow-up demo scheduling.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reply Bar */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <button className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted">
                {CHANNEL_ICONS[selected.channel]} Reply via {CHANNEL_LABELS[selected.channel]}
                <ChevronDown className="size-3" />
              </button>
              <button className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20">
                <Bot className="size-3" /> Use AI Reply
              </button>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type a reply…" className="flex-1" />
              <Button size="sm"><Send className="size-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
