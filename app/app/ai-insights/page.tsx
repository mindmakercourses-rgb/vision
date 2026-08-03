"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  Bot, DollarSign, Users, Zap, BarChart3, ArrowRight, RefreshCw,
  Lightbulb, Target, Clock,
} from "lucide-react"

const INSIGHTS = [
  {
    id: "1", type: "opportunity", priority: "high",
    title: "5 Hot Leads Have Not Been Contacted in 7 Days",
    description: "Ahmed Hassan, Khaled Mansour, and 3 others with lead scores above 85 have not received a follow-up in over a week. AI predicts 34% conversion drop if not contacted within 48 hours.",
    impact: "+$245,000 potential revenue",
    action: "Assign & Follow Up Now",
    icon: Target, color: "text-orange-500", bg: "bg-orange-50 border-orange-200",
  },
  {
    id: "2", type: "alert", priority: "urgent",
    title: "Revenue 18% Below Monthly Target",
    description: "Current MRR is tracking $42,000 below the $230,000 monthly target. The Sales pipeline has enough deals to cover this gap if the proposal stage deals progress to contract.",
    impact: "Target gap: $42,000",
    action: "View Pipeline",
    icon: TrendingDown, color: "text-red-500", bg: "bg-red-50 border-red-200",
  },
  {
    id: "3", type: "recommendation", priority: "medium",
    title: "AI Agent Confidence Threshold is Too Conservative",
    description: "Sara AI Agent is escalating 24% of conversations to human agents due to a 90% confidence threshold. Reducing it to 80% would resolve 140+ additional monthly conversations without quality loss.",
    impact: "Save ~12 agent-hours/month",
    action: "Adjust Settings",
    icon: Bot, color: "text-blue-500", bg: "bg-blue-50 border-blue-200",
  },
  {
    id: "4", type: "positive", priority: "info",
    title: "Customer Satisfaction Up 12% This Month",
    description: "Average CSAT score improved from 4.2 to 4.7 following the deployment of the Omar Support Agent and the new Knowledge Base articles. WhatsApp response times improved by 64%.",
    impact: "+12% CSAT improvement",
    action: "View Report",
    icon: TrendingUp, color: "text-green-500", bg: "bg-green-50 border-green-200",
  },
  {
    id: "5", type: "recommendation", priority: "medium",
    title: "Smart Buildings Co is At Churn Risk",
    description: "Engagement score dropped from 82 to 51 over the past 30 days. Last login was 14 days ago. Recommend proactive outreach with a personalized retention offer.",
    impact: "Account value: $750,000",
    action: "Create Retention Campaign",
    icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 border-yellow-200",
  },
  {
    id: "6", type: "opportunity", priority: "high",
    title: "3 Customers Ready for Upsell",
    description: "Usage data shows TechCorp, Nile Logistics, and Gulf Trading are consistently hitting their plan limits. Upgrading them to the Business plan would generate $18,000 additional MRR.",
    impact: "+$18,000 MRR",
    action: "Start Upsell Campaign",
    icon: DollarSign, color: "text-primary", bg: "bg-primary/5 border-primary/20",
  },
]

const PRIORITY_ICONS: Record<string, React.ReactNode> = {
  urgent: <AlertTriangle className="size-3.5 text-red-500" />,
  high: <Zap className="size-3.5 text-orange-500" />,
  medium: <Lightbulb className="size-3.5 text-yellow-500" />,
  info: <CheckCircle2 className="size-3.5 text-green-500" />,
}

const TYPE_LABELS: Record<string, string> = {
  opportunity: "Opportunity",
  alert: "Alert",
  recommendation: "Recommendation",
  positive: "Achievement",
}

export default function AIInsightsPage() {
  const stats = [
    { label: "Active Insights", value: INSIGHTS.length, icon: Sparkles, color: "text-primary" },
    { label: "Revenue at Risk", value: "$42K", icon: TrendingDown, color: "text-red-500" },
    { label: "Revenue Opportunity", value: "$263K", icon: TrendingUp, color: "text-green-500" },
    { label: "Churn Risks", value: 2, icon: AlertTriangle, color: "text-yellow-500" },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Insights</h1>
          <p className="mt-1 text-sm text-muted-foreground">AI-powered recommendations, alerts, and opportunities.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RefreshCw className="size-4" />Refresh</Button>
          <Button size="sm"><BarChart3 className="size-4" />Full Analytics</Button>
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
              <s.icon className={`size-5 ${s.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Natural Language Query Box */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <Bot className="size-6 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">Ask AI Anything</p>
            <p className="text-xs text-muted-foreground mt-0.5">Try: &quot;Why did revenue drop this month?&quot; or &quot;Which customers are at risk?&quot;</p>
          </div>
          <div className="flex-1 max-w-sm">
            <input
              placeholder="Ask a business question..."
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button size="sm">
            <Sparkles className="size-4" />
            Ask AI
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {INSIGHTS.map((insight) => (
          <Card key={insight.id} className={`border ${insight.bg}`}>
            <CardContent className="flex gap-4 p-5">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${insight.bg}`}>
                <insight.icon className={`size-5 ${insight.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{insight.title}</span>
                  {PRIORITY_ICONS[insight.priority]}
                  <Badge variant="outline" className="text-xs">{TYPE_LABELS[insight.type]}</Badge>
                  <Badge variant="outline" className="text-xs capitalize">{insight.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="size-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{insight.impact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="text-xs h-7">
                      {insight.action}
                      <ArrowRight className="size-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs h-7">Dismiss</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
