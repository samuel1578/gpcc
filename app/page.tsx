import { HeroSection } from "@/components/home/hero-section"
import { ThemeSection } from "@/components/home/theme-section"
import { PastorWelcome } from "@/components/home/pastor-welcome"
import { MinistriesGrid } from "@/components/home/ministries-grid"
import { ServiceTimes } from "@/components/home/service-times"
import { MediaEvents } from "@/components/home/media-events"
import { TestimoniesSection } from "@/components/home/testimonies-section"
import { GallerySection } from "@/components/home/gallery-section"
import { GivingSection } from "@/components/home/giving-section"
import { ConnectSection } from "@/components/home/connect-section"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { getFeaturedTestimonials } from "@/lib/actions/testimonies"

export default async function HomePage() {
  const featuredTestimonials = await getFeaturedTestimonials()

  return (
    <>
      <HeroSection />
      <ParallaxContent>
        <ThemeSection />
        <PastorWelcome />
        <MinistriesGrid />
        <ServiceTimes />
        <MediaEvents />
        <TestimoniesSection testimonies={featuredTestimonials} />
        <GallerySection />
        <GivingSection />
        <ConnectSection />
      </ParallaxContent>
    </>
  )
}
