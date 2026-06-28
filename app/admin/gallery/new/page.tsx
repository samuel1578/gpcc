import { AlbumForm } from "@/components/admin/album-form"
import { Reveal } from "@/components/motion/reveal"

export const metadata = {
    title: "New Album | GPCC Admin",
}

export default function NewAlbumPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        New Album
                    </h1>
                    <p className="text-ink-muted">
                        Create a new event album for the gallery.
                    </p>
                </div>
            </Reveal>

            <AlbumForm />
        </div>
    )
}
