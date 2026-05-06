import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { HistoryTimeline } from "./_components/history-timeline"

export const metadata: Metadata = {
  title: "Our History",
  description: "The story of God&apos;s faithfulness through Christ Apostolic Church Igbalubi.",
}

export default function HistoryPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Our History"
        title="A heritage of faith"
        description="From a small gathering of believers to a thriving family of faith — here&apos;s how God has led us."
      />
      <HistoryTimeline />
    </PageTransition>
  )
}
