"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PlayCircle,
  BarChart3,
  Activity,
  Lock,
  Zap,
  Bug,
  Clock,
  TrendingUp,
  Bot,
  FlaskConical,
  Layers,
  GitMerge,
  FileText,
} from "lucide-react"

const TEST_SUITES = [
  { name: "CRM Core — Regression", tests: 248, passed: 247, failed: 1, skipped: 0, duration: "4m 12s", status: "warning" },
  { name: "WhatsApp AI Integration", tests: 86, passed: 86, failed: 0, skipped: 0, duration: "1m 48s", status: "pass" },
  { name: "Authentication & RBAC", tests: 124, passed: 124, failed: 0, skipped: 0, duration: "2m 05s", status: "pass" },
  { name: "Workflow Engine", tests: 194, passed: 190, failed: 4, skipped: 0, duration: "6m 31s", status: "fail" },
  { name: "AI Quality & Safety", tests: 112, passed: 110, failed: 0, skipped: 2, duration: "3m 47s", status: "pass" },
  { name: "Performance — API Endpoints", tests: 56, passed: 56, failed: 0, skipped: 0, duration: "8m 22s", status: "pass" },
  { name: "Security — OWASP Top 10", tests: 78, passed: 78, failed: 0, skipped: 0, duration: "5m 14s", status: "pass" },
  { name: "Email AI Delivery", tests: 64, passed: 63, failed: 1, skipped: 0, duration: "2m 19s", status: "warning" },
]

const OPEN_BUGS = [
  { id: "BUG-2041", title: "Workflow triggers fire twice on deal stage change", severity: "high", status: "in-progress", assignee: "Omar K.", created: "2d ago" },
  { id: "BUG-2038", title: "Email AI attachment parsing fails on .docx files > 5MB", severity: "medium", status: "open", assignee: "Sara M.", created: "4d ago" },
  { id: "BUG-2033", title: "CRM contacts search returns stale results after bulk import", severity: "low", status: "open", assignee: "Ahmad H.", created: "6d ago" },
  { id: "BUG-2029", title: "RTL layout breaks on Analytics chart tooltips", severity: "medium", status: "review", assignee: "Layla N.", created: "8d ago" },
]

const READINESS = [
  { check: "All regression tests passed", done: false, critical: true },
  { check: "Security scan passed (OWASP)", done: true, critical: true },
  { check: "Performance benchmarks met", done: true, critical: true },
  { check: "AI quality validation passed", done: true, critical: true },
  { check: "Database migration validated", done: true, critical: true },
  { check: "Backup completed", done: true, critical: false },
  { check: "Rollback plan documented", done: true, critical: false },
  { check: "Release notes published", done: false, critical: false },
]

const STATUS_COLORS: Record<string, string> = {
  pass: "text-green-600 bg-green-100",
  fail: "text-red-600 bg-red-100",
  warning: "text-yellow-600 bg-yellow-100",
}

const SEV_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-blue-100 text-blue-700",
}

