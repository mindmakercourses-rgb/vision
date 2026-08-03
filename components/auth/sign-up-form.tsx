"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendSignUpOtpAction, verifySignUpOtpAction } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail } from "lucide-react"

export function SignUpForm() {
  const router = useRouter()

  // Step 1: collect details; Step 2: enter OTP
  const [step, setStep] = useState<"details" | "otp">("details")

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // ── Step 1: send OTP ──────────────────────────────────────────────────────
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await sendSignUpOtpAction({ fullName, email, password })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    setStep("otp")
    setLoading(false)
  }

  // ── Step 2: verify OTP ────────────────────────────────────────────────────
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await verifySignUpOtpAction({ email, password, token: otp })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push("/app")
    router.refresh()
  }

  // ── Resend OTP ─────────────────────────────────────────────────────────────
  async function handleResend() {
    setLoading(true)
    setError(null)
    setOtp("")

    const result = await sendSignUpOtpAction({ fullName, email, password })
    if (!result.success) {
      setError(result.error)
    }
    setLoading(false)
  }

  // ── Step 2: OTP screen ─────────────────────────────────────────────────────
  if (step === "otp") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 flex items-start gap-3">
          <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>. Enter it below to verify your email.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp">Verification code</Label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="text-center tracking-[0.5em] text-lg font-mono"
          />
        </div>

        {error ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading || otp.length < 6}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Verify and create account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {"Didn't receive the code?"}{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="font-medium text-foreground underline-offset-4 hover:underline disabled:opacity-50"
          >
            Resend
          </button>
          {" or "}
          <button
            type="button"
            onClick={() => { setStep("details"); setError(null) }}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            go back
          </button>
        </p>
      </form>
    )
  }

  // ── Step 1: details screen ─────────────────────────────────────────────────
  return (
    <form onSubmit={handleSendOtp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : "Create account"}
      </Button>
    </form>
  )
}
