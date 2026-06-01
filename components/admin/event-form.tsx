"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Loader2, Save, ChevronLeft, Plus, Trash2, Calendar, Clock, MapPin } from "lucide-react"
import { toast } from "sonner"

import { eventSchema, type EventFormValues } from "@/lib/validations/event"
import { createEvent, updateEvent } from "@/lib/actions/events"
import type { Event } from "@/lib/types/database"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/image-upload"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface EventFormProps {
    initialData?: Event | null
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
}

export function EventForm({ initialData }: EventFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData
            ? {
                title: initialData.title || "",
                slug: initialData.slug || "",
                event_type: (initialData.event_type as "week_event" | "season_event") || "week_event",
                status: (initialData.status as "draft" | "published") || "draft",
                theme: initialData.theme || "",
                scripture: initialData.scripture || "",
                short_description: initialData.short_description || "",
                full_description: initialData.full_description || "",
                venue: initialData.venue || "",
                start_date: initialData.start_date ? initialData.start_date.substring(0, 10) : "",
                end_date: initialData.end_date ? initialData.end_date.substring(0, 10) : "",
                featured: initialData.featured || false,
                is_homepage_featured: initialData.is_homepage_featured || false,
                schedule: Array.isArray(initialData.schedule) ? initialData.schedule : [],
                gallery: Array.isArray(initialData.gallery) ? initialData.gallery : [],
                cover_image: initialData.cover_image || null,
            }
            : {
                title: "",
                slug: "",
                event_type: "week_event",
                status: "draft",
                theme: "",
                scripture: "",
                short_description: "",
                full_description: "",
                venue: "",
                start_date: "",
                end_date: "",
                featured: false,
                is_homepage_featured: false,
                schedule: [],
                gallery: [],
                cover_image: null,
            },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "schedule",
    })

    // Auto-generate slug from title
    const titleValue = form.watch("title")
    useEffect(() => {
        if (!initialData && titleValue) {
            form.setValue("slug", slugify(titleValue), { shouldValidate: true })
        }
    }, [titleValue, form, initialData])

    async function onSubmit(values: EventFormValues) {
        setIsLoading(true)
        try {
            if (initialData) {
                await updateEvent(initialData.id, values)
                toast.success("Event updated successfully")
            } else {
                await createEvent(values)
                toast.success("Event created successfully")
            }

            router.push("/admin/events")
            router.refresh()
        } catch (error: any) {
            console.error("Form submission error:", error)
            toast.error("Save failed", {
                description: error.message || "An unexpected error occurred",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 max-w-5xl mx-auto pb-16">
                {/* Top Action Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-black/5 pb-6">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="w-fit gap-2 text-ink-muted hover:text-ink"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to list
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.back()}
                            className="bg-white/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {initialData ? "Save Changes" : "Create Event"}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Main Form Fields */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Section A: Event Basics */}
                        <Card className="p-6 space-y-6 border-none shadow-[var(--shadow-soft)] bg-white/80 backdrop-blur-md">
                            <div>
                                <h3 className="text-lg font-semibold text-ink font-display">Section A — Event Basics</h3>
                                <p className="text-sm text-ink-muted">Set up the core identity and visibility of the event.</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Event Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Women of Virtue Week" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="women-of-virtue-week" {...field} className="bg-white" />
                                            </FormControl>
                                            <FormDescription className="text-[11px]">Unique URL-friendly identifier.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="event_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Event Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-white">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="week_event">Week Event</SelectItem>
                                                    <SelectItem value="season_event">Season Event</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Publishing Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft (Hidden from public)</SelectItem>
                                                <SelectItem value="published">Published (Live on website)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>

                        {/* Section B: Event Details */}
                        <Card className="p-6 space-y-6 border-none shadow-[var(--shadow-soft)] bg-white/80 backdrop-blur-md">
                            <div>
                                <h3 className="text-lg font-semibold text-ink font-display">Section B — Event Details</h3>
                                <p className="text-sm text-ink-muted">Share theme, scriptures, descriptions, and venue.</p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="theme"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Theme</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Walking in Divine Mercy" {...field} value={field.value || ""} className="bg-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="scripture"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Scripture Reference</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Psalm 23:1" {...field} value={field.value || ""} className="bg-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Venue</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                                                <Input placeholder="e.g. Main Auditorium, GPCC" {...field} value={field.value || ""} className="bg-white pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="short_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="A brief 1-2 sentence summary of the event for preview cards..." {...field} className="bg-white min-h-[80px] resize-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="full_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Full Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Detailed description of the campaign, speakers, sessions, and expectations..." {...field} value={field.value || ""} className="bg-white min-h-[160px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>

                        {/* Section F: Schedule Builder */}
                        <Card className="p-6 space-y-6 border-none shadow-[var(--shadow-soft)] bg-white/80 backdrop-blur-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-ink font-display">Section F — Event Schedule</h3>
                                    <p className="text-sm text-ink-muted">Add daily schedule items, sessions, or services.</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ day: "", title: "", time: "" })}
                                    className="gap-2 border-red-600/20 text-red-600 hover:bg-red-600/5"
                                >
                                    <Plus className="h-4 w-4" /> Add Item
                                </Button>
                            </div>

                            {fields.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-black/5 rounded-2xl bg-black/5">
                                    <Clock className="h-6 w-6 text-ink-muted/50 mb-2" />
                                    <p className="text-xs text-ink-muted">No schedule items added yet.</p>
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        onClick={() => append({ day: "", title: "", time: "" })}
                                        className="text-red-600 font-semibold mt-1"
                                    >
                                        Add your first schedule item
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="flex gap-4 items-start bg-black/5 p-4 rounded-xl relative group">
                                            <div className="grid gap-4 sm:grid-cols-3 flex-1">
                                                <FormField
                                                    control={form.control}
                                                    name={`schedule.${index}.day`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Day / Date Label</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. Mon, Nov 4" {...field} className="bg-white h-9 text-xs" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`schedule.${index}.title`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Session/Service Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. Opening Service" {...field} className="bg-white h-9 text-xs" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`schedule.${index}.time`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Time</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. 6:00 PM - 8:30 PM" {...field} className="bg-white h-9 text-xs" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10 mt-6"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Right Column - Dates, Poster, Settings */}
                    <div className="space-y-8">
                        {/* Section C: Event Dates */}
                        <Card className="p-6 space-y-6 border-none shadow-[var(--shadow-soft)] bg-white/80 backdrop-blur-md">
                            <div>
                                <h3 className="text-lg font-semibold text-ink font-display">Section C — Event Dates</h3>
                                <p className="text-sm text-ink-muted">Specify when the event starts and ends.</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="start_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Start Date</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                                                <Input type="date" {...field} className="bg-white pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink-muted">End Date</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                                                <Input type="date" {...field} className="bg-white pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>

                        {/* Section D: Event Poster */}
                        <Card className="p-6 space-y-6 border-none shadow-[var(--shadow-soft)] bg-white/80 backdrop-blur-md">
                            <div>
                                <h3 className="text-lg font-semibold text-ink font-display">Section D — Event Poster</h3>
                                <p className="text-sm text-ink-muted font-sans">Upload a campaign poster or banner.</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="cover_image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isLoading}
                                                bucket="events"
                                                folder="events/posters"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Card>

                        {/* Section E: Settings */}
                        <Card className="p-6 space-y-6 border-none shadow-[var(--shadow-soft)] bg-white/80 backdrop-blur-md">
                            <div>
                                <h3 className="text-lg font-semibold text-ink font-display">Section E — Settings</h3>
                                <p className="text-sm text-ink-muted">Configure featured badges and placement.</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="featured"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-xl bg-black/5 p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink">Featured Event</FormLabel>
                                            <FormDescription className="text-[11px]">Showcase in general featured sections.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="is_homepage_featured"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-xl bg-black/5 p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-ink">Homepage Featured</FormLabel>
                                            <FormDescription className="text-[11px]">Pin to the hero/featured slot of homepage.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    )
}
