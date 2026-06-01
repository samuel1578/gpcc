import { z } from "zod"

export const eventSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
    event_type: z.enum(["week_event", "season_event"]),
    status: z.enum(["draft", "published"]),
    theme: z.string().max(255).optional().nullable().or(z.literal("")),
    scripture: z.string().max(255).optional().nullable().or(z.literal("")),
    short_description: z.string().min(1, "Short description is required"),
    full_description: z.string().optional().nullable().or(z.literal("")),
    venue: z.string().max(255).optional().nullable().or(z.literal("")),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    featured: z.boolean().default(false),
    is_homepage_featured: z.boolean().default(false),
    schedule: z.array(
        z.object({
            day: z.string().min(1, "Day/Date label is required"),
            title: z.string().min(1, "Schedule item title is required"),
            time: z.string().min(1, "Time is required"),
        })
    ).default([]),
    gallery: z.array(z.string()).default([]),
    cover_image: z.string().optional().nullable(),
}).refine((data) => {
    const start = new Date(data.start_date)
    const end = new Date(data.end_date)
    return end >= start
}, {
    message: "End date must be on or after start date",
    path: ["end_date"],
})

export type EventFormValues = z.infer<typeof eventSchema>
