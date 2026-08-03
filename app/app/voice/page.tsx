"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone, PhoneCall, PhoneOff, Mic, MicOff, Volume2, VolumeX,
  Bot, Clock, Users, TrendingUp, BarChart3, Settings, PhoneIncoming,
  PhoneOutgoing, PhoneMissed, Radio, Activity, ChevronRight,
} from "lucide-react"

const RECENT_CALLS = [
  { id: "1", name: "Ahmed Hassan", phone: "+20 100 123 4567", type: "inbound", duration: "4:32", status: "completed", ai: true, sentiment: "positive", time: "10:24 AM", summary: "Discussed enterprise pricing. Interested in 50-user plan. Scheduled demo." },
  { id: "2", name: "Layla Ibrahim", phone: "+20 112 987 6543", type: "outbound", duration: "2:15", status: "completed", ai: false, sentiment: "neutral", time: "9:50 AM", summary: "Follow-up on proposal. Customer requested 2-week extension." },
  { id: "3", name: "Unknown", phone: "+971 50 987 1234", type: "inbound", duration: "0:00", status: "missed", ai: true, sentiment: null, time: "9:12 AM", summary: "" },
  { id: "4", name: "Khaled Mansour", phone: "+20 100 555 7788", type: "outbound", duration: "8:44", status: "completed", ai: true, sentiment: "positive", time: "Yesterday", summary: "Contract review call. Customer approved terms. Moving to closing." },
  { id: "5", name: "Fatima Al-Rashid", phone: "+966 55 111 2233", type: "inbound", duration: "1:05", status: "transferred", ai: true, sentiment: "negative", time: "Yesterday", summary: "Complaint about billing. Escalated to human agent." },
]

function CallTypeIcon({ type, status }: { type: string; status: string }) {
  if (status === "missed") return <PhoneMissed className="size-4 text-red-500" />
  if (type === "inbound") return <PhoneIncoming className="size-4 text-green-500" />
  return <PhoneOutgoing className="size-4 text-blue-500" />
}

export default function VoicePage() {
  const [activeCall, setActiveCall] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speakerOff, setSpeakerOff] = useState(false)

  const stats = [
    { label: "Calls Today", value: 48, icon: Phone, trend: "+12%" },
    { label: "AI Handled", value: "79%", icon: Bot, trend: "+5%" },
    { label: "Avg Duration", value: "3:45", icon: Clock, trend: "-0:30" },
    { label: "Resolution Rate", value: "86%", icon: TrendingUp, trend: "+3%" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Voice AI Engine</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time AI voice conversations powered by ElevenLabs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Settings className="size-4" />Voice Settings</Button>
          <Button onClick={() => setActiveCall(!activeCall)}>
            {activeCall ? <><PhoneOff className="size-4" />End Call</> : <><PhoneCall className="size-4" />New Call</>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                <p className="text-xs font-medium text-green-600">{s.trend}</p>
              </div>
              <s.icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Call Interface */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">AI Phone Interface</CardTitle>
          </CardHeader>
          <CardContent>
            {activeCall ? (
              <div className="flex flex-col items-center gap-6 py-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold animate-pulse">
                    A
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-green-500 text-white">
                    <Bot className="size-4" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Ahmed Hassan</p>
                  <p className="text-sm text-muted-foreground">+20 100 123 4567</p>
                  <div className="flex items-center gap-2 justify-center mt-2">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-green-600">AI is speaking…</span>
                  </div>
                  <p className="text-2xl font-mono font-semibold mt-2 tabular-nums">04:32</p>
                </div>
                {/* Waveform */}
                <div className="flex items-end gap-1 h-12">
                  {[4,6,8,5,10,7,12,9,6,11,8,5,9,7,10,6,8,5,7,9].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-primary/60 animate-pulse"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                {/* Live Transcript */}
                <div className="w-full rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground space-y-2">
                  <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Live Transcript</p>
                  <p><span className="text-primary font-medium">AI:</span> "Thank you for calling Vision CRM. My name is Sara. How can I help you today?"</p>
                  <p><span className="text-foreground font-medium">Customer:</span> "I wanted to ask about the enterprise pricing…"</p>
                </div>
                {/* Controls */}
                <div className="flex gap-3">
                  <button onClick={() => setMuted(!muted)} className={`flex size-12 items-center justify-center rounded-full border-2 transition-colors ${muted ? "border-red-500 bg-red-500/10 text-red-500" : "border-border hover:bg-muted"}`}>
                    {muted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                  </button>
                  <button onClick={() => setActiveCall(false)} className="flex size-14 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
                    <PhoneOff className="size-6" />
                  </button>
                  <button onClick={() => setSpeakerOff(!speakerOff)} className={`flex size-12 items-center justify-center rounded-full border-2 transition-colors ${speakerOff ? "border-red-500 bg-red-500/10 text-red-500" : "border-border hover:bg-muted"}`}>
                    {speakerOff ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                  <Phone className="size-10 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">No Active Call</p>
                  <p className="text-sm text-muted-foreground mt-1">Start a new call or wait for incoming calls.</p>
                </div>
                <Button className="w-full" onClick={() => setActiveCall(true)}>
                  <PhoneCall className="size-4" />
                  Start AI Call
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Calls */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Calls</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1">
                <Radio className="size-3 text-green-500" />
                3 Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {RECENT_CALLS.map((call) => (
                <div key={call.id} className="flex items-start gap-4 px-6 py-4 hover:bg-muted/30 cursor-pointer transition-colors">
                  <div className="mt-0.5">
                    <CallTypeIcon type={call.type} status={call.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{call.name}</span>
                      {call.ai && <Badge variant="outline" className="text-xs py-0 gap-1"><Bot className="size-3 text-primary" />AI</Badge>}
                      {call.sentiment && (
                        <span className={`text-xs font-medium ${call.sentiment === "positive" ? "text-green-600" : call.sentiment === "negative" ? "text-red-500" : "text-muted-foreground"}`}>
                          {call.sentiment}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{call.phone}</p>
                    {call.summary && <p className="text-xs text-muted-foreground mt-1 truncate">{call.summary}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs text-muted-foreground">{call.time}</span>
                    <span className="flex items-center gap-1 text-xs font-medium">
                      <Clock className="size-3 text-muted-foreground" />
                      {call.duration}
                    </span>
                    <Badge variant={call.status === "completed" ? "secondary" : call.status === "missed" ? "destructive" : "outline"} className="text-xs">
                      {call.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Analytics Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Queue Status", icon: Users, items: ["Sales Queue: 2 waiting", "Support Queue: 1 waiting", "VIP Queue: 0 waiting"] },
          { label: "Top Call Reasons", icon: BarChart3, items: ["Pricing Inquiry (38%)", "Technical Support (24%)", "Demo Request (18%)", "Billing (12%)"] },
          { label: "AI Performance", icon: Activity, items: ["Avg Confidence: 94%", "Escalation Rate: 8%", "First Call Resolution: 82%", "Customer Satisfaction: 4.7/5"] },
        ].map((panel) => (
          <Card key={panel.label}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <panel.icon className="size-4 text-muted-foreground" />
                {panel.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {panel.items.map((item) => (
                <div key={item} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item}</span>
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
