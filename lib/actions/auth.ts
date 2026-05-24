"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

/**
 * Reusable Auth Server Actions
 */

export async function getCurrentUser() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        return null
    }

    return user
}

export async function requireAdminAuth() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/admin/login")
    }

    return user
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/admin/login")
}
