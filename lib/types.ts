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

export type Contact = {
  id: string
  org_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  company_id?: string
  owner_id?: string
  status: "prospect" | "active" | "engaged" | "inactive"
  lifecycle_stage: "lead" | "qualified" | "customer" | "closed"
  notes?: string
  tags?: string[]
  created_at: string
  updated_at?: string
}

export const CONTACT_STATUS_COLORS: Record<Contact['status'], string> = {
  prospect: "bg-slate-100 text-slate-700",
  active: "bg-blue-100 text-blue-700",
  engaged: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-700",
}

export const LIFECYCLE_STAGE_COLORS: Record<Contact['lifecycle_stage'], string> = {
  lead: "bg-orange-100 text-orange-700",
  qualified: "bg-yellow-100 text-yellow-700",
  customer: "bg-purple-100 text-purple-700",
  closed: "bg-red-100 text-red-700",
}
