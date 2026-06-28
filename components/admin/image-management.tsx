"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, Plus, Loader2, ImageIcon, Upload, GripVertical } from "lucide-react"
import { toast } from "sonner"
import { addImagesToAlbum, deleteImageFromAlbum, reorderAlbumImages, type Album, type GalleryImage } from "@/lib/actions/gallery"
import { uploadToR2 } from "@/lib/upload"

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface ImageManagementProps {
    album: Album
}

export function ImageManagement({ album }: ImageManagementProps) {
    const router = useRouter()
    const [images, setImages] = useState<GalleryImage[]>(album.images)
    const [isSavingOrder, setIsSavingOrder] = useState(false)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [uploadProgress, setUploadProgress] = useState("")

    const sensors = useSensors(useSensor(PointerSensor))

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = images.findIndex(img => img.url === active.id)
        const newIndex = images.findIndex(img => img.url === over.id)
        const reordered = arrayMove(images, oldIndex, newIndex)
        setImages(reordered)

        try {
            setIsSavingOrder(true)
            await reorderAlbumImages(album.id, reordered)
            toast.success("Order saved")
        } catch {
            toast.error("Failed to save order")
            setImages(album.images) // revert on failure
        } finally {
            setIsSavingOrder(false)
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || [])
        if (!files.length) return
        setIsAdding(true)
        try {
            const uploaded: GalleryImage[] = []
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                setUploadProgress(`${i + 1} of ${files.length}`)
                const publicUrl = await uploadToR2(
                    `gallery/${album.id}/${Date.now()}-${file.name}`,
                    file
                )
                uploaded.push({ url: publicUrl, caption: file.name.replace(/\.[^/.]+$/, "") })
            }
            await addImagesToAlbum(album.id, uploaded)
            toast.success(`${uploaded.length} image(s) uploaded and added`)
            setShowAddForm(false)
            router.refresh()
        } catch {
            toast.error("Upload failed")
        } finally {
            setIsAdding(false)
            setUploadProgress("")
        }
    }

    async function onDelete(imageUrl: string) {
        if (!confirm("Remove this image from the album?")) return
        try {
            setIsDeleting(imageUrl)
            await deleteImageFromAlbum(album.id, imageUrl)
            setImages(prev => prev.filter(img => img.url !== imageUrl))
            toast.success("Image removed")
        } catch {
            toast.error("Failed to remove image")
        } finally {
            setIsDeleting(null)
        }
    }

    async function onAddImages(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsAdding(true)

        const formData = new FormData(event.currentTarget)
        const urlsText = formData.get("urls") as string
        const singleUrl = formData.get("url") as string
        const caption = formData.get("caption") as string

        const urls = urlsText
            ? urlsText.split("\n").map(u => u.trim()).filter(Boolean)
            : singleUrl ? [singleUrl.trim()] : []

        if (urls.length === 0) {
            toast.error("Please provide at least one image URL")
            setIsAdding(false)
            return
        }

        const newImages: GalleryImage[] = urls.map(url => ({
            url,
            caption: caption || "Gallery Image"
        }))

        try {
            await addImagesToAlbum(album.id, newImages)
            toast.success(`${newImages.length} image(s) added`)
            setShowAddForm(false)
            router.refresh()
        } catch (error) {
            toast.error("Failed to add images")
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className="space-y-8">
            {/* Image Grid */}
            <div className="space-y-2">
                {isSavingOrder && (
                    <p className="text-xs text-ink-muted flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" /> Saving order...
                    </p>
                )}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={images.map(img => img.url)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {images.map((img, i) => (
                                <SortableImage
                                    key={img.url}
                                    img={img}
                                    isDeleting={isDeleting === img.url}
                                    onDelete={() => onDelete(img.url)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Empty State */}
            {album.images.length === 0 && (
                <div className="flex min-h-[200px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center">
                    <ImageIcon className="h-8 w-8 text-ink-muted/30 mb-3" />
                    <p className="text-sm text-ink-muted">No images in this album yet.</p>
                </div>
            )}

            {/* Add Images Form */}
            <div className="pt-4">
                {!showAddForm ? (
                    <Button
                        onClick={() => setShowAddForm(true)}
                        variant="outline"
                        className="w-full border-dashed border-black/10 py-8 hover:bg-black/5 gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Images
                    </Button>
                ) : (
                    <Card className="glass-panel p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-display font-semibold text-ink">Add Images to Album</h4>
                            <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>Cancel</Button>
                        </div>

                        <form onSubmit={onAddImages} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-4">
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                                        {isAdding ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="h-8 w-8 animate-spin text-ink-muted" />
                                                <span className="text-sm text-ink-muted">Uploading {uploadProgress}...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="h-8 w-8 text-ink-muted mb-2" />
                                                <span className="text-sm text-ink-muted">Click to upload images</span>
                                                <span className="text-xs text-ink-muted/60 mt-1">Select multiple files — JPG, PNG, WebP</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={isAdding}
                                        />
                                    </label>

                                    <div className="relative py-2">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-black/5" /></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-ink-muted">Or bulk add urls</span></div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Bulk Add (URLs, one per line)</Label>
                                        <Textarea
                                            name="urls"
                                            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                            className="bg-white/50 min-h-[120px]"
                                        />
                                    </div>
                                    <div className="relative py-2">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-black/5" /></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-ink-muted">Or single URL</span></div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Single Image URL</Label>
                                        <Input
                                            name="url"
                                            placeholder="https://example.com/image.jpg"
                                            className="bg-white/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Caption (applied to all)</Label>
                                        <Input
                                            name="caption"
                                            placeholder="Worship Service Highlights"
                                            className="bg-white/50"
                                        />
                                    </div>
                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            disabled={isAdding}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                                        >
                                            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                            Submit Images
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Card>
                )}
            </div>
        </div>
    )
}

function SortableImage({
    img,
    isDeleting,
    onDelete,
}: {
    img: GalleryImage
    isDeleting: boolean
    onDelete: () => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.url })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-black/5 bg-black/5 shadow-sm"
        >
            <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Drag handle */}
            <button
                {...attributes}
                {...listeners}
                className="absolute left-2 top-2 flex h-8 w-8 cursor-grab items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
            >
                <GripVertical className="h-4 w-4" />
            </button>

            {/* Delete button */}
            <button
                onClick={onDelete}
                disabled={isDeleting}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 disabled:opacity-50"
            >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </button>

            <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-[10px] font-medium text-white line-clamp-2">{img.caption}</p>
            </div>
        </div>
    )
}

function Save({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </svg>
    )
}
