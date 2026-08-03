import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { TriangleAlert } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <AuthShell title="Authentication error" subtitle="We couldn't complete that request.">
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <TriangleAlert className="size-5 shrink-0 text-destructive" />
          <p className="text-sm text-muted-foreground text-pretty">
            The link may have expired or already been used. Please try signing in again.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/auth/login">Back to sign in</Link>
        </Button>
      </div>
    </AuthShell>
  )
}
