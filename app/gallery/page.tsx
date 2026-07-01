import type { Metadata } from "next"
import { PageTransition } from "@/components/motion/page-transition"
import { PageHero } from "./_components/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { GalleryGrid } from "./_components/gallery-grid"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from worship, fellowship, and outreach at Christ Apostolic Church Igbalubi.",
}

const stats = [
  { number: "2013", label: "Since" },
  { number: "100+", label: "Moments Captured" },
  { number: "4+", label: "Ministries" },
  { number: "∞", label: "Stories Told" }
]

export default function GalleryPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="GALLERY"
        heading="Moments of grace, captured"
        subtitle="A visual journey through our services, retreats, conventions, and community outreaches."
        stats={stats}
      />
      <ParallaxContent>
        <GalleryGrid />
      </ParallaxContent>
    </PageTransition>
  )
}
