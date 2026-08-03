"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Zap, Bot, CheckCircle2, AlertTriangle, Play, Pause,
  Settings, TrendingUp, Clock, DollarSign, Users, Brain,
  MessageSquare, Mail, Phone, RefreshCw, Shield, Eye,
} from "lucide-react"

const AUTONOMOUS_TASKS = [
  {
    id: "1", name: "Daily Lead Follow-up Sweep", schedule: "Every day at 9:00 AM",
    lastRun: "Today 9:00 AM", status: "active", actions: 24, successRate: 96,
    description: "AI reviews all leads not contacted in 24h and sends personalized WhatsApp follow-ups.",
    impact: "+$34K pipeline",
  },
  {
    id: "2", name: "Invoice Chasing Sequence", schedule: "Daily — overdue accounts",
    lastRun: "Today 8:30 AM", status: "active", actions: 8, successRate: 91,
    description: "Sends escalating reminders via WhatsApp + Email for unpaid invoices.",
    impact: "+$12K collected",
  },
  {
    id: "3", name: "Hot Lead Instant Engagement", schedule: "Real-time trigger",
    lastRun: "2m ago", status: "active", actions: 142, successRate: 99,
    description: "When a lead score exceeds 80, AI immediately sends a personalized outreach.",
    impact: "+$89K influenced",
  },
  {
    id: "4", name: "Churn Prevention Monitor", schedule: "Every 6 hours",
    lastRun: "4h ago", status: "active", actions: 5, successRate: 88,
    description: "Monitors engagement drops and proactively contacts at-risk customers.",
    impact: "2 accounts retained",
  },
  {
    id: "5", name: "Contract Renewal Sequence", schedule: "30 days before expiry",
    lastRun: "Yesterday", status: "paused", actions: 12, successRate: 92,
    description: "Starts automated renewal campaign 30 days before contract end date.",
    impact: "$0 (paused)",
  },
  {
    id: "6", name: "Social Media Lead Capture", schedule: "Real-time",
    lastRun: "Draft", status: "draft", actions: 0, successRate: 0,
    description: "Monitor LinkedIn mentions and auto-create leads from social engagement.",
    impact: "—",
  },
]

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  active: { badge: "bg-green-100 text-green-700", dot: "bg-green-500 animate-pulse" },
  paused: { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  draft: { badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
}

const AUTONOMY_LEVELS = [
  { level: "Supervised", desc: "AI suggests — humans approve each action", icon: Eye },
  { level: "Semi-Auto", desc: "AI acts but notifies humans of each action", icon: RefreshCw },
  { level: "Full Auto", desc: "AI operates fully autonomously", icon: Zap },
]

export default function AutonomousPage() {
  const [autonomyLevel, setAutonomyLevel] = useState("Semi-Auto")
  const [masterSwitch, setMasterSwitch] = useState(true)

  const activeTasks = AUTONOMOUS_TASKS.filter((t) => t.status === "active").length
  const totalActions = AUTONOMOUS_TASKS.reduce((s, t) => s + t.actions, 0)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Autonomous Mode</h1>
          <p className="mt-1 text-sm text-muted-foreground">Set your AI agents to run on autopilot — follow up, engage, and close without manual intervention.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Master Switch</span>
          <button
            onClick={() => setMasterSwitch(!masterSwitch)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${masterSwitch ? "bg-green-500" : "bg-muted"}`}
          >
            <span className={`inline-block size-4 transform rounded-full bg-white shadow transition-transform ${masterSwitch ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <Badge className={masterSwitch ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
            {masterSwitch ? "Running" : "Paused"}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Active Tasks", value: activeTasks, icon: Zap },
          { label: "Actions Today", value: totalActions, icon: Bot },
          { label: "Revenue Influenced", value: "$135K", icon: DollarSign },
          { label: "Time Saved (30d)", value: "84h", icon: Clock },
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

      {/* Autonomy Level Selector */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            Autonomy Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {AUTONOMY_LEVELS.map((l) => (
              <button
                key={l.level}
                onClick={() => setAutonomyLevel(l.level)}
                className={`rounded-xl border-2 p-4 text-left transition-colors ${autonomyLevel === l.level ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <l.icon className={`size-5 ${autonomyLevel === l.level ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`font-semibold text-sm ${autonomyLevel === l.level ? "text-primary" : ""}`}>{l.level}</span>
                  {autonomyLevel === l.level && <Badge className="ml-auto bg-primary/10 text-primary text-xs">Active</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{l.desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Autonomous Tasks */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AUTONOMOUS_TASKS.map((task) => {
          const style = STATUS_STYLES[task.status]
          return (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${style.dot}`} />
                    <p className="font-semibold text-sm">{task.name}</p>
                  </div>
                  <Badge className={`text-xs shrink-0 ${style.badge}`}>{task.status}</Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{task.description}</p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {task.schedule}
                </div>

                {task.status !== "draft" && (
                  <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Actions</p>
                      <p className="font-semibold text-sm">{task.actions}</p>
                    </div>
                    <div className="border-x border-border">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className="font-semibold text-sm text-green-600">{task.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Impact</p>
                      <p className="font-semibold text-xs truncate">{task.impact}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Settings className="size-3.5" />Configure
                  </Button>
                  {task.status === "active" ? (
                    <Button variant="outline" size="sm" className="text-xs">
                      <Pause className="size-3.5" />
                    </Button>
                  ) : task.status === "paused" ? (
                    <Button size="sm" className="text-xs">
                      <Play className="size-3.5" />
                    </Button>
                  ) : (
                    <Button size="sm" className="text-xs">
                      <Zap className="size-3.5" />Launch
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
