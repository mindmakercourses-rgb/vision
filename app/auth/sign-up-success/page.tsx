import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { MailCheck } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <AuthShell title="Check your inbox" subtitle="We've sent you a confirmation link to finish setting up your account.">
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <MailCheck className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground text-pretty">
            Click the link in the email to confirm your address, then sign in to create your organization.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full bg-transparent">
          <Link href="/auth/login">Back to sign in</Link>
        </Button>
      </div>
    </AuthShell>
  )
}
