export interface Testimony {
    id: string;
    created_at: string;
    updated_at: string | null;
    title: string;
    slug: string;
    person_name: string | null;
    person_role: string | null;
    category: string | null;
    excerpt: string;
    content: string | null;
    quote: string | null;
    scripture_reference: string | null;
    cover_image_url: string | null;
    is_published: boolean;
    is_featured: boolean;
    is_confidential: boolean;
    display_order: number;
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    event_type: "week_event" | "season_event" | string;
    status: "draft" | "published" | string;
    short_description: string | null;
    full_description: string | null;
    theme: string | null;
    scripture: string | null;
    cover_image: string | null;
    venue: string | null;
    start_date: string;
    end_date: string;
    featured: boolean;
    is_homepage_featured: boolean;
    schedule: any;
    gallery: any;
    created_at: string;
    updated_at: string | null;
}
