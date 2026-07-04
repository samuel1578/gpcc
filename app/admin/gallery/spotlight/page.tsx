import { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getSpotlightImages } from "@/lib/actions/spotlight"
import { Reveal } from "@/components/motion/reveal"
import { SpotlightManagement } from "@/components/admin/spotlight-management"

export const metadata: Metadata = {
    title: "Homepage Spotlight | GPCC Admin",
    description: "Manage the featured images shown in the homepage gallery section.",
}

export default async function SpotlightPage() {
    const spotlightImages = await getSpotlightImages()

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
                            Homepage Spotlight
                        </h1>
                        <p className="text-ink-muted">
                            Manage the featured images shown in the homepage gallery section.
                        </p>
                    </div>
                </div>
            </Reveal>

            <section className="space-y-6">
                <SpotlightManagement initialImages={spotlightImages} />
            </section>
        </div>
    )
}
