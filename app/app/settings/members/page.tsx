import { getActiveOrg, getCurrentUser } from "@/lib/orgs"
import { createClient } from "@/lib/supabase/server"
import { MembersManager } from "@/components/app/members-manager"
import type { MemberWithProfile } from "@/lib/types"

export default async function MembersPage() {
  const user = await getCurrentUser()
  const { active } = await getActiveOrg()
  if (!active || !user) return null

  const supabase = await createClient()
  const { data } = await supabase.rpc("list_org_members", { p_org: active.id })

  const members: MemberWithProfile[] = (data ?? []).map((m: any) => ({
    user_id: m.user_id,
    role: m.role,
    created_at: m.created_at,
    full_name: m.full_name ?? null,
    email: m.email ?? null,
    avatar_url: null,
  }))

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Members &amp; roles</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage who has access to {active.name} and what they can do.
        </p>
      </div>

      <MembersManager
        orgId={active.id}
        members={members}
        currentUserId={user.id}
        currentRole={active.role}
      />
    </div>
  )
}
