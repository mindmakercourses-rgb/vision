"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createOrganization, acceptInvitation } from "@/app/actions/orgs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Ticket, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Mode = "create" | "join"

export function OnboardingForm() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("create")
  const [name, setName] = useState("")
  const [token, setToken] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function submit() {
    setError(null)
    startTransition(async () => {
      const result = mode === "create" ? await createOrganization(name) : await acceptInvitation(token)
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.push("/app")
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-card p-1">
        <TabButton active={mode === "create"} onClick={() => setMode("create")} icon={Building2} label="Create" />
        <TabButton active={mode === "join"} onClick={() => setMode("join")} icon={Ticket} label="Join" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="space-y-4"
      >
        {mode === "create" ? (
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization name</Label>
            <Input
              id="orgName"
              placeholder="Acme Inc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
            />
            <p className="text-xs text-muted-foreground">You&apos;ll be the owner of this workspace.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="token">Invitation code</Label>
            <Input
              id="token"
              placeholder="Paste your invite code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">Ask a workspace admin to send you an invite code.</p>
          </div>
        )}

        {error ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : mode === "create" ? (
            "Create workspace"
          ) : (
            "Join workspace"
          )}
        </Button>
      </form>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
