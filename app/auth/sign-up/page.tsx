import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start managing customer relationships with Vision."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
