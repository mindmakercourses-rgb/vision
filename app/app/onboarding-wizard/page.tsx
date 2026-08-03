"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2, Circle, ArrowRight, Building2, Users, MessageSquare,
  Bot, Workflow, BarChart3, CreditCard, Sparkles, ChevronRight, Globe,
} from "lucide-react"

const SETUP_STEPS = [
  {
    id: "org", label: "Organization Setup", icon: Building2, status: "done",
    desc: "Basic org info, branding, and timezone configured.",
    tasks: ["Company name set", "Industry selected", "Timezone configured", "Logo uploaded"],
    allDone: true,
  },
  {
    id: "team", label: "Invite Your Team", icon: Users, status: "done",
    desc: "Add teammates and assign roles.",
    tasks: ["Admin user created", "Team members invited", "Roles assigned"],
    allDone: true,
  },
  {
    id: "channels", label: "Connect Communication Channels", icon: MessageSquare, status: "in_progress",
    desc: "Connect WhatsApp, Email, and Voice to Vision CRM.",
    tasks: ["WhatsApp Business API connected", "Email inbox linked (Gmail / Outlook)", "Phone number provisioned"],
    doneCount: 1,
  },
  {
    id: "crm", label: "Import CRM Data", icon: Building2, status: "not_started",
    desc: "Import contacts, companies, and deals from your previous CRM.",
    tasks: ["Import contacts", "Import companies", "Import deals / pipeline"],
    doneCount: 0,
  },
  {
    id: "ai", label: "Train Your AI Agents", icon: Bot, status: "not_started",
    desc: "Configure AI agents with your business context and knowledge base.",
    tasks: ["Add knowledge base articles", "Configure AI agent persona", "Set AI boundaries and escalation rules"],
    doneCount: 0,
  },
  {
    id: "workflows", label: "Set Up Automation Workflows", icon: Workflow, status: "not_started",
    desc: "Activate lead qualification, follow-up, and onboarding workflows.",
    tasks: ["Activate lead qualification", "Set up follow-up sequences", "Configure escalation rules"],
    doneCount: 0,
  },
  {
    id: "analytics", label: "Configure Analytics", icon: BarChart3, status: "not_started",
    desc: "Set up dashboards, reports, and KPI targets.",
    tasks: ["Set revenue targets", "Configure dashboards", "Schedule weekly reports"],
    doneCount: 0,
  },
  {
    id: "billing", label: "Complete Billing Setup", icon: CreditCard, status: "not_started",
    desc: "Add payment method and confirm subscription.",
    tasks: ["Add payment method", "Confirm subscription plan", "Download first invoice"],
    doneCount: 0,
  },
]

const STATUS_STYLES: Record<string, { icon: React.ReactNode; badge: string }> = {
  done: {
    icon: <CheckCircle2 className="size-5 text-green-500" />,
    badge: "bg-green-100 text-green-700",
  },
  in_progress: {
    icon: <div className="size-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />,
    badge: "bg-blue-100 text-blue-700",
  },
  not_started: {
    icon: <Circle className="size-5 text-muted-foreground" />,
    badge: "bg-gray-100 text-gray-600",
  },
}

export default function OnboardingWizardPage() {
  const [expanded, setExpanded] = useState<string | null>("channels")

  const done = SETUP_STEPS.filter((s) => s.status === "done").length
  const total = SETUP_STEPS.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Setup Wizard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Complete the setup steps to get the most out of Vision CRM.</p>
        </div>
        <Badge variant="outline" className="text-sm py-1 px-3">{done}/{total} steps complete</Badge>
      </div>

      {/* Progress */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <p className="font-semibold">Getting Started with Vision CRM</p>
            </div>
            <span className="text-sm font-medium text-primary">{pct}% complete</span>
          </div>
          <div className="h-3 w-full rounded-full bg-primary/20 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {done === total ? "Setup complete! Your workspace is fully configured." : `${total - done} steps remaining. Estimated time: ${(total - done) * 5} minutes.`}
          </p>
        </CardContent>
      </Card>

      {/* Step List */}
      <div className="space-y-3">
        {SETUP_STEPS.map((step, index) => {
          const isExpanded = expanded === step.id
          const statusStyle = STATUS_STYLES[step.status]
          return (
            <Card
              key={step.id}
              className={`transition-all ${step.status === "in_progress" ? "border-primary/30 bg-primary/5" : ""}`}
            >
              <button
                className="w-full text-left"
                onClick={() => setExpanded(isExpanded ? null : step.id)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <step.icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{step.label}</span>
                      <Badge className={`text-xs ${statusStyle.badge}`}>
                        {step.status === "done" ? "Complete" : step.status === "in_progress" ? "In Progress" : "Not Started"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {statusStyle.icon}
                    <ChevronRight className={`size-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </CardContent>
              </button>

              {isExpanded && (
                <div className="border-t border-border px-4 pb-4 pt-3">
                  <div className="space-y-2 mb-4">
                    {step.tasks.map((task, i) => {
                      const isDone = step.status === "done" || (typeof step.doneCount === "number" && i < step.doneCount)
                      return (
                        <div key={task} className="flex items-center gap-2.5 text-sm">
                          {isDone ? (
                            <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                          ) : (
                            <Circle className="size-4 text-muted-foreground shrink-0" />
                          )}
                          <span className={isDone ? "text-muted-foreground line-through" : ""}>{task}</span>
                        </div>
                      )
                    })}
                  </div>
                  {step.status !== "done" && (
                    <Button size="sm">
                      {step.status === "in_progress" ? "Continue Setup" : "Start This Step"}
                      <ArrowRight className="size-4" />
                    </Button>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Help Banner */}
      <Card className="border-border">
        <CardContent className="flex items-center gap-4 p-4">
          <Globe className="size-6 text-muted-foreground shrink-0" />
          <div>
            <p className="font-medium text-sm">Need help getting started?</p>
            <p className="text-xs text-muted-foreground">Chat with our onboarding team or browse the documentation.</p>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">View Docs</Button>
            <Button size="sm">Chat With Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
