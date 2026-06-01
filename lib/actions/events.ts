"use server"

import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/lib/types/database"
import { requireAdminAuth } from "@/lib/actions/auth"
import { revalidatePath } from "next/cache"
import { eventSchema, type EventFormValues } from "@/lib/validations/event"

/**
 * Reusable backend query functions for Events.
 * All functions use the server-side Supabase client.
 */

export async function getAllEvents() {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: false })

    if (error) {
        console.error("Error fetching all events:", error)
        return []
    }

    return data as Event[]
}

export async function getPublishedEvents() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .order("start_date", { ascending: true })

    if (error) {
        console.error("Error fetching published events:", error)
        return []
    }

    return data as Event[]
}

export async function getFeaturedEvents() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .eq("featured", true)
        .order("start_date", { ascending: true })

    if (error) {
        console.error("Error fetching featured events:", error)
        return []
    }

    return data as Event[]
}

export async function getHomepageFeaturedEvents() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .eq("is_homepage_featured", true)
        .order("start_date", { ascending: true })

    if (error) {
        console.error("Error fetching homepage featured events:", error)
        return []
    }

    return data as Event[]
}

export async function getEventBySlug(slug: string, admin = false) {
    const supabase = await createClient()

    let query = supabase
        .from("events")
        .select("*")
        .eq("slug", slug)

    if (!admin) {
        query = query.eq("status", "published")
    }

    const { data, error } = await query.single()

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error(`Error fetching event with slug ${slug}:`, error)
        }
        return null
    }

    return data as Event
}

export async function getEventById(id: string) {
    await requireAdminAuth()
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error(`Error fetching event with ID ${id}:`, error)
        return null
    }

    return data as Event
}

/**
 * Admin specific helper to get counts for the dashboard
 */
export async function getEventsCount() {
    await requireAdminAuth()
    const supabase = await createClient()

    const { count, error } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })

    if (error) {
        console.error("Error getting events count:", error)
        return 0
    }

    return count || 0
}

/**
 * Mutations
 */

async function deleteImageFromStorage(url: string | null) {
    if (!url || !url.includes("events")) return

    try {
        const supabase = await createClient()
        // Extract filename from public URL
        const parts = url.split("/")
        const fileName = parts[parts.length - 1]

        if (fileName && fileName.includes(".")) {
            console.log("Cleaning up event storage object:", fileName)
            await supabase.storage
                .from("events")
                .remove([`events/posters/${fileName}`])
        }
    } catch (error) {
        console.error("Storage cleanup failed:", error)
    }
}

export async function createEvent(values: EventFormValues) {
    await requireAdminAuth()

    try {
        const validatedFields = eventSchema.parse(values)
        const supabase = await createClient()

        console.log("Creating event with payload:", validatedFields)

        const { data, error } = await supabase
            .from("events")
            .insert([validatedFields])
            .select()
            .single()

        if (error) {
            console.error("Supabase event create error:", error)
            if (error.code === '23505') throw new Error("An event with this slug already exists.")
            throw new Error(error.message)
        }

        revalidatePath("/admin/events")
        revalidatePath("/events")
        revalidatePath("/", "layout")

        return { success: true, data: data as Event }
    } catch (err: any) {
        console.error("Action createEvent error:", err)
        throw err
    }
}

export async function updateEvent(id: string, values: EventFormValues | any) {
    await requireAdminAuth()

    if (!id) throw new Error("Event ID is required")

    try {
        const supabase = await createClient()

        // Get existing to check for image replacement
        const { data: existing } = await supabase
            .from("events")
            .select("cover_image")
            .eq("id", id)
            .single()

        // If it's a full form update, validate it
        let updatePayload = values
        try {
            if (values.title && values.short_description) {
                updatePayload = eventSchema.parse(values)
            }
        } catch (e) {
            // If validation fails, it might be a partial update (like toggling status)
            console.log("Partial update or validation skipped for:", Object.keys(values))
        }

        console.log(`Updating event ${id} with payload:`, updatePayload)

        const { data, error } = await supabase
            .from("events")
            .update(updatePayload)
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("Supabase event update error:", error)
            if (error.code === '23505') throw new Error("An event with this slug already exists.")
            throw new Error(error.message)
        }

        // Cleanup old image if replaced
        if (existing?.cover_image && updatePayload.cover_image && existing.cover_image !== updatePayload.cover_image) {
            await deleteImageFromStorage(existing.cover_image)
        }

        revalidatePath("/admin/events")
        revalidatePath("/events")
        revalidatePath("/", "layout")

        return { success: true, data: data as Event }
    } catch (err: any) {
        console.error("Action updateEvent error:", err)
        throw err
    }
}

export async function deleteEvent(id: string) {
    await requireAdminAuth()

    if (!id) throw new Error("Event ID is required")

    try {
        const supabase = await createClient()

        // Get existing to cleanup storage
        const { data: existing } = await supabase
            .from("events")
            .select("cover_image")
            .eq("id", id)
            .single()

        const { error } = await supabase
            .from("events")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Supabase event delete error:", error)
            throw new Error(error.message)
        }

        if (existing?.cover_image) {
            await deleteImageFromStorage(existing.cover_image)
        }

        revalidatePath("/admin/events")
        revalidatePath("/events")
        revalidatePath("/", "layout")

        return { success: true }
    } catch (err: any) {
        console.error("Action deleteEvent error:", err)
        throw err
    }
}
