import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "./_components/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { MediaDirectory } from "./_components/media-directory"

export const metadata: Metadata = {
  title: "Media Center – Global Peace Christian Centre",
  description: "Explore our sermons, events, and multimedia resources to stay connected with God's word and experience the transformative power of faith.",
}

const stats = [
  { number: "4+", label: "Broadcast Stations" },
  { number: "TV & FM", label: "On Air" },
  { number: "2020", label: "Since" },
  { number: "Weekly", label: "New Content" }
]

export default function MediaCenterPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="MEDIA CENTER"
        heading="Where we broadcast. Where we gather."
        subtitle="Sermons, events, and multimedia resources to keep you connected with God's Word."
        stats={stats}
      />
      <ParallaxContent>
        <MediaDirectory />
      </ParallaxContent>
    </PageTransition>
  )
}
