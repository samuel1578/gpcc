import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Filter, Eye, EyeOff, ImageIcon } from "lucide-react"
import { getAlbums } from "@/lib/actions/gallery"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlbumActions } from "@/components/admin/album-actions"

export const metadata = {
    title: "Manage Gallery | GPCC Admin",
}

export default async function GalleryAdminPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                            Gallery
                        </h1>
                        <p className="text-ink-muted">
                            Manage event albums and their photos.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild variant="outline" className="w-full sm:w-auto gap-2 bg-white/50">
                            <Link href="/admin/gallery/spotlight">
                                <ImageIcon className="h-4 w-4" />
                                Homepage Spotlight
                            </Link>
                        </Button>
                        <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white gap-2">
                            <Link href="/admin/gallery/new">
                                <Plus className="h-4 w-4" />
                                New Album
                            </Link>
                        </Button>
                    </div>
                </div>
            </Reveal>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                    <Input
                        placeholder="Search albums..."
                        className="pl-10 bg-white/50"
                    />
                </div>
                <Button variant="outline" className="gap-2 bg-white/50">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <Suspense fallback={<GalleryLoading />}>
                <AlbumTable />
            </Suspense>
        </div>
    )
}

async function AlbumTable() {
    const albums = await getAlbums()

    if (albums.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center">
                <div className="rounded-full bg-black/5 p-4 mb-4">
                    <ImageIcon className="h-8 w-8 text-ink-muted" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">No albums yet</h3>
                <p className="mt-2 text-ink-muted max-w-xs">
                    Create your first gallery event album to share moments with the community.
                </p>
                <Button asChild variant="outline" className="mt-6 border-red-600/20 text-red-600 hover:bg-red-600/5">
                    <Link href="/admin/gallery/new">Create first album</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="rounded-2xl glass-panel overflow-hidden shadow-[var(--shadow-soft)]">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5 bg-black/5">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">Cover</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden md:table-cell">Photos</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden lg:table-cell">Span</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden lg:table-cell">Visible</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {albums.map((album) => (
                            <tr key={album.id} className="group hover:bg-black/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-black/5">
                                        <Image
                                            src={album.cover_url || "/images/hero/hero3.jpg"}
                                            alt={album.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-ink line-clamp-1">{album.title}</span>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="text-sm text-ink-muted">{album.image_count}</span>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider opacity-70">
                                        {album.span}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    {album.visible ? (
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                                            <Eye className="h-3 w-3" /> Visible
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                                            <EyeOff className="h-3 w-3" /> Hidden
                                        </Badge>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <AlbumActions album={album} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function GalleryLoading() {
    return (
        <div className="rounded-2xl glass-panel overflow-hidden animate-pulse">
            <div className="h-12 bg-black/5" />
            <div className="space-y-4 p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-black/5 rounded-xl" />
                ))}
            </div>
        </div>
    )
}
