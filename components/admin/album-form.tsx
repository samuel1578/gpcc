"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, Save, ChevronLeft, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { createAlbum } from "@/lib/actions/gallery"
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

export function AlbumForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [coverPreview, setCoverPreview] = useState<string | null>(null)
    const [coverUrl, setCoverUrl] = useState("")
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

        try {
            await createAlbum(formData)
            toast.success("Album created successfully")
            router.push("/admin/gallery")
            router.refresh()
        } catch (error: any) {
            console.error("Album creation error:", error)
            toast.error("Failed to create album")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="w-fit gap-2 text-ink-muted hover:text-ink"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to list
                </Button>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading || isUploading}
                        onClick={() => router.back()}
                        className="bg-white/50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading || isUploading}
                        className="bg-red-600 hover:bg-red-700 text-white gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Create Album
                    </Button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="glass-panel p-6 lg:p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Sunday Worship 2025"
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
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="glass-panel p-6 space-y-6">
                        <h3 className="font-display text-lg font-semibold text-ink">Settings</h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="span" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Grid Span</Label>
                                <Select name="span" defaultValue="default">
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
                                    <p className="text-xs text-ink-muted">Show this album in the gallery.</p>
                                </div>
                                <Switch
                                    id="visible"
                                    name="visible"
                                    value="true"
                                    defaultChecked
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    )
}
