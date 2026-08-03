"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { inviteMember, updateMemberRole, removeMember } from "@/app/actions/orgs"
import type { MemberWithProfile, Role } from "@/lib/types"
import { ROLE_LABELS } from "@/lib/types"
import { UserPlus, Trash2, Copy, Loader2 } from "lucide-react"

export function MembersManager({
  orgId,
  members,
  currentUserId,
  currentRole,
}: {
  orgId: string
  members: MemberWithProfile[]
  currentUserId: string
  currentRole: Role
}) {
  const router = useRouter()
  const canManage = currentRole === "owner" || currentRole === "admin"

  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<Role>("member")
  const [inviteToken, setInviteToken] = useState<string | null>(null)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleInvite() {
    startTransition(async () => {
      const result = await inviteMember(orgId, inviteEmail, inviteRole)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success("Invitation created")
      setInviteToken(result.token ?? null)
      setInviteEmail("")
      router.refresh()
    })
  }

  function copyToken() {
    if (!inviteToken) return
    navigator.clipboard.writeText(inviteToken)
    toast.success("Invite code copied")
  }

  function closeInvite() {
    setInviteOpen(false)
    setInviteToken(null)
  }

  function handleRoleChange(userId: string, role: Role) {
    startTransition(async () => {
      const result = await updateMemberRole(orgId, userId, role)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success("Role updated")
      router.refresh()
    })
  }

  function handleRemove(userId: string) {
    startTransition(async () => {
      const result = await removeMember(orgId, userId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success("Member removed")
      router.refresh()
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base">Members</CardTitle>
          <CardDescription>{members.length} people in this workspace</CardDescription>
        </div>
        {canManage ? (
          <Dialog open={inviteOpen} onOpenChange={(o) => (o ? setInviteOpen(true) : closeInvite())}>
            <Button size="sm" onClick={() => setInviteOpen(true)}>
              <UserPlus className="size-4" />
              Invite
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a member</DialogTitle>
                <DialogDescription>
                  We&apos;ll generate an invite code the person can redeem after signing up.
                </DialogDescription>
              </DialogHeader>

              {inviteToken ? (
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>Invite code</Label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 truncate rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">
                        {inviteToken}
                      </code>
                      <Button variant="outline" size="icon" onClick={copyToken} className="shrink-0 bg-transparent">
                        <Copy className="size-4" />
                        <span className="sr-only">Copy invite code</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Share this code with your teammate. They can redeem it on the &ldquo;Join&rdquo; tab after signing
                      up.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button onClick={closeInvite}>Done</Button>
                  </DialogFooter>
                </div>
              ) : (
                <>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="inviteEmail">Email</Label>
                      <Input
                        id="inviteEmail"
                        type="email"
                        placeholder="teammate@company.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={closeInvite} className="bg-transparent">
                      Cancel
                    </Button>
                    <Button onClick={handleInvite} disabled={pending}>
                      {pending ? <Loader2 className="size-4 animate-spin" /> : "Create invite"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-1">
        {members.map((m) => {
          const isSelf = m.user_id === currentUserId
          const label = m.full_name || m.email || "Unknown"
          const initials = label.slice(0, 2).toUpperCase()
          const editable = canManage && m.role !== "owner" && !isSelf
          return (
            <div
              key={m.user_id}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-accent/40"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {m.full_name || m.email}
                    {isSelf ? <span className="ml-1.5 text-xs text-muted-foreground">(you)</span> : null}
                  </p>
                  {m.full_name ? <p className="truncate text-xs text-muted-foreground">{m.email}</p> : null}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {editable ? (
                  <Select value={m.role} onValueChange={(v) => handleRoleChange(m.user_id, v as Role)}>
                    <SelectTrigger className="h-8 w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={m.role === "owner" ? "default" : "secondary"}>{ROLE_LABELS[m.role]}</Badge>
                )}
                {editable ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemove(m.user_id)}
                    aria-label={`Remove ${label}`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
