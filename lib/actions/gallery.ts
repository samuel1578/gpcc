"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const WORKER_URL = process.env.CLOUDFLARE_WORKER_URL

export type GalleryImage = {
    url: string
    caption: string
}

export type Album = {
    id: string           // slugified title e.g. "sunday-worship-2025"
    title: string
    span: string         // tailwind classes: "default", "wide", "featured"
    cover_url: string
    visible: boolean
    image_count: number
    images: GalleryImage[]
}

export async function getAlbums(): Promise<Album[]> {
    if (!WORKER_URL) return []
    try {
        const res = await fetch(`${WORKER_URL}/albums`, {
            headers: {
                "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
            },
            next: { revalidate: 3600, tags: ['gallery'] }
        })
        if (!res.ok) return []
        return res.json()
    } catch (error) {
        console.error("Failed to fetch albums:", error)
        return []
    }
}

export async function getAlbumById(id: string): Promise<Album | null> {
    if (!WORKER_URL) return null
    try {
        const res = await fetch(`${WORKER_URL}/albums/${id}`, {
            headers: {
                "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
            },
            next: { revalidate: 3600, tags: [`album-${id}`] }
        })
        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error(`Failed to fetch album ${id}:`, error)
        return null
    }
}

export async function createAlbum(formData: FormData): Promise<void> {
    if (!WORKER_URL) throw new Error("Worker URL not configured")

    const title = formData.get("title") as string
    const span = formData.get("span") as string
    const cover_url = formData.get("cover_url") as string
    const visible = formData.get("visible") === "true"

    const res = await fetch(`${WORKER_URL}/albums`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
        },
        body: JSON.stringify({ title, span, cover_url, visible })
    })

    if (!res.ok) throw new Error("Failed to create album")

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
    redirect("/admin/gallery")
}

export async function updateAlbum(id: string, data: Partial<Album>): Promise<void> {
    if (!WORKER_URL) throw new Error("Worker URL not configured")

    const res = await fetch(`${WORKER_URL}/albums/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("Failed to update album")

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
    revalidatePath(`/admin/gallery/${id}`)
}

export async function deleteAlbum(id: string): Promise<void> {
    if (!WORKER_URL) throw new Error("Worker URL not configured")

    const res = await fetch(`${WORKER_URL}/albums/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
        }
    })

    if (!res.ok) throw new Error("Failed to delete album")

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
}

export async function addImagesToAlbum(id: string, images: GalleryImage[]): Promise<void> {
    if (!WORKER_URL) throw new Error("Worker URL not configured")

    const res = await fetch(`${WORKER_URL}/albums/${id}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
        },
        body: JSON.stringify({ images })
    })

    if (!res.ok) throw new Error("Failed to add images")

    revalidatePath("/gallery")
    revalidatePath(`/admin/gallery/${id}`)
}

export async function deleteImageFromAlbum(id: string, imageUrl: string): Promise<void> {
    if (!WORKER_URL) throw new Error("Worker URL not configured")

    const res = await fetch(`${WORKER_URL}/albums/${id}/images/${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
        }
    })

    if (!res.ok) throw new Error("Failed to delete image")

    revalidatePath("/gallery")
    revalidatePath(`/admin/gallery/${id}`)
}

export async function reorderAlbumImages(id: string, images: GalleryImage[]): Promise<void> {
    if (!WORKER_URL) throw new Error("Worker URL not configured")

    const res = await fetch(`${WORKER_URL}/albums/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CLOUDFLARE_WORKER_SECRET}`
        },
        body: JSON.stringify({ images, image_count: images.length })
    })

    if (!res.ok) throw new Error("Failed to reorder images")

    revalidatePath("/gallery")
    revalidatePath(`/admin/gallery/${id}`)
}
