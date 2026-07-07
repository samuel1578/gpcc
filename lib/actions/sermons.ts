"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { requireAdminAuth } from "@/lib/actions/auth"
import { extractYouTubeId, buildThumbnailUrl } from "@/lib/youtube"

export async function createSermon(title: string, youtubeUrl: string) {
    await requireAdminAuth()

    const youtubeId = extractYouTubeId(youtubeUrl)
    if (!youtubeId) {
        throw new Error("Invalid YouTube URL. Please provide a valid link.")
    }

    const thumbnailUrl = buildThumbnailUrl(youtubeId)
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("sermons")
        .insert([{
            title,
            youtube_url: youtubeUrl,
            youtube_id: youtubeId,
            thumbnail_url: thumbnailUrl
        }])
        .select()
        .single()

    if (error) {
        console.error("Supabase create sermon error:", error)
        throw new Error(error.message)
    }

    revalidatePath("/admin/sermons")
    revalidatePath("/sermons")

    return { success: true, data }
}

export async function getSermons() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching sermons:", error)
        return []
    }

    return data
}

export async function deleteSermon(id: string) {
    await requireAdminAuth()
    const supabase = await createClient()

    const { error } = await supabase
        .from("sermons")
        .delete()
        .eq("id", id)

    if (error) {
        console.error("Supabase delete sermon error:", error)
        throw new Error(error.message)
    }

    revalidatePath("/admin/sermons")
    revalidatePath("/sermons")

    return { success: true }
}
