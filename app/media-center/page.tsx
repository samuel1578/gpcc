import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { MediaDirectory } from "./_components/media-directory"

export const metadata: Metadata = {
  title: "Media Center – Global Peace Christian Centre",
  description: "Explore our sermons, events, and multimedia resources to stay connected with God's word and experience the transformative power of faith.",
}

export default function MediaCenterPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Welcome to the"
        title="Media Center"
        description="Explore our sermons, events, and multimedia resources to stay connected with God's word and experience the transformative power of faith."
      />
      <ParallaxContent>
        <MediaDirectory />
      </ParallaxContent>
    </PageTransition>
  )
}
