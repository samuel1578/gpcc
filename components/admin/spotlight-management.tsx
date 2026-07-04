"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    addSpotlightImage,
    updateSpotlightImage,
    deleteSpotlightImage,
    reorderSpotlightImages,
    type SpotlightImage,
} from "@/lib/actions/spotlight"
import { uploadToR2 } from "@/lib/upload"

const ASPECT_OPTIONS = [
    { label: "Portrait", value: "3/4" },
    { label: "Landscape", value: "4/3" },
    { label: "Square", value: "1/1" },
] as const

export function SpotlightManagement({ initialImages }: { initialImages: SpotlightImage[] }) {
    const router = useRouter()
    const [images, setImages] = useState(initialImages)
    const [isAdding, setIsAdding] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const sensors = useSensors(useSensor(PointerSensor))

    useEffect(() => {
        setImages(initialImages)
    }, [initialImages])

    async function handleDragEnd(event: any) {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = images.findIndex((i) => i.id === active.id)
        const newIndex = images.findIndex((i) => i.id === over.id)
        const newOrder = arrayMove(images, oldIndex, newIndex)
        setImages(newOrder)
        try {
            await reorderSpotlightImages(newOrder)
            toast.success("Order updated")
        } catch {
            toast.error("Failed to save order")
            setImages(images)
        }
        router.refresh()
    }

    async function handleAddFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setIsUploading(true)
        try {
            const url = await uploadToR2(`gallery/spotlight/${Date.now()}-${file.name}`, file)
            await addSpotlightImage(url, "", "4/3")
            toast.success("Image added")
            router.refresh()
        } catch {
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false)
            setIsAdding(false)
        }
    }

    async function handleLabelSave(id: string, label: string, aspect: string) {
        try {
            await updateSpotlightImage(id, { label, aspect })
            toast.success("Saved")
            router.refresh()
        } catch {
            toast.error("Failed to save")
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this spotlight image?")) return
        setImages((prev) => prev.filter((i) => i.id !== id))
        try {
            await deleteSpotlightImage(id)
            toast.success("Deleted")
        } catch {
            toast.error("Failed to delete")
        }
        router.refresh()
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsAdding(true)} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4" />
                    Add Image
                </Button>
            </div>
            {isAdding && (
                <div className="rounded-2xl border border-black/10 p-4">
                    <Input type="file" accept="image/*" onChange={handleAddFile} disabled={isUploading} />
                    {isUploading && <p className="mt-2 text-sm text-ink-muted">Uploading...</p>}
                </div>
            )}
            <DndContext id="spotlight-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((img) => (
                            <SpotlightCard
                                key={img.id}
                                image={img}
                                onSave={handleLabelSave}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}

function SpotlightCard({
    image,
    onSave,
    onDelete,
}: {
    image: SpotlightImage
    onSave: (id: string, label: string, aspect: string) => void
    onDelete: (id: string) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id })
    const [label, setLabel] = useState(image.label)
    const [aspect, setAspect] = useState(image.aspect)
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="rounded-2xl border border-black/10 overflow-hidden bg-white"
        >
            <div className="relative aspect-video">
                <Image src={image.url} alt={label || "Spotlight image"} fill className="object-cover" />
                <button
                    {...attributes}
                    {...listeners}
                    className="absolute top-2 left-2 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 cursor-grab"
                >
                    <GripVertical className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onDelete(image.id)}
                    className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 text-red-600"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
            <div className="p-3 space-y-2">
                <Input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Label"
                    className="text-sm"
                />
                <select
                    value={aspect}
                    onChange={(e) => setAspect(e.target.value)}
                    className="w-full rounded-md border border-black/10 text-sm p-2"
                >
                    {ASPECT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => onSave(image.id, label, aspect)}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}
