"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Mail, Search, Plus, Bot, Star, Archive, Trash2, Reply,
  Forward, MoreHorizontal, Paperclip, Send, Tag, Inbox,
  AlertCircle, CheckCircle2, Clock, RefreshCw, Filter,
} from "lucide-react"

const EMAILS = [
  { id: "1", from: "ahmed.hassan@techcorp.eg", name: "Ahmed Hassan", subject: "Re: Vision CRM Enterprise Proposal", preview: "Thank you for the detailed proposal. We've reviewed it with our team and have a few questions...", time: "10:23 AM", read: false, starred: true, labels: ["Sales", "Hot"], aiSummary: "Client reviewed proposal, has questions about pricing and implementation timeline." },
  { id: "2", from: "support@smart.sa", name: "Smart Buildings Co", subject: "Technical Support Request — Dashboard Issue", preview: "Hello, we're experiencing an issue with the custom dashboard not loading data correctly after...", time: "9:15 AM", read: false, starred: false, labels: ["Support", "Urgent"], aiSummary: "Dashboard bug report. Customer data not loading. Priority: High." },
  { id: "3", from: "layla@digital.co", name: "Layla Ibrahim", subject: "Invoice #INV-2026-0892 Payment Confirmation", preview: "Please find attached the payment confirmation for invoice #INV-2026-0892 for the amount of...", time: "Yesterday", read: true, starred: false, labels: ["Billing"], aiSummary: "Payment received for $28,000. Invoice settled." },
  { id: "4", from: "m.ali@gulftrade.ae", name: "Mohamed Ali", subject: "Partnership Opportunity — Gulf Region Expansion", preview: "We are exploring expanding our CRM usage to all 3 Gulf offices. I wanted to discuss potential...", time: "Yesterday", read: true, starred: true, labels: ["Sales", "Opportunity"], aiSummary: "Expansion opportunity. 3 offices, ~150 additional users. High value prospect." },
  { id: "5", from: "hr@nilelogix.com", name: "Nile Logistics HR", subject: "New User Onboarding Request — 12 Sales Reps", preview: "We have 12 new sales representatives starting on September 1st and would like to set up their...", time: "Mon", read: true, starred: false, labels: ["Support"], aiSummary: "Onboarding request for 12 new users. Start date: Sep 1." },
]

const LABEL_COLORS: Record<string, string> = {
  Sales: "bg-blue-100 text-blue-700",
  Support: "bg-purple-100 text-purple-700",
  Billing: "bg-green-100 text-green-700",
  Urgent: "bg-red-100 text-red-700",
  Hot: "bg-orange-100 text-orange-700",
  Opportunity: "bg-yellow-100 text-yellow-700",
}

export default function EmailPage() {
  const [selected, setSelected] = useState(EMAILS[0])
  const [search, setSearch] = useState("")
  const [compose, setCompose] = useState(false)

  const filtered = EMAILS.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.subject.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: "Unread", value: EMAILS.filter((e) => !e.read).length, icon: Mail },
    { label: "AI Drafted", value: 18, icon: Bot },
    { label: "Response Rate", value: "94%", icon: CheckCircle2 },
    { label: "Avg. Response", value: "< 5m", icon: Clock },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Email AI Platform</h1>
          <p className="mt-1 text-sm text-muted-foreground">AI-powered email management and automation.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RefreshCw className="size-4" />Sync</Button>
          <Button onClick={() => setCompose(true)}><Plus className="size-4" />Compose</Button>
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

      <div className="flex gap-4 h-[560px]">
        {/* Sidebar */}
        <Card className="hidden lg:flex w-44 shrink-0 flex-col">
          <CardContent className="p-3 space-y-1">
            {[
              { label: "Inbox", icon: Inbox, count: 24 },
              { label: "Starred", icon: Star, count: 3 },
              { label: "Sent", icon: Send, count: 0 },
              { label: "Drafts", icon: Mail, count: 2 },
              { label: "Archive", icon: Archive, count: 0 },
              { label: "Spam", icon: AlertCircle, count: 1 },
              { label: "Trash", icon: Trash2, count: 0 },
            ].map((item) => (
              <button key={item.label} className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <div className="flex items-center gap-2">
                  <item.icon className="size-4" />
                  {item.label}
                </div>
                {item.count > 0 && <span className="text-xs font-semibold text-primary">{item.count}</span>}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Email List */}
        <Card className="w-80 shrink-0 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5">
                <Search className="size-3.5 text-muted-foreground shrink-0" />
                <input
                  placeholder="Search email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button className="rounded-md p-1.5 hover:bg-muted"><Filter className="size-4 text-muted-foreground" /></button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {filtered.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelected(email)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-border transition-colors hover:bg-muted/40 ${selected.id === email.id ? "bg-accent" : ""} ${!email.read ? "bg-primary/5" : ""}`}
              >
                <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {email.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-sm truncate ${!email.read ? "font-semibold" : "font-medium"}`}>{email.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{email.time}</span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${!email.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{email.subject}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{email.preview}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {email.labels.map((l) => (
                      <span key={l} className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${LABEL_COLORS[l] ?? "bg-muted text-muted-foreground"}`}>{l}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Email View */}
        <Card className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <button className="rounded-md p-1.5 hover:bg-muted"><Reply className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Forward className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Archive className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Trash2 className="size-4 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-muted"><Tag className="size-4 text-muted-foreground" /></button>
            </div>
            <button className="rounded-md p-1.5 hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">{selected.subject}</h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium">{selected.name}</p>
                  <p className="text-xs text-muted-foreground">{selected.from}</p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">{selected.time}</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <Bot className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary">AI Summary</p>
                <p className="text-sm text-muted-foreground mt-1">{selected.aiSummary}</p>
              </div>
            </div>

            {/* Email Body */}
            <div className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground">
              <p>{selected.preview}</p>
              <p className="mt-3">We would like to schedule a follow-up call to discuss this in more detail. Would next Tuesday at 2 PM work for you?</p>
              <p className="mt-3">Best regards,<br />{selected.name}</p>
            </div>

            {/* AI Reply Suggestion */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-primary" />
                <p className="text-xs font-semibold text-primary">AI Suggested Reply</p>
                <Badge variant="outline" className="text-xs">Confidence 91%</Badge>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                <p>Dear {selected.name.split(" ")[0]},</p>
                <p className="mt-2">Thank you for your email. I'd be happy to schedule a follow-up call. Tuesday at 2 PM works perfectly for our team. I'll send a calendar invite shortly.</p>
                <p className="mt-2">Looking forward to speaking with you.</p>
                <p className="mt-2">Best regards,<br />Vision CRM Team</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm"><Send className="size-4" />Send AI Reply</Button>
                <Button size="sm" variant="outline">Edit Before Sending</Button>
                <Button size="sm" variant="ghost">Regenerate</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
