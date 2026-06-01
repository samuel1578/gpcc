import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { EventsList } from "./_components/events-list"
import { getPublishedEvents } from "@/lib/actions/events"

export const metadata = {
  title: "Events",
  description: "Upcoming events, conferences, and gatherings at Global Peace Christian Centre.",
}

export default async function EventsPage() {
  const events = await getPublishedEvents()

  return (
    <>
      <PageHero
        pageKey="events"
        eyebrow="Events"
        title="Come and see what God is doing."
        description="Conferences, retreats, outreach weekends, and community gatherings — all year long."
      />
      <ParallaxContent>
        <EventsList events={events} />
      </ParallaxContent>
    </>
  )
}
