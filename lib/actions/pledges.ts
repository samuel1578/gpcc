"use server"

import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/actions/auth"
import type { Pledge } from "@/lib/types/database"
import { revalidatePath } from "next/cache"

export async function getPledges(): Promise<Pledge[]> {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("pledges")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching pledges:", error)
        return []
    }

    return data as Pledge[]
}

export async function updatePledgeStatus(
    id: string,
    status: Pledge["status"]
): Promise<{ success: boolean; message: string }> {
    await requireAdminAuth()
    const supabase = await createClient()

    const { error } = await supabase
        .from("pledges")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)

    if (error) {
        console.error("Error updating pledge status:", error)
        return { success: false, message: "Failed to update status." }
    }

    revalidatePath("/admin/pledges")
    return { success: true, message: "Status updated successfully." }
}
