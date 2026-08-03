"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

type SignUpResult = { success: true } | { success: false; error: string }

/**
 * Creates a new user with the Supabase Admin API and immediately marks the
 * email as confirmed. This avoids Supabase's built-in confirmation email
 * (which is heavily rate limited on the free tier and requires custom SMTP
 * for production). The account is usable right away with no email step.
 *
 * The service role key is only ever used here on the server and is never
 * exposed to the browser.
 */
export async function signUpAction(formData: {
  fullName: string
  email: string
  password: string
}): Promise<SignUpResult> {
  const email = formData.email.trim().toLowerCase()
  const password = formData.password
  const fullName = formData.fullName.trim()

  if (!email || !password) {
    return { success: false, error: "Email and password are required." }
  }
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." }
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  )

  // Create the user already confirmed — no email is sent.
  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  })

  if (createError) {
    const message = createError.message.toLowerCase()
    if (message.includes("already") || message.includes("registered") || message.includes("exists")) {
      return { success: false, error: "An account with this email already exists. Try signing in." }
    }
    if (message.includes("password")) {
      return { success: false, error: createError.message }
    }
    return { success: false, error: "Something went wrong creating your account. Please try again." }
  }

  // Sign the user in on the server so a session cookie is set.
  const supabase = await createServerClient()
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

  if (signInError) {
    // Account exists but sign-in failed for some reason — let them sign in manually.
    return { success: false, error: "Account created. Please sign in." }
  }

  return { success: true }
}
