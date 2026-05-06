import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { LeadershipGrid } from "./_components/leadership-grid"

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the pastors, elders, and ministry leaders serving Christ Apostolic Church Igbalubi.",
}

export default function LeadershipPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Leadership"
        title="Servants of the household of faith"
        description="Our leadership team is committed to feeding the flock, equipping the saints, and pointing every soul to Christ."
      />
      <LeadershipGrid />
    </PageTransition>
  )
}
