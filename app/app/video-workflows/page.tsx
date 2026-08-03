"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Video, Plus, Play, Download, Clock, Sparkles, Bot,
  Users, Mail, MessageSquare, RefreshCw, Eye, Trash2,
  BarChart3, CheckCircle2,
} from "lucide-react"

const VIDEOS = [
  {
    id: "1", title: "Personalized Demo for TechCorp Egypt", type: "demo",
    status: "ready", duration: "3:24", created: "Today 10:30 AM",
    recipient: "Ahmed Hassan", views: 2, thumbnail: "TechCorp Demo",
  },
  {
    id: "2", title: "Product Feature Walkthrough — Q3 2026", type: "product",
    status: "ready", duration: "5:12", created: "Yesterday",
    recipient: "Broadcast", views: 48, thumbnail: "Features",
  },
  {
    id: "3", title: "AI-Personalized Proposal — Gulf Trading", type: "proposal",
    status: "generating", duration: "—", created: "In progress",
    recipient: "Mohamed Ali", views: 0, thumbnail: "Proposal",
  },
  {
    id: "4", title: "Onboarding Welcome — Nile Logistics", type: "onboarding",
    status: "ready", duration: "2:45", created: "3d ago",
    recipient: "Khaled Mansour", views: 12, thumbnail: "Welcome",
  },
]

const TYPE_COLORS: Record<string, string> = {
  demo: "bg-blue-100 text-blue-700",
  product: "bg-purple-100 text-purple-700",
  proposal: "bg-green-100 text-green-700",
  onboarding: "bg-orange-100 text-orange-700",
}

const TEMPLATES = [
  { name: "Personalized Demo", desc: "AI creates a custom demo video with the prospect's name, company, and use case.", icon: Play, popular: true },
  { name: "Proposal Walkthrough", desc: "Narrated video version of your proposal with dynamic pricing and features.", icon: Video },
  { name: "Welcome Onboarding", desc: "Personalized welcome video for new customers with their team details.", icon: Users },
  { name: "Product Update", desc: "Broadcast-style product announcement with key highlights.", icon: Sparkles },
  { name: "Renewal Reminder", desc: "Personalized video reminder for expiring contracts.", icon: Clock },
  { name: "Cold Outreach", desc: "AI-personalized intro video for cold lead sequences.", icon: Mail },
]

export default function VideoWorkflowsPage() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Video Generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create personalized AI-generated videos for sales, onboarding, and engagement.</p>
        </div>
        <Button><Plus className="size-4" />New Video</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Videos Created", value: VIDEOS.length, icon: Video },
          { label: "Total Views", value: VIDEOS.reduce((s, v) => s + v.views, 0), icon: Eye },
          { label: "Avg Duration", value: "3:47", icon: Clock },
          { label: "Response Rate", value: "+68%", icon: BarChart3 },
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

      {/* AI Generator */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            AI Video Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Recipient</label>
              <Input placeholder="Contact name or company..." />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Video Type</label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                <option>Personalized Demo</option>
                <option>Proposal Walkthrough</option>
                <option>Welcome Onboarding</option>
                <option>Cold Outreach</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">AI Voice</label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                <option>Sara (Professional Female)</option>
                <option>Omar (Professional Male)</option>
                <option>Custom Clone</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Key Message / Context</label>
            <textarea
              placeholder="Describe what this video should communicate... AI will personalize it for the recipient."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-h-20 resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 sm:flex-none">
              <Sparkles className="size-4" />
              Generate AI Video
            </Button>
            <Button variant="outline">Preview Script First</Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <div>
        <h2 className="text-base font-semibold mb-3">Video Templates</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button key={t.name} className="flex items-start gap-3 rounded-xl border border-border p-4 text-left hover:border-primary hover:bg-primary/5 transition-colors">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <t.icon className="size-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{t.name}</p>
                  {t.popular && <Badge className="bg-primary/10 text-primary text-xs">Popular</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Library */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Video Library</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Video</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Recipient</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Views</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Created</th>
                <th className="px-4 py-3 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {VIDEOS.map((v) => (
                <tr key={v.id} className="border-b border-border hover:bg-muted/40 cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-xs font-medium">
                        <Video className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm leading-tight">{v.title}</p>
                        {v.duration !== "—" && <p className="text-xs text-muted-foreground">{v.duration}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${TYPE_COLORS[v.type]}`}>{v.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.recipient}</td>
                  <td className="px-4 py-3">
                    {v.status === "generating" ? (
                      <div className="flex items-center gap-1.5 text-blue-600 text-xs font-medium">
                        <RefreshCw className="size-3.5 animate-spin" />Generating
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <CheckCircle2 className="size-3.5" />Ready
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.views}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{v.created}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="rounded p-1 hover:bg-muted"><Play className="size-3.5 text-muted-foreground" /></button>
                      <button className="rounded p-1 hover:bg-muted"><MessageSquare className="size-3.5 text-muted-foreground" /></button>
                      <button className="rounded p-1 hover:bg-muted"><Download className="size-3.5 text-muted-foreground" /></button>
                      <button className="rounded p-1 hover:bg-muted"><Trash2 className="size-3.5 text-muted-foreground" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
