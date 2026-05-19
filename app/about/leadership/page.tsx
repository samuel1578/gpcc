import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { LeadershipGrid } from "./_components/leadership-grid"
import { ParallaxContent } from "@/components/layout/parallax-content"

export const metadata: Metadata = {
  title: "The Leadership",
  description: "Meet the spiritual leaders, pastors, elders, and ministry voices guiding the vision and growth of our church family.",
}

export default function LeadershipPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Leadership"
        title="The Leadership"
        description="Meet the spiritual leaders, pastors, elders, and ministry voices guiding the vision and growth of our church family."
        pageKey="leadership"
        variant="light"
      />
      <ParallaxContent>
        <div className="pb-10 lg:pb-16">
          <LeadershipGrid />
        </div>
      </ParallaxContent>
    </PageTransition>
  )
}
