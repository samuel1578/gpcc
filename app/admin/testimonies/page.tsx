import { Suspense } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Eye, EyeOff, Star } from "lucide-react"
import { format } from "date-fns"
import { getAllTestimonials } from "@/lib/actions/testimonies"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TestimonyActions } from "@/components/admin/testimony-actions"

export const metadata = {
    title: "Manage Testimonies | GPCC Admin",
}

export default async function TestimoniesAdminPage() {
    return (
        <div className="space-y-8">
            <Reveal>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                            Testimonies
                        </h1>
                        <p className="text-ink-muted">
                            Manage and publish stories of faith from the community.
                        </p>
                    </div>
                    <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white gap-2">
                        <Link href="/admin/testimonies/new">
                            <Plus className="h-4 w-4" />
                            Create Testimony
                        </Link>
                    </Button>
                </div>
            </Reveal>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                    <Input
                        placeholder="Search testimonies..."
                        className="pl-10 bg-white/50"
                    />
                </div>
                <Button variant="outline" className="gap-2 bg-white/50">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <Suspense fallback={<TestimoniesLoading />}>
                <TestimoniesTable />
            </Suspense>
        </div>
    )
}

async function TestimoniesTable() {
    const testimonies = await getAllTestimonials()

    if (testimonies.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center">
                <div className="rounded-full bg-black/5 p-4 mb-4">
                    <FileText className="h-8 w-8 text-ink-muted" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">No testimonies found</h3>
                <p className="mt-2 text-ink-muted max-w-xs">
                    Start by creating your first testimony to share God's goodness with the community.
                </p>
                <Button asChild variant="outline" className="mt-6 border-red-600/20 text-red-600 hover:bg-red-600/5">
                    <Link href="/admin/testimonies/new">Create first testimony</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="rounded-2xl glass-panel overflow-hidden shadow-[var(--shadow-soft)]">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5 bg-black/5">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden md:table-cell">Person</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden lg:table-cell">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden xl:table-cell">Created</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {testimonies.map((t) => (
                            <tr key={t.id} className="group hover:bg-black/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-ink line-clamp-1">{t.title}</span>
                                        <span className="text-xs text-ink-muted md:hidden">
                                            {t.is_confidential ? "Confidential" : (t.person_name || "Anonymous")}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="text-sm text-ink-muted">
                                        {t.is_confidential ? "Confidential" : (t.person_name || "Anonymous")}
                                    </span>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <div className="flex gap-2">
                                        {t.is_published ? (
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                                                <Eye className="h-3 w-3" /> Published
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                                                <EyeOff className="h-3 w-3" /> Draft
                                            </Badge>
                                        )}
                                        {t.is_featured && (
                                            <Badge variant="outline" className="bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 gap-1">
                                                <Star className="h-3 w-3 fill-current" /> Featured
                                            </Badge>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    <span className="text-sm text-ink-muted">
                                        {format(new Date(t.created_at), "MMM d, yyyy")}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <TestimonyActions testimony={t} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TestimoniesLoading() {
    return (
        <div className="rounded-2xl glass-panel overflow-hidden animate-pulse">
            <div className="h-12 bg-black/5" />
            <div className="space-y-4 p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-black/5 rounded-xl" />
                ))}
            </div>
        </div>
    )
}

function FileText({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    )
}
