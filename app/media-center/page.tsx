import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { MediaList } from "./_components/media-list"

export const metadata: Metadata = {
  title: "Media Center",
  description: "Watch sermons, listen to messages, and download study materials from Christ Apostolic Church Igbalubi.",
}

export default function MediaCenterPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Media Center"
        title="Sermons, music & messages"
        description="Catch up on the latest preaching, worship, and teaching from our pulpit and ministries."
      />
      <ParallaxContent>
        <MediaList />
      </ParallaxContent>
    </PageTransition>
  )
}
