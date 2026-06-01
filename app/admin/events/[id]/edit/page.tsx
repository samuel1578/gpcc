import { notFound } from "next/navigation"
import { getEventById } from "@/lib/actions/events"
import { EventForm } from "@/components/admin/event-form"
import { Reveal } from "@/components/motion/reveal"

interface EditEventPageProps {
    params: Promise<{
        id: string
    }>
}

export const metadata = {
    title: "Edit Event | GPCC Admin",
}

export default async function EditEventPage({ params }: EditEventPageProps) {
    const { id } = await params
    const event = await getEventById(id)

    if (!event) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <Reveal>
                <div className="space-y-2 max-w-5xl mx-auto">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Edit Event
                    </h1>
                    <p className="text-ink-muted">
                        Update details, schedule, or poster of the campaign.
                    </p>
                </div>
            </Reveal>

            <EventForm initialData={event} />
        </div>
    )
}
