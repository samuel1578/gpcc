import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { SermonsSwiper } from "@/components/sermons/sermons-swiper"
import { getSermons } from "@/lib/actions/sermons"

export const metadata: Metadata = {
    title: "Sermons – Global Peace Christian Centre",
}

export default async function SermonsPage() {
    const sermons = await getSermons()

    return (
        <PageTransition>
            <PageHero
                eyebrow="Media Center"
                title="Sermons"
                description="Powerful messages and teachings from our pastors and guest speakers."
                variant="light"
            />

            <div className="container mx-auto max-w-[1400px]">
                <SermonsSwiper sermons={sermons} />
            </div>
        </PageTransition>
    )
}
