import { Suspense } from "react"
import { getPledges } from "@/lib/actions/pledges"
import { PledgeList } from "./pledge-list"
import { Reveal } from "@/components/motion/reveal"

export const metadata = {
    title: "Pledges | GPCC Admin",
}

export default async function PledgesAdminPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                            Pledge Management
                        </h1>
                        <p className="text-ink-muted">
                            View and manage financial pledges from the community.
                        </p>
                    </div>
                </div>
            </Reveal>

            <Suspense fallback={<PledgesLoading />}>
                <PledgeDataWrapper />
            </Suspense>
        </div>
    )
}

async function PledgeDataWrapper() {
    const pledges = await getPledges()
    return <PledgeList initialPledges={pledges} />
}

function PledgesLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]">
                        <div className="h-12 w-12 bg-black/5 rounded-2xl" />
                        <div className="mt-6 space-y-2">
                            <div className="h-4 w-32 bg-black/5 rounded-md" />
                            <div className="h-8 w-16 bg-black/5 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-10 w-full bg-black/5 rounded-md" />
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
