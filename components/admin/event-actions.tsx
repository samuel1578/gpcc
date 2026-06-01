"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Edit2, Trash2, Eye, EyeOff, Star, StarOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateEvent, deleteEvent } from "@/lib/actions/events"
import type { Event } from "@/lib/types/database"

interface EventActionsProps {
    event: Event
}

export function EventActions({ event }: EventActionsProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onTogglePublish() {
        try {
            setIsLoading(true)
            const newStatus = event.status === "published" ? "draft" : "published"
            await updateEvent(event.id, { status: newStatus })
            toast.success(newStatus === "published" ? "Event published" : "Event unpublished")
            router.refresh()
        } catch (error: any) {
            console.error("Toggle publish error:", error)
            toast.error("Action failed", { description: error.message })
        } finally {
            setIsLoading(false)
        }
    }

    async function onToggleFeature() {
        try {
            setIsLoading(true)
            await updateEvent(event.id, { featured: !event.featured })
            toast.success(event.featured ? "Event removed from featured" : "Event featured")
            router.refresh()
        } catch (error: any) {
            console.error("Toggle feature error:", error)
            toast.error("Action failed", { description: error.message })
        } finally {
            setIsLoading(false)
        }
    }

    async function onDelete() {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
            return
        }

        try {
            setIsLoading(true)
            await deleteEvent(event.id)
            toast.success("Event deleted successfully")
            router.refresh()
        } catch (error: any) {
            console.error("Delete event error:", error)
            toast.error("Delete failed", { description: error.message })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading} className="h-8 w-8 text-ink-muted hover:text-ink">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 glass-panel-strong border-white/10">
                <DropdownMenuLabel className="text-xs uppercase tracking-widest opacity-50">Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild className="gap-2 cursor-pointer">
                    <Link href={`/admin/events/${event.id}/edit`}>
                        <Edit2 className="h-4 w-4" /> Edit Event
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onTogglePublish} className="gap-2 cursor-pointer">
                    {event.status === 'published' ? (
                        <><EyeOff className="h-4 w-4" /> Unpublish</>
                    ) : (
                        <><Eye className="h-4 w-4" /> Publish</>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleFeature} className="gap-2 cursor-pointer">
                    {event.featured ? (
                        <><StarOff className="h-4 w-4" /> Unfeature</>
                    ) : (
                        <><Star className="h-4 w-4" /> Feature</>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={onDelete} className="gap-2 text-red-500 hover:text-red-400 cursor-pointer">
                    <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
