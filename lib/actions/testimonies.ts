"use server"

import { createClient } from "@/lib/supabase/server"
import type { Testimony } from "@/lib/types/database"
import { revalidatePath } from "next/cache"
import { requireAdminAuth } from "@/lib/actions/auth"
import { testimonySchema, type TestimonyFormValues } from "@/lib/validations/testimony"

/**
 * Reusable backend query functions for Testimonies.
 * All functions use the server-side Supabase client.
 */

export async function getPublishedTestimonials() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching published testimonials:", error)
        return []
    }

    return data as Testimony[]
}

export async function getFeaturedTestimonials() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching featured testimonials:", error)
        return []
    }

    return data as Testimony[]
}

export async function getAllTestimonials() {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching all testimonials:", error)
        return []
    }

    return data as Testimony[]
}

export async function getTestimonyBySlug(slug: string, admin = false) {
    const supabase = await createClient()

    let query = supabase
        .from("testimonies")
        .select("*")
        .eq("slug", slug)

    if (!admin) {
        query = query.eq("is_published", true)
    }

    const { data, error } = await query.single()

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error(`Error fetching testimony with slug ${slug}:`, error)
        }
        return null
    }

    return data as Testimony
}

export async function getTestimonyById(id: string) {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error(`Error fetching testimony with ID ${id}:`, error)
        return null
    }

    return data as Testimony
}

/**
 * Admin specific helper to get counts for the dashboard
 */
export async function getTestimoniesCount() {
    await requireAdminAuth()
    const supabase = await createClient()

    const { count, error } = await supabase
        .from("testimonies")
        .select("*", { count: "exact", head: true })

    if (error) {
        console.error("Error getting testimonies count:", error)
        return 0
    }

    return count || 0
}

/**
 * Mutations
 */

async function deleteImageFromStorage(url: string | null) {
    if (!url || !url.includes("testimony-images")) return

    try {
        const supabase = await createClient()
        // Extract filename from public URL
        const parts = url.split("/")
        const fileName = parts[parts.length - 1]

        if (fileName && fileName.includes(".")) {
            console.log("Cleaning up storage object:", fileName)
            await supabase.storage
                .from("testimony-images")
                .remove([fileName])
        }
    } catch (error) {
        console.error("Storage cleanup failed:", error)
    }
}

export async function createTestimony(values: TestimonyFormValues) {
    await requireAdminAuth()

    try {
        const validatedFields = testimonySchema.parse(values)
        const supabase = await createClient()

        console.log("Creating testimony with payload:", validatedFields)

        const { data, error } = await supabase
            .from("testimonies")
            .insert([validatedFields])
            .select()
            .single()

        if (error) {
            console.error("Supabase create error:", error)
            if (error.code === '23505') throw new Error("A testimony with this slug already exists.")
            throw new Error(error.message)
        }

        revalidatePath("/admin/testimonies")
        revalidatePath("/about/testimonies")
        revalidatePath("/", "layout")

        return { success: true, data: data as Testimony }
    } catch (err: any) {
        console.error("Action create error:", err)
        throw err
    }
}

export async function updateTestimony(id: string, values: TestimonyFormValues | any) {
    await requireAdminAuth()

    if (!id) throw new Error("Testimony ID is required")

    try {
        const supabase = await createClient()

        // Get existing to check for image replacement
        const { data: existing } = await supabase
            .from("testimonies")
            .select("cover_image_url")
            .eq("id", id)
            .single()

        // If it's a full form update, validate it
        let updatePayload = values
        try {
            if (values.title && values.excerpt) {
                updatePayload = testimonySchema.parse(values)
            }
        } catch (e) {
            // If validation fails, it might be a partial update (like toggle publish)
            console.log("Partial update or validation skipped for:", Object.keys(values))
        }

        console.log(`Updating testimony ${id} with payload:`, updatePayload)

        const { data, error } = await supabase
            .from("testimonies")
            .update(updatePayload)
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("Supabase update error:", error)
            if (error.code === '23505') throw new Error("A testimony with this slug already exists.")
            throw new Error(error.message)
        }

        // Cleanup old image if replaced
        if (existing?.cover_image_url && updatePayload.cover_image_url && existing.cover_image_url !== updatePayload.cover_image_url) {
            await deleteImageFromStorage(existing.cover_image_url)
        }

        revalidatePath("/admin/testimonies")
        revalidatePath("/about/testimonies")
        revalidatePath("/", "layout")

        return { success: true, data: data as Testimony }
    } catch (err: any) {
        console.error("Action update error:", err)
        throw err
    }
}

export async function deleteTestimony(id: string) {
    await requireAdminAuth()

    const supabase = await createClient()

    // Get existing to cleanup storage
    const { data: existing } = await supabase
        .from("testimonies")
        .select("cover_image_url")
        .eq("id", id)
        .single()

    const { error } = await supabase
        .from("testimonies")
        .delete()
        .eq("id", id)

    if (error) {
        console.error("Supabase delete error:", error)
        throw new Error(error.message)
    }

    if (existing?.cover_image_url) {
        await deleteImageFromStorage(existing.cover_image_url)
    }

    revalidatePath("/admin/testimonies")
    revalidatePath("/about/testimonies")
    revalidatePath("/", "layout")

    return { success: true }
}
