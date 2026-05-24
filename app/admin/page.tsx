import { FileText, Calendar, ImageIcon, ArrowUpRight } from "lucide-react"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { Card } from "@/components/ui/card"
import { getTestimoniesCount } from "@/lib/actions/testimonies"

export default async function AdminDashboardPage() {
    const testimonyCount = await getTestimoniesCount()

    const stats = [
        {
            label: "Testimonies",
            value: testimonyCount.toString(),
            description: "Stories of faith shared",
            icon: FileText,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Events",
            value: "4",
            description: "Upcoming gatherings",
            icon: Calendar,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Gallery",
            value: "8",
            description: "Active photo albums",
            icon: ImageIcon,
            color: "text-fuchsia-500",
            bg: "bg-fuchsia-500/10",
        },
    ]
    return (
        <div className="space-y-10">
            <Reveal>
                <div className="space-y-2">
                    <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
                        Welcome back, Admin
                    </h1>
                    <p className="text-ink-muted max-w-2xl">
                        Manage your church content, events, and community stories from this central hub.
                    </p>
                </div>
            </Reveal>

            <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card
                        key={stat.label}
                        className="group relative overflow-hidden border-none bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-elevated)]"
                    >
                        <div className="flex items-start justify-between">
                            <div className={stat.bg + " p-3 rounded-2xl " + stat.color}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <button className="text-ink-muted transition-colors hover:text-ink">
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="mt-6 space-y-1">
                            <h3 className="text-sm font-medium text-ink-muted uppercase tracking-wider">
                                {stat.label}
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-ink tracking-tight">
                                    {stat.value}
                                </span>
                            </div>
                            <p className="text-sm text-ink-muted/80">
                                {stat.description}
                            </p>
                        </div>
                        {/* Hover decoration */}
                        <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-transparent to-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Card>
                ))}
            </RevealStagger>

            <Reveal delay={0.2}>
                <div className="rounded-3xl glass-panel p-8 lg:p-12 border-dashed border-2 border-black/5">
                    <div className="max-w-md space-y-4">
                        <h2 className="font-display text-2xl font-semibold text-ink">Getting Started</h2>
                        <p className="text-ink-muted">
                            Select a category from the sidebar to begin managing your content. You can update existing testimonies, add new events, or manage your gallery albums.
                        </p>
                    </div>
                </div>
            </Reveal>
        </div>
    )
}
