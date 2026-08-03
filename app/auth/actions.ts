"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

type SignUpResult = { success: true } | { success: false; error: string }
type SendOtpResult = { success: true } | { success: false; error: string }
type VerifyOtpResult = { success: true } | { success: false; error: string }

/**
 * Step 1: Register the user and send a 6-digit OTP to their email.
 * Uses signUp with shouldCreateUser:true so the account is created and
 * Supabase sends a numeric OTP (not a magic-link) to verify ownership.
 */
export async function sendSignUpOtpAction(formData: {
  fullName: string
  email: string
  password: string
}): Promise<SendOtpResult> {
  const email = formData.email.trim().toLowerCase()
  const password = formData.password
  const fullName = formData.fullName.trim()

  if (!email || !password) {
    return { success: false, error: "Email and password are required." }
  }
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." }
  }

  // First create the user as confirmed via admin so the account exists,
  // then separately send an OTP so the user can verify email ownership.
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  // Check if user already exists
  const { data: existingUsers } = await admin.auth.admin.listUsers()
  const exists = existingUsers?.users?.some(
    (u) => u.email?.toLowerCase() === email,
  )

  if (!exists) {
    // Create the user but keep email_confirm false so OTP is required
    const { error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: { full_name: fullName },
    })

    if (createError) {
      const msg = createError.message.toLowerCase()
      if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
        // continue — we'll send OTP to the existing unconfirmed account
      } else if (msg.includes("password")) {
        return { success: false, error: createError.message }
      } else {
        return { success: false, error: "Something went wrong. Please try again." }
      }
    }
  } else {
    return { success: false, error: "An account with this email already exists. Try signing in." }
  }

  // Send the 6-digit OTP via Supabase's built-in email
  const supabase = await createServerClient()
  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false, // user already created above
    },
  })

  if (otpError) {
    if (otpError.status === 429) {
      return { success: false, error: "Too many attempts. Please wait a minute and try again." }
    }
    return { success: false, error: "Failed to send verification code. Please try again." }
  }

  return { success: true }
}

/**
 * Step 2: Verify the OTP the user received, then sign them in with their password.
 */
export async function verifySignUpOtpAction(formData: {
  email: string
  password: string
  token: string
}): Promise<VerifyOtpResult> {
  const email = formData.email.trim().toLowerCase()
  const supabase = await createServerClient()

  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: formData.token.trim(),
    type: "email",
  })

  if (verifyError) {
    const msg = verifyError.message.toLowerCase()
    if (msg.includes("expired")) {
      return { success: false, error: "Code expired. Please request a new one." }
    }
    if (msg.includes("invalid") || msg.includes("incorrect")) {
      return { success: false, error: "Incorrect code. Please check your email and try again." }
    }
    return { success: false, error: "Verification failed. Please try again." }
  }

  // OTP verified — now sign in with password to get a full session
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: formData.password,
  })

  if (signInError) {
    return { success: false, error: "Verified! Please sign in to continue." }
  }

  return { success: true }
}

/**
 * Legacy: Creates a new user already confirmed (no email sent).
 * Kept for reference but no longer used by the sign-up form.
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
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

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

  const supabase = await createServerClient()
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

  if (signInError) {
    return { success: false, error: "Account created. Please sign in." }
  }

  return { success: true }
}
