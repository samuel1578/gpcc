"use client"

import { useState, useTransition } from "react"
import { PlayCircle, Trash2, Plus, AlertCircle } from "lucide-react"
import { createSermon, deleteSermon, getSermons } from "@/lib/actions/sermons"
import { extractYouTubeId } from "@/lib/youtube"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useEffect } from "react"

export default function SermonsAdminPage() {
    const [sermons, setSermons] = useState<any[]>([])
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [isPending, startTransition] = useTransition()
    const [videoId, setVideoId] = useState<string | null>(null)

    useEffect(() => {
        const fetchSermons = async () => {
            const data = await getSermons()
            setSermons(data)
        }
        fetchSermons()
    }, [])

    useEffect(() => {
        setVideoId(extractYouTubeId(url))
    }, [url])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !url) return

        startTransition(async () => {
            try {
                await createSermon(title, url)
                toast.success("Sermon added successfully")
                setTitle("")
                setUrl("")
                const updated = await getSermons()
                setSermons(updated)
            } catch (err: any) {
                toast.error(err.message || "Failed to add sermon")
            }
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this sermon?")) return

        try {
            await deleteSermon(id)
            toast.success("Sermon deleted")
            const updated = await getSermons()
            setSermons(updated)
        } catch (err: any) {
            toast.error("Failed to delete sermon")
        }
    }

    return (
        <div className="space-y-10">
            <Reveal>
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Sermons Management
                    </h1>
                    <p className="text-ink-muted">
                        Add and manage YouTube-hosted sermons for the media center.
                    </p>
                </div>
            </Reveal>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
                {/* Form Section */}
                <div className="lg:col-span-5">
                    <Reveal delay={0.1}>
                        <Card className="glass-panel border-none shadow-[var(--shadow-soft)]">
                            <CardHeader>
                                <CardTitle className="font-display text-xl">Add New Sermon</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-ink-muted">Sermon Title</label>
                                        <Input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. The Power of Faith"
                                            className="bg-white/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-ink-muted">YouTube URL</label>
                                        <Input
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="bg-white/50"
                                            required
                                        />
                                        {!videoId && url && (
                                            <p className="text-[10px] text-amber-600 flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" /> Enter a valid YouTube URL
                                            </p>
                                        )}
                                    </div>

                                    {videoId && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Preview</p>
                                            <div className="relative aspect-video rounded-xl overflow-hidden border border-black/5 shadow-sm">
                                                <img
                                                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <PlayCircle className="h-10 w-10 text-white opacity-80" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isPending || !videoId}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        {isPending ? "Adding..." : "Add Sermon"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Reveal>
                </div>

                {/* List Section */}
                <div className="lg:col-span-7">
                    <Reveal delay={0.2}>
                        <div className="space-y-4">
                            <h3 className="font-display text-xl font-bold text-ink">Existing Sermons</h3>
                            {sermons.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/5 p-12 text-center bg-white/30">
                                    <PlayCircle className="h-10 w-10 text-ink-muted/30 mb-4" />
                                    <p className="text-ink-muted">No sermons added yet.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {sermons.map((sermon) => (
                                        <div
                                            key={sermon.id}
                                            className="flex items-center gap-4 p-3 rounded-2xl glass-panel border-none shadow-sm hover:shadow-md transition-all group"
                                        >
                                            <div className="relative h-16 w-28 shrink-0 rounded-lg overflow-hidden border border-black/5">
                                                <img
                                                    src={sermon.thumbnail_url}
                                                    alt={sermon.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-ink truncate">{sermon.title}</h4>
                                                <p className="text-[10px] text-ink-muted truncate">{sermon.youtube_url}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(sermon.id)}
                                                className="text-ink-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
