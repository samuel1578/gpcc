import { EventForm } from "@/components/admin/event-form"
import { Reveal } from "@/components/motion/reveal"

export const metadata = {
    title: "Create Event | GPCC Admin",
}

export default function CreateEventPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div className="space-y-2 max-w-5xl mx-auto">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Create New Event
                    </h1>
                    <p className="text-ink-muted">
                        Publish a week event, fasting season, retreat, or spiritual campaign.
                    </p>
                </div>
            </Reveal>

            <EventForm />
        </div>
    )
}
