"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, Save, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { updateAlbum, type Album } from "@/lib/actions/gallery"
import { uploadToR2 } from "@/lib/upload"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface AlbumSettingsFormProps {
    album: Album
}

export function AlbumSettingsForm({ album }: AlbumSettingsFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [coverPreview, setCoverPreview] = useState<string | null>(album.cover_url || null)
    const [coverUrl, setCoverUrl] = useState(album.cover_url || "")
    const [isUploading, setIsUploading] = useState(false)

    async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setIsUploading(true)
        try {
            const publicUrl = await uploadToR2(
                `gallery/covers/${Date.now()}-${file.name}`,
                file
            )
            setCoverUrl(publicUrl)
            setCoverPreview(publicUrl)
            toast.success("Cover image uploaded")
        } catch {
            toast.error("Upload failed")
        } finally {
            setIsUploading(false)
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const data = {
            title: formData.get("title") as string,
            span: formData.get("span") as string,
            cover_url: formData.get("cover_url") as string,
            visible: formData.get("visible") === "true",
        }

        try {
            await updateAlbum(album.id, data)
            toast.success("Album settings updated")
            router.refresh()
        } catch (error: any) {
            console.error("Album update error:", error)
            toast.error("Failed to update album settings")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="glass-panel p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={album.title}
                                required
                                className="bg-white/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Cover Image</Label>
                            {coverPreview ? (
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-black/5">
                                    <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setCoverPreview(null); setCoverUrl("") }}
                                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-black/10 rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                                    {isUploading ? (
                                        <Loader2 className="h-8 w-8 animate-spin text-ink-muted" />
                                    ) : (
                                        <>
                                            <Upload className="h-8 w-8 text-ink-muted mb-2" />
                                            <span className="text-sm text-ink-muted">Click to upload cover image</span>
                                            <span className="text-xs text-ink-muted/60 mt-1">JPG, PNG, WebP</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleCoverUpload}
                                        disabled={isUploading}
                                    />
                                </label>
                            )}
                            <input type="hidden" name="cover_url" value={coverUrl} />
                            <p className="text-[10px] text-ink-muted">
                                Upload your image to R2 first, then paste the public URL here.
                                Format: <code className="bg-black/5 px-1 rounded">https://pub-2a9d4a31c20a4f95907132646baf0688.r2.dev/gallery/album-id/cover.jpg</code>
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="span" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Grid Span</Label>
                            <Select name="span" defaultValue={album.span}>
                                <SelectTrigger className="bg-white/50 w-full">
                                    <SelectValue placeholder="Select span" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="wide">Wide (2 columns)</SelectItem>
                                    <SelectItem value="featured">Featured (Large Square)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-black/5 p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="visible" className="text-sm font-medium">Visible</Label>
                                <p className="text-xs text-ink-muted">Show in gallery.</p>
                            </div>
                            <Switch
                                id="visible"
                                name="visible"
                                value="true"
                                defaultChecked={album.visible}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save Settings
                    </Button>
                </div>
            </form>
        </Card>
    )
}
