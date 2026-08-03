"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  Camera,
  Mic,
  MapPin,
  Shield,
  RefreshCw,
  Download,
  CheckCircle2,
  Clock,
  Tablet,
  Monitor,
  Battery,
  Lock,
  Fingerprint,
  Scan,
  Navigation,
  Bot,
  CloudOff,
  Layers,
} from "lucide-react"

const REGISTERED_DEVICES = [
  { name: "iPhone 15 Pro", os: "iOS 17.4", user: "Ahmad Hassan", lastSync: "2m ago", status: "online", version: "3.2.1", push: true },
  { name: "Samsung Galaxy S24", os: "Android 14", user: "Sara Mohamed", lastSync: "8m ago", status: "online", version: "3.2.1", push: true },
  { name: "iPad Air M2", os: "iPadOS 17.4", user: "Omar Khalil", lastSync: "1h ago", status: "offline", version: "3.1.0", push: false },
  { name: "MacBook Pro 16\"", os: "macOS 14.3", user: "Layla Nasser", lastSync: "5m ago", status: "online", version: "3.2.1", push: true },
]

const PWA_FEATURES = [
  { name: "Install Prompt", enabled: true },
  { name: "Offline Access", enabled: true },
  { name: "Background Sync", enabled: true },
  { name: "Push Notifications", enabled: true },
  { name: "App Shortcuts", enabled: true },
  { name: "Splash Screen", enabled: true },
  { name: "App Manifest", enabled: true },
  { name: "Service Worker", enabled: true },
  { name: "Automatic Updates", enabled: true },
]

const OFFLINE_MODULES = [
  "Contacts", "Companies", "Leads", "Deals", "Tasks",
  "Meetings", "Calendar", "Notes", "Knowledge Base Cache", "Personal Dashboard",
]

const MOBILE_CAPABILITIES = [
  { icon: Camera, label: "Business Card Scanner", desc: "OCR-powered card scanning" },
  { icon: Mic, label: "Voice Notes & Transcription", desc: "Offline recording, auto sync" },
  { icon: Scan, label: "QR & Barcode Scanner", desc: "Scan to link records instantly" },
  { icon: MapPin, label: "GPS Check-In & Tracking", desc: "Field sales visit logging" },
  { icon: Navigation, label: "Route Planning", desc: "Nearby customer routing" },
  { icon: Bot, label: "Offline AI Assistant", desc: "Local knowledge search" },
]

export default function MobilePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mobile Platform & PWA</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enterprise mobility with offline capabilities, push notifications, and device management.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="size-4" />Download App</Button>
          <Button><Bell className="size-4" />Send Push Notification</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Registered Devices", value: "4", icon: Smartphone, color: "text-blue-500" },
          { label: "Online Now", value: "3", icon: Wifi, color: "text-green-500" },
          { label: "Push Enabled", value: "3", icon: Bell, color: "text-purple-500" },
          { label: "PWA Installs", value: "47", icon: Download, color: "text-orange-500" },
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* PWA Status */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Layers className="size-4" />Progressive Web App — Feature Status</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PWA_FEATURES.map((f) => (
                  <div key={f.name} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs">
                    <CheckCircle2 className="size-3.5 shrink-0 text-green-500" />
                    <span className="font-medium">{f.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Offline Modules */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><CloudOff className="size-4" />Offline Mode — Available Modules</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {OFFLINE_MODULES.map((m) => (
                  <div key={m} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium">
                    <CheckCircle2 className="size-3 text-green-500" />{m}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                <strong className="text-foreground">Background Sync</strong> — When connectivity returns, all offline changes (contacts, notes, deals) are automatically synced with conflict detection and merge resolution.
              </div>
            </CardContent>
          </Card>

          {/* Mobile Capabilities */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Mobile CRM Capabilities</CardTitle></CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {MOBILE_CAPABILITIES.map((c) => (
                <div key={c.label} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <c.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Registered Devices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">Registered Devices</CardTitle>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-xs"><RefreshCw className="size-3.5" />Sync All</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {REGISTERED_DEVICES.map((d) => (
                <div key={d.name} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${d.status === "online" ? "bg-green-100" : "bg-muted"}`}>
                    {d.os.includes("iPad") ? <Tablet className={`size-4 ${d.status === "online" ? "text-green-600" : "text-muted-foreground"}`} />
                      : d.os.includes("macOS") ? <Monitor className={`size-4 ${d.status === "online" ? "text-green-600" : "text-muted-foreground"}`} />
                        : <Smartphone className={`size-4 ${d.status === "online" ? "text-green-600" : "text-muted-foreground"}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.user} · {d.os} · v{d.version}</p>
                  </div>
                  <div className="text-right shrink-0 space-y-0.5">
                    <div className="flex items-center justify-end gap-1">
                      {d.status === "online" ? <Wifi className="size-3.5 text-green-500" /> : <WifiOff className="size-3.5 text-muted-foreground" />}
                      <Badge className={`text-[10px] h-4 px-1 border-0 ${d.status === "online" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{d.status}</Badge>
                    </div>
                    <p className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end"><Clock className="size-3" />{d.lastSync}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Security */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Shield className="size-4" />Mobile Security</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: Lock, label: "Encrypted Local Storage", enabled: true },
                { icon: Fingerprint, label: "Biometric Login", enabled: true },
                { icon: Shield, label: "PIN Lock", enabled: true },
                { icon: Smartphone, label: "Device Registration", enabled: true },
                { icon: WifiOff, label: "Remote Logout", enabled: true },
                { icon: Battery, label: "Remote Device Wipe", enabled: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="size-4 shrink-0" />{s.label}
                  </div>
                  <CheckCircle2 className="size-4 text-green-500" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bell className="size-4" />Push Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {["CRM Notifications", "AI Agent Alerts", "Workflow Completions", "Security Alerts", "Billing Alerts", "Voice Call Notifications", "WhatsApp Messages", "System Updates"].map((n) => (
                <div key={n} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground text-xs">{n}</span>
                  <div className="size-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-primary" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Responsive Breakpoints */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Responsive Support</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { device: "Mobile Portrait", size: "375px", icon: Smartphone },
                { device: "Mobile Landscape", size: "667px", icon: Smartphone },
                { device: "Tablet", size: "768px", icon: Tablet },
                { device: "Desktop", size: "1280px+", icon: Monitor },
                { device: "Large Display", size: "1920px+", icon: Monitor },
              ].map((b) => (
                <div key={b.device} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground"><b.icon className="size-3.5" />{b.device}</div>
                  <span className="font-mono text-muted-foreground">{b.size}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
