import { z } from "zod"

export const testimonySchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
    person_name: z.string().max(255).optional().nullable().or(z.literal("")),
    person_role: z.string().optional().nullable().or(z.literal("")),
    category: z.string().optional().nullable().or(z.literal("")),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().optional().nullable().or(z.literal("")),
    quote: z.string().optional().nullable().or(z.literal("")),
    scripture_reference: z.string().optional().nullable().or(z.literal("")),
    cover_image_url: z.string().optional().nullable(),
    is_published: z.boolean().default(false),
    is_featured: z.boolean().default(false),
    is_confidential: z.boolean().default(false),
    display_order: z.coerce.number().int().default(0),
}).refine((data) => {
    if (!data.is_confidential && (!data.person_name || data.person_name.trim() === "")) {
        return false;
    }
    return true;
}, {
    message: "Person name is required unless testimony is confidential",
    path: ["person_name"],
});

export type TestimonyFormValues = z.infer<typeof testimonySchema>
