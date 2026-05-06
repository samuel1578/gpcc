import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { MinistriesGridFull } from "./_components/ministries-grid-full"

export const metadata = {
  title: "Ministries",
  description: "Explore the ministries of Global Peace Christian Centre — Men, Women, Youth, Children and beyond.",
}

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        pageKey="ministries"
        eyebrow="Ministries"
        title="Find your people. Find your purpose."
        description="From men's fellowship to children's church, every ministry exists to help you grow in faith and serve in love."
      />
      <ParallaxContent>
        <MinistriesGridFull />
      </ParallaxContent>
    </>
  )
}
