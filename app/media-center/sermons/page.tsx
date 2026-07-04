import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { UnderConstruction } from "@/components/layout/under-construction"

export const metadata: Metadata = {
    title: "Sermons – Global Peace Christian Centre",
}

export default function SermonsPage() {
    return (
        <PageTransition>
            <PageHero
                eyebrow="Media Center"
                title="Sermons"
                description="Powerful messages and teachings from our pastors and guest speakers — coming soon."
                variant="light"
            />
            <UnderConstruction />
        </PageTransition>
    )
}
