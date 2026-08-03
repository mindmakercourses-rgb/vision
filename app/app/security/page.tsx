"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield, CheckCircle2, AlertTriangle, Lock, Key, Eye, Users,
  Globe, Activity, FileText, Clock, XCircle, Settings,
  ShieldCheck, Fingerprint,
} from "lucide-react"

const COMPLIANCE = [
  { label: "SOC 2 Type II", status: "compliant", lastAudit: "Mar 2026", icon: ShieldCheck },
  { label: "ISO 27001", status: "compliant", lastAudit: "Jan 2026", icon: Shield },
  { label: "GDPR", status: "compliant", lastAudit: "Continuous", icon: FileText },
  { label: "PDPL (Saudi Arabia)", status: "in-review", lastAudit: "Jul 2026", icon: Globe },
]

const AUDIT_LOGS = [
  { user: "Sara M.", action: "Exported contact list (247 records)", time: "10:24 AM", ip: "10.0.1.42", risk: "low" },
  { user: "Admin", action: "Updated organization security settings", time: "9:15 AM", ip: "10.0.1.1", risk: "medium" },
  { user: "Omar K.", action: "Deleted 3 leads from pipeline", time: "Yesterday", ip: "10.0.1.55", risk: "medium" },
  { user: "Unknown", action: "Failed login attempt (5 times)", time: "Yesterday", ip: "185.220.101.x", risk: "high" },
  { user: "Sara M.", action: "Viewed contract documents for Smart Buildings", time: "2d ago", ip: "10.0.1.42", risk: "low" },
]

const RISK_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
}

const SECURITY_SETTINGS = [
  { label: "Two-Factor Authentication", desc: "Require 2FA for all team members", enabled: true },
  { label: "Single Sign-On (SSO)", desc: "SAML 2.0 / OIDC integration", enabled: false },
  { label: "IP Allowlisting", desc: "Restrict access to trusted IPs only", enabled: false },
  { label: "Session Timeout", desc: "Auto-logout after 8 hours inactivity", enabled: true },
  { label: "API Key Rotation", desc: "Force rotation every 90 days", enabled: true },
  { label: "Data Encryption at Rest", desc: "AES-256 encryption for all stored data", enabled: true },
  { label: "Audit Log Retention", desc: "Retain logs for 2 years", enabled: true },
  { label: "PII Masking in Logs", desc: "Redact sensitive data in all logs", enabled: true },
]

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Security & Compliance</h1>
          <p className="mt-1 text-sm text-muted-foreground">Platform security posture, compliance status, and audit trails.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileText className="size-4" />Security Report</Button>
          <Button><Settings className="size-4" />Configure</Button>
        </div>
      </div>

      {/* Security Score */}
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900">
        <CardContent className="flex items-center gap-6 p-5">
          <div className="flex size-16 items-center justify-center rounded-full border-4 border-green-400 bg-white dark:bg-background">
            <span className="text-xl font-bold text-green-600">94</span>
          </div>
          <div>
            <p className="font-semibold">Security Score: Excellent</p>
            <p className="text-sm text-muted-foreground mt-0.5">Your platform meets enterprise security standards. 2 minor recommendations available.</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">View Recommendations</Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {COMPLIANCE.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <c.icon className="size-5 text-muted-foreground" />
                <Badge className={c.status === "compliant" ? "bg-green-100 text-green-700 text-xs" : "bg-yellow-100 text-yellow-700 text-xs"}>
                  {c.status}
                </Badge>
              </div>
              <p className="font-semibold text-sm">{c.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Last audit: {c.lastAudit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Security Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="size-4 text-muted-foreground" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SECURITY_SETTINGS.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`size-2 rounded-full shrink-0 ${s.enabled ? "bg-green-500" : "bg-muted-foreground"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{s.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                  </div>
                </div>
                <button className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${s.enabled ? "bg-green-500" : "bg-muted"}`}>
                  <span className={`inline-block size-3.5 transform rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Fingerprint className="size-4 text-muted-foreground" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { user: "Sara M.", device: "Chrome · macOS", ip: "10.0.1.42", time: "Active now", current: true },
                { user: "Omar K.", device: "Safari · iPhone", ip: "10.0.1.55", time: "5m ago", current: false },
                { user: "Karim H.", device: "Chrome · Windows", ip: "10.0.1.88", time: "2h ago", current: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2.5 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      {s.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-xs">{s.user}</p>
                        {s.current && <Badge className="text-xs py-0 bg-green-100 text-green-700">You</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{s.device} · {s.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{s.time}</span>
                    {!s.current && <button className="text-xs text-red-500 hover:underline">Revoke</button>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Audit Log */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="size-4 text-muted-foreground" />
                Recent Audit Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {AUDIT_LOGS.map((log, i) => (
                <div key={i} className="rounded-lg border border-border p-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-semibold">{log.user}</span>
                        <Badge className={`text-xs py-0 ${RISK_COLORS[log.risk]}`}>{log.risk}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{log.action}</p>
                      <p className="text-muted-foreground mt-0.5">IP: {log.ip}</p>
                    </div>
                    <span className="text-muted-foreground shrink-0">{log.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full text-xs mt-2">View Full Audit Log</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