export default function QAPlatformPage() {
  const [activeTab, setActiveTab] = useState<"tests" | "bugs" | "readiness" | "ai">("tests")

  const totalTests = TEST_SUITES.reduce((s, t) => s + t.tests, 0)
  const totalPassed = TEST_SUITES.reduce((s, t) => s + t.passed, 0)
  const totalFailed = TEST_SUITES.reduce((s, t) => s + t.failed, 0)
  const passRate = Math.round((totalPassed / totalTests) * 100)

  const readinessPct = Math.round((READINESS.filter((r) => r.done).length / READINESS.length) * 100)
  const criticalBlocking = READINESS.filter((r) => r.critical && !r.done).length

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quality Assurance & Release Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enterprise testing, security validation, AI quality gates, and production release governance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><PlayCircle className="size-4" />Run All Tests</Button>
          <Button disabled={criticalBlocking > 0}><GitMerge className="size-4" />Deploy to Production</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Test Pass Rate", value: `${passRate}%`, icon: CheckCircle2, color: passRate > 97 ? "text-green-500" : "text-yellow-500" },
          { label: "Tests Run", value: totalTests.toLocaleString(), icon: FlaskConical, color: "text-blue-500" },
          { label: "Open Bugs", value: OPEN_BUGS.length, icon: Bug, color: "text-red-500" },
          { label: "Release Readiness", value: `${readinessPct}%`, icon: ShieldCheck, color: readinessPct === 100 ? "text-green-500" : "text-yellow-500" },
        ].map((s) => (
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

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1 w-fit">
        {(["tests", "bugs", "readiness", "ai"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {tab === "ai" ? "AI Quality" : tab === "readiness" ? "Release Readiness" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "tests" && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Test Suites</CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-700 border-0">{totalPassed} passed</Badge>
                {totalFailed > 0 && <Badge className="bg-red-100 text-red-600 border-0">{totalFailed} failed</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {TEST_SUITES.map((suite) => (
              <div key={suite.name} className="flex items-center gap-4 rounded-lg border border-border px-4 py-3">
                <div className={`flex size-7 shrink-0 items-center justify-center rounded-md ${STATUS_COLORS[suite.status]}`}>
                  {suite.status === "pass" ? <CheckCircle2 className="size-4" /> : suite.status === "fail" ? <XCircle className="size-4" /> : <AlertTriangle className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{suite.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="text-green-600">{suite.passed} pass</span>
                    {suite.failed > 0 && <span className="text-red-500">{suite.failed} fail</span>}
                    {suite.skipped > 0 && <span>{suite.skipped} skip</span>}
                    <span className="flex items-center gap-1"><Clock className="size-3" />{suite.duration}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 h-7 gap-1 text-xs"><PlayCircle className="size-3.5" />Re-run</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === "bugs" && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bug className="size-4" />Open Defects</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {OPEN_BUGS.map((b) => (
              <div key={b.id} className="flex items-start gap-3 rounded-lg border border-border px-4 py-3">
                <Badge className={`${SEV_COLORS[b.severity]} border-0 shrink-0 mt-0.5`}>{b.severity}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{b.id}</p>
                  <p className="text-xs text-muted-foreground truncate">{b.title}</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <Badge variant="outline" className="text-[10px]">{b.status}</Badge>
                  <p className="text-[10px] text-muted-foreground">{b.assignee} · {b.created}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === "readiness" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Production Readiness Checklist</CardTitle>
                <Badge className={criticalBlocking > 0 ? "bg-red-100 text-red-600 border-0" : "bg-green-100 text-green-700 border-0"}>
                  {criticalBlocking > 0 ? `${criticalBlocking} blocking` : "Ready"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {READINESS.map((r) => (
                <div key={r.check} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${r.critical && !r.done ? "border border-red-200 bg-red-50 dark:bg-red-950/20" : "border border-border"}`}>
                  {r.done ? <CheckCircle2 className="size-4 text-green-500 shrink-0" /> : <XCircle className="size-4 text-red-500 shrink-0" />}
                  <span className={r.done ? "text-muted-foreground" : "font-medium"}>{r.check}</span>
                  {r.critical && <Badge className="ml-auto text-[10px] bg-red-100 text-red-600 border-0">critical</Badge>}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Release v3.2.1 — Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Release Date", value: "Aug 5, 2026" },
                { label: "Type", value: "Minor Release" },
                { label: "Changes", value: "47 commits" },
                { label: "Affected Modules", value: "Workflows, Email AI" },
                { label: "Breaking Changes", value: "None" },
                { label: "Rollback Plan", value: "v3.2.0 snapshot ready" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full gap-2"><FileText className="size-4" />View Release Notes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              title: "AI Quality Metrics",
              icon: Bot,
              rows: [
                { label: "Prompt Injection Resistance", value: "98.4%", ok: true },
                { label: "Hallucination Rate", value: "1.2%", ok: true },
                { label: "Grounding Accuracy", value: "94.7%", ok: true },
                { label: "Response Quality Score", value: "4.6 / 5.0", ok: true },
                { label: "Avg Latency", value: "820ms", ok: true },
                { label: "Safety Policy Compliance", value: "100%", ok: true },
              ],
            },
            {
              title: "Security Test Results",
              icon: Lock,
              rows: [
                { label: "SQL Injection", value: "Passed", ok: true },
                { label: "XSS Protection", value: "Passed", ok: true },
                { label: "CSRF Tokens", value: "Passed", ok: true },
                { label: "Auth Bypass Tests", value: "Passed", ok: true },
                { label: "RBAC Validation", value: "Passed", ok: true },
                { label: "Secrets in Logs", value: "Passed", ok: true },
              ],
            },
          ].map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold"><section.icon className="size-4" />{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 text-sm">
                    <span className="text-xs text-muted-foreground">{r.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold">{r.value}</span>
                      {r.ok && <CheckCircle2 className="size-3.5 text-green-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
