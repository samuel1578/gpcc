import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { GalleryGrid } from "./_components/gallery-grid"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from worship, fellowship, and outreach at Christ Apostolic Church Igbalubi.",
}

export default function GalleryPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Gallery"
        title="Moments of grace, captured"
        description="A visual journey through our services, retreats, conventions, and community outreaches."
      />
      <ParallaxContent>
        <GalleryGrid />
      </ParallaxContent>
    </PageTransition>
  )
}
