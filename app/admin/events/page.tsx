import { Suspense } from "react"
import { getAllEvents } from "@/lib/actions/events"
import { EventsList } from "./events-list"
import { Reveal } from "@/components/motion/reveal"

export const metadata = {
    title: "Manage Events | GPCC Admin",
}

export default async function EventsAdminPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <Suspense fallback={<EventsLoading />}>
                    <EventsDataWrapper />
                </Suspense>
            </Reveal>
        </div>
    )
}

async function EventsDataWrapper() {
    const events = await getAllEvents()
    return <EventsList initialEvents={events} />
}

function EventsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-black/5 rounded-md" />
                    <div className="h-4 w-96 bg-black/5 rounded-md" />
                </div>
                <div className="h-10 w-32 bg-black/5 rounded-md" />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="h-10 flex-1 bg-black/5 rounded-md" />
                <div className="flex gap-2">
                    <div className="h-10 w-28 bg-black/5 rounded-md" />
                    <div className="h-10 w-28 bg-black/5 rounded-md" />
                    <div className="h-10 w-28 bg-black/5 rounded-md" />
                </div>
            </div>

            <div className="rounded-2xl glass-panel overflow-hidden">
                <div className="h-12 bg-black/5" />
                <div className="space-y-4 p-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 bg-black/5 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}
