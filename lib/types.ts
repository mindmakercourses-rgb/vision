export type Role = "owner" | "admin" | "member"

export type Organization = {
  id: string
  name: string
  slug: string
  created_by: string
  created_at: string
  updated_at: string
}

export type Membership = {
  org_id: string
  user_id: string
  role: Role
  created_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
}

export type OrgWithRole = Organization & { role: Role }

export type MemberWithProfile = {
  user_id: string
  role: Role
  created_at: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
}

export type Invitation = {
  id: string
  org_id: string
  email: string
  role: Role
  token: string
  status: "pending" | "accepted" | "revoked"
  created_at: string
}

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
}
