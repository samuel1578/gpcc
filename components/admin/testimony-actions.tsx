"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react"
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
import { updateTestimony, deleteTestimony } from "@/lib/actions/testimonies"
import type { Testimony } from "@/lib/types/database"

interface TestimonyActionsProps {
    testimony: Testimony
}

export function TestimonyActions({ testimony }: TestimonyActionsProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onTogglePublish() {
        try {
            setIsLoading(true)
            const { created_at, id, ...rest } = testimony
            const payload = {
                ...rest,
                is_published: !testimony.is_published
            }

            await updateTestimony(testimony.id, payload)
            toast.success(testimony.is_published ? "Testimony unpublished" : "Testimony published")
            router.refresh()
        } catch (error: any) {
            console.error("Toggle publish error:", error)
            toast.error("Action failed", { description: error.message })
        } finally {
            setIsLoading(false)
        }
    }

    async function onDelete() {
        if (!confirm("Are you sure you want to delete this testimony? This action cannot be undone.")) {
            return
        }

        try {
            setIsLoading(true)
            await deleteTestimony(testimony.id)
            toast.success("Testimony deleted")
            router.refresh()
        } catch (error: any) {
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
                    <Link href={`/admin/testimonies/${testimony.id}`}>
                        <Edit2 className="h-4 w-4" /> Edit Testimony
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onTogglePublish} className="gap-2 cursor-pointer">
                    {testimony.is_published ? (
                        <><EyeOff className="h-4 w-4" /> Unpublish</>
                    ) : (
                        <><Eye className="h-4 w-4" /> Publish</>
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
