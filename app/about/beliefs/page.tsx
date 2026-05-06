import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { BeliefsList } from "./_components/beliefs-list"

export const metadata: Metadata = {
  title: "What We Believe",
  description: "The core doctrinal convictions that shape our worship, teaching, and life as a church.",
}

export default function BeliefsPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="What We Believe"
        title="Anchored in the truth of Scripture"
        description="Our doctrinal foundations are rooted in the Bible as the inspired, infallible Word of God."
      />
      <BeliefsList />
    </PageTransition>
  )
}
