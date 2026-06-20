import type { Metadata } from "next"
import { CommunityJourneyClient } from "./_components/community-journey-client"

export const metadata: Metadata = {
    title: "Our Journey",
    description: "Explore the timeline of Global Peace Christian Centre's journey through the community.",
}

export default function CommunityJourneyPage() {
    return <CommunityJourneyClient />
}
