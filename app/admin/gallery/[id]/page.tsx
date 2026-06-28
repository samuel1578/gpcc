import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getAlbumById } from "@/lib/actions/gallery"
import { Reveal } from "@/components/motion/reveal"
import { AlbumSettingsForm } from "@/components/admin/album-settings-form"
import { ImageManagement } from "@/components/admin/image-management"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const album = await getAlbumById(id)
    return {
        title: album ? `${album.title} | GPCC Admin` : "Album Not Found",
    }
}

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const album = await getAlbumById(id)

    if (!album) {
        notFound()
    }

    return (
        <div className="space-y-10 pb-20">
            <Reveal>
                <div className="flex flex-col gap-4">
                    <Link
                        href="/admin/gallery"
                        className="flex w-fit items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Albums
                    </Link>
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                            {album.title}
                        </h1>
                        <p className="text-ink-muted">
                            Manage album settings and images.
                        </p>
                    </div>
                </div>
            </Reveal>

            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="font-display text-xl font-semibold text-ink">Album Settings</h2>
                    <AlbumSettingsForm album={album} />
                </section>

                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-xl font-semibold text-ink">Images</h2>
                        <span className="text-sm text-ink-muted">{album.image_count} photos</span>
                    </div>
                    <ImageManagement album={album} />
                </section>
            </div>
        </div>
    )
}
