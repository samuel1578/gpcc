"use server"

import { revalidatePath } from "next/cache"
import {
    getAlbums,
    getAlbumById,
    createAlbum,
    addImagesToAlbum,
    reorderAlbumImages,
    GalleryImage
} from "./gallery"

export type SpotlightImage = {
    id: string       // use the image's url as its stable id
    url: string
    label: string
    aspect: string   // e.g. "4/5", "4/3", "4/4"
    order: number
}

const SPOTLIGHT_ALBUM_TITLE = "__homepage_spotlight__"

/**
 * 1. getSpotlightImages(): SpotlightImage[]
 * - Call getAlbums(), find the album with title === SPOTLIGHT_ALBUM_TITLE.
 * - If not found, return [].
 * - If found, map its images[] array to SpotlightImage[]. 
 * - Each GalleryImage's `caption` field stores a JSON string: JSON.stringify({ label, aspect }).
 */
export async function getSpotlightImages(): Promise<SpotlightImage[]> {
    const albums = await getAlbums()
    const spotlightAlbum = albums.find(a => a.title === SPOTLIGHT_ALBUM_TITLE)

    if (!spotlightAlbum) return []

    // Ensure we have the full album details including images
    const album = await getAlbumById(spotlightAlbum.id)
    if (!album || !album.images) return []

    return album.images.map((img, index) => {
        let label = ""
        let aspect = "4/3"
        try {
            if (img.caption) {
                const data = JSON.parse(img.caption)
                label = data.label || ""
                aspect = data.aspect || "4/3"
            }
        } catch (e) {
            // Fallback for legacy/malformed
        }
        return {
            id: img.url,
            url: img.url,
            label,
            aspect,
            order: index
        }
    })
}

/**
 * 2. ensureSpotlightAlbum(): returns the album id
 * - Call getAlbums(), find one with title === SPOTLIGHT_ALBUM_TITLE.
 * - If it doesn't exist, call createAlbum with { title: SPOTLIGHT_ALBUM_TITLE, visible: false, span: "" } and return the new album's id.
 * - If it exists, return its id.
 */
export async function ensureSpotlightAlbum(): Promise<string> {
    const albums = await getAlbums()
    const spotlightAlbum = albums.find(a => a.title === SPOTLIGHT_ALBUM_TITLE)

    if (spotlightAlbum) return spotlightAlbum.id

    const formData = new FormData()
    formData.append("title", SPOTLIGHT_ALBUM_TITLE)
    formData.append("visible", "false")
    formData.append("span", "")
    formData.append("cover_url", "")

    // Note: createAlbum in gallery.ts redirects to /admin/gallery.
    // This will interrupt the current execution if the album needs to be created.
    await createAlbum(formData)

    // This line may not be reached due to the redirect in createAlbum
    return ""
}

/**
 * 3. addSpotlightImage(url: string, label: string, aspect: string): void
 * - Call ensureSpotlightAlbum() to get the album id.
 * - Call addImagesToAlbum(albumId, [{ url, caption: JSON.stringify({ label, aspect }) }])
 */
export async function addSpotlightImage(url: string, label: string, aspect: string): Promise<void> {
    const albumId = await ensureSpotlightAlbum()
    await addImagesToAlbum(albumId, [{ url, caption: JSON.stringify({ label, aspect }) }])
    revalidatePath("/")
}

/**
 * 4. updateSpotlightImage(id: string, data: { label?: string; aspect?: string }): void
 * - Get the album id via ensureSpotlightAlbum().
 * - Fetch the album via getAlbumById(albumId), get its current images[] array.
 * - Find the image where image.url === id, merge in the new label/aspect.
 * - Call reorderAlbumImages(albumId, images) with the full updated array.
 */
export async function updateSpotlightImage(id: string, data: { label?: string; aspect?: string }): Promise<void> {
    const albumId = await ensureSpotlightAlbum()
    const album = await getAlbumById(albumId)
    if (!album || !album.images) return

    const updatedImages = album.images.map(img => {
        if (img.url === id) {
            let currentData = { label: "", aspect: "4/3" }
            try {
                if (img.caption) {
                    currentData = { ...currentData, ...JSON.parse(img.caption) }
                }
            } catch (e) { }

            const newData = {
                label: data.label !== undefined ? data.label : currentData.label,
                aspect: data.aspect !== undefined ? data.aspect : currentData.aspect
            }
            return {
                ...img,
                caption: JSON.stringify(newData)
            }
        }
        return img
    })

    await reorderAlbumImages(albumId, updatedImages)
    revalidatePath("/")
}

/**
 * 5. deleteSpotlightImage(id: string): void
 * - Get the album id via ensureSpotlightAlbum().
 * - Fetch current images[] via getAlbumById(albumId).
 * - Filter out the image where image.url === id.
 * - Call reorderAlbumImages(albumId, filteredImages).
 */
export async function deleteSpotlightImage(id: string): Promise<void> {
    const albumId = await ensureSpotlightAlbum()
    const album = await getAlbumById(albumId)
    if (!album || !album.images) return

    const filteredImages = album.images.filter(img => img.url !== id)
    await reorderAlbumImages(albumId, filteredImages)
    revalidatePath("/")
}

/**
 * 6. reorderSpotlightImages(images: SpotlightImage[]): void
 * - Get the album id via ensureSpotlightAlbum().
 * - Map SpotlightImage[] back to GalleryImage[] shape.
 * - Call reorderAlbumImages(albumId, mappedImages).
 */
export async function reorderSpotlightImages(images: SpotlightImage[]): Promise<void> {
    const albumId = await ensureSpotlightAlbum()
    const mappedImages: GalleryImage[] = images.map(img => ({
        url: img.url,
        caption: JSON.stringify({ label: img.label, aspect: img.aspect })
    }))

    await reorderAlbumImages(albumId, mappedImages)
    revalidatePath("/")
}
