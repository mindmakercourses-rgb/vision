import { redirect } from "next/navigation"
import { AuthShell } from "@/components/auth/auth-shell"
import { OnboardingForm } from "@/components/onboarding/onboarding-form"
import { getCurrentUser, getUserOrgs } from "@/lib/orgs"

export default async function OnboardingPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/login")

  const orgs = await getUserOrgs()
  if (orgs.length > 0) redirect("/app")

  return (
    <AuthShell title="Set up your workspace" subtitle="Create a new organization or join an existing one with a code.">
      <OnboardingForm />
    </AuthShell>
  )
}
